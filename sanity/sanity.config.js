// sanity.config.js
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import schemas from './schemas/schema'
import {structure} from './desk'

import {visionTool} from '@sanity/vision'
import {colorInput} from '@sanity/color-input'
import {imageHotspotArrayPlugin} from 'sanity-plugin-hotspot-array'
import {media, mediaAssetSource} from 'sanity-plugin-media'
import {customDocumentActions} from './plugins/customDocumentActions'

export default defineConfig({
  title: 'Spinelli Kilcollin',
  projectId: 'i21fjdbi',
  dataset: 'migration',
  plugins: [
    deskTool({structure}),
    colorInput(),
    imageHotspotArrayPlugin(),
    customDocumentActions(),
    media(),
  ],
  schema: {
    types: schemas,
  },
})
