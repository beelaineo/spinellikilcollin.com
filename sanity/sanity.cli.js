// sanity.cli.js
import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'i21fjdbi',
    dataset: 'production',
  },
  graphql: [
    {
      id: 'production',
      workspace: 'production-workspace',
      playground: true,
    },
    // {
    //   id: 'staging',
    //   workspace: 'staging-workspace',
    // },
    // {
    //   playground: true,
    //   workspace: 'migration-workspace',
    //   id: 'migration',
    // },
  ],
})
