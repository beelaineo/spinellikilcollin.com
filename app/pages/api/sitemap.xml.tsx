import fs from 'fs'
import path from 'path'
import getConfig from 'next/config'
import { NextApiRequest, NextApiResponse } from 'next'
import { SitemapStream, streamToPromise, EnumChangefreq } from 'sitemap'
import { createGzip } from 'zlib'
import { Sentry } from '../../src/services/sentry'

import * as aboutPages from '../about/[pageSlug]'
import * as journalPages from '../journal/[entrySlug]'
import * as collectionPages from '../collections/[collectionSlug]'
import * as productPages from '../products/[productSlug]'

const moduleMap = new Map<string, any>([
  ['pageSlug', aboutPages],
  ['entrySlug', journalPages],
  ['collectionSlug', collectionPages],
  ['productSlug', productPages],
])

const { serverRuntimeConfig } = getConfig()

const ignore = ['api', '404', 'pages', 'blogs', 'id', /^_/, '11052238']
// /Users/joseph/Sites/spinelli-kilcollin/spinellikilcollin.com/app/pages/about
// /Users/joseph/Sites/spinelli-kilcollin/spinellikilcollin.com/app/pages/about/[pageSlug].tsx

interface PageInfo {
  page: string
  lastModified: string
}
const walk = async () => {
  const pages: PageInfo[] = []

  const walkSync = async (dir: string) => {
    // Get all files of the current directory & iterate over them
    const files = fs.readdirSync(dir)
    await Promise.all(
      files.map(async (file) => {
        // Construct whole file-path & retrieve file's stats
        const filePath = path.join(dir, file)
        if (ignore.find((i) => file.match(i))) {
          return
        }

        const fileStat = fs.statSync(filePath)

        if (fileStat.isDirectory()) {
          // Recurse one folder deeper
          await walkSync(`${filePath}/`)
        } else {
          if (/^\[.*\]/.test(file)) {
            const paramName = file.replace(/^\[/, '').replace(/\]\.tsx?/, '')
            const module = moduleMap.get(paramName)
            if (!module || !module.getStaticPaths) return
            const { paths } = await module.getStaticPaths()
            const cleanFileName = filePath
              .substr(0, filePath.lastIndexOf('.'))
              .replace(/^(.*)pages\//, '')

            const pathNames = paths
              .map((p) => p.params[paramName])
              .map((p) => {
                return cleanFileName.replace(/\[.*\]/, p)
              })
              .forEach((p) => {
                pages.push({
                  page: `https://www.spinellikilcollin.com/${p}`,
                  lastModified: fileStat.mtime.toString(),
                })
              })
          } else {
            // Construct this file's pathname excluding the "pages" folder & its extension
            const cleanFileName = filePath
              .substr(0, filePath.lastIndexOf('.'))
              .replace(/^(.*)pages\//, '')
              .replace(/index$/, '')
              .replace(/\/$/, '')

            pages.push({
              page: `https://www.spinellikilcollin.com/${cleanFileName}`,
              lastModified: fileStat.mtime.toString(),
            })
          }
        }
      }),
    )
  }

  // Start recursion to fill `fileObj`
  await walkSync(path.join(serverRuntimeConfig.PROJECT_ROOT, 'pages'))

  return pages
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!res) return {}

  try {
    // Set response header
    res.setHeader('content-type', 'application/xml')
    res.setHeader('Content-Encoding', 'gzip')
    const dirs = await walk()

    // A Transform for turning a Readable stream of either SitemapItemOptions or url strings into a Sitemap.
    // The readable stream it transforms must be in object mode.
    const smStream = new SitemapStream({
      hostname: 'https://www.spinellikilcollin.com',
    })

    const pipeline = smStream.pipe(createGzip())
    // Add any static entries here
    smStream.write({
      url: '/',
      lastmod: process.env.siteUpdatedAt,
      changefreq: EnumChangefreq.WEEKLY,
    })
    dirs.forEach((dir) => {
      smStream.write({
        url: dir.page,
        lastmod: dir.lastModified,
        changefreq: EnumChangefreq.WEEKLY,
      })
    })
    smStream.end()

    // cache the response
    // streamToPromise.then(sm => sitemap = sm)
    streamToPromise(pipeline)
    // stream the response
    pipeline.pipe(res).on('error', (e) => {
      throw e
    })
  } catch (e) {
    Sentry.captureException(e)
    res.status(500).end()
  }
}

export default handler
