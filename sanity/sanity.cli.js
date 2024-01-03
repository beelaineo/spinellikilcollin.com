// sanity.cli.js
import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'i21fjdbi',
    dataset: 'migration',
  },
  graphql: [
    // {
    //   id: 'production',
    //   workspace: 'production-workspace',
    // },
    // {
    //   id: 'staging',
    //   workspace: 'staging-workspace',
    // },
    {
      playground: true,
      workspace: 'migration-workspace',
      id: 'migration',
    },
  ],
})
