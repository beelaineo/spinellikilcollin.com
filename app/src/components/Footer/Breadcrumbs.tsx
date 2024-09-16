import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { BreadcrumbWrapper } from './styled'

interface BreadcrumbsProps {
  display?: string
  paths?: []
}

interface BreadcrumbProps {
  route: string
  label: string
  link: string
}

export const Breadcrumbs = ({ display, paths }: BreadcrumbsProps) => {
  const router = useRouter()
  console.log('router', router)
  if (
    router.route === '/' ||
    router.route === '/404' ||
    router.route.includes('/customer-care') ||
    router.route.includes('/new-customer') ||
    router.route.includes('/vip-loyalty') ||
    (display == 'header' &&
      router.route.includes('collections') &&
      !router.asPath.includes('vault'))
  ) {
    return null
  } else {
    return (
      <BreadcrumbWrapper>
        {paths?.map((c: BreadcrumbProps, i: number) => {
          return (
            <div key={i}>
              {i > 0 ? <div className={'separator'}>{'→'}</div> : null}
              <div className={i == paths.length - 1 ? 'active ' : ''}>
                <Link href={c.link}>{c.label}</Link>
              </div>
            </div>
          )
        })}
        {display != 'header' && <div className={'border'} />}
      </BreadcrumbWrapper>
    )
  }
}
