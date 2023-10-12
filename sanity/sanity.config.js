// sanity.config.js
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import schemas from './schemas/schema'

export default defineConfig({
  title: 'Spinelli Kilcollin',
  projectId: 'i21fjdbi',
  dataset: 'migration',
  plugins: [deskTool()],
  schema: {
    types: schemas,
  },
})
