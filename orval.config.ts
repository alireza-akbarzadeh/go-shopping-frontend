import { defineConfig } from 'orval';

export default defineConfig({
  petstore: {
    output: {
      target: './src/services/endpoints',
      schemas: './src/services/models',
      mode: 'tags',
      client: 'react-query',
      httpClient: 'axios',
      formatter: 'prettier',
      override: {
        mutator: {
          path: './src/lib/api-client.ts',
          name: 'useCustomInstance'
        }
      }
    },
    input: {
      target: './openapi3.json'
    }
  }
});
