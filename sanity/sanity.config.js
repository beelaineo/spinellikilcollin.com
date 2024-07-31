// sanity.config.js
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import schemas from './schemas/schema'
import {structure} from './desk'

import {colorInput} from '@sanity/color-input'
import {imageHotspotArrayPlugin} from 'sanity-plugin-hotspot-array'
import {media, mediaAssetSource} from 'sanity-plugin-media'
import {customDocumentActions} from './plugins/customDocumentActions'
import {scheduledPublishing} from '@sanity/scheduled-publishing'

export default defineConfig([
  {
    title: 'Spinelli Kilcollin',
    projectId: 'i21fjdbi',
    dataset: 'production',
    name: 'production-workspace',
    basePath: '/production',
    plugins: [
      deskTool({structure}),
      colorInput(),
      visionTool(),
      imageHotspotArrayPlugin(),
      customDocumentActions(),
      media(),
      scheduledPublishing(),
    ],
    schema: {
      types: schemas,
    },
  },
  {
    title: 'SK Staging',
    projectId: 'i21fjdbi',
    dataset: 'staging',
    name: 'staging-workspace',
    basePath: '/staging',
    plugins: [
      deskTool({structure}),
      colorInput(),
      visionTool(),
      imageHotspotArrayPlugin(),
      customDocumentActions(),
      media(),
      scheduledPublishing(),
    ],
    schema: {
      types: schemas,
    },
  },
])
