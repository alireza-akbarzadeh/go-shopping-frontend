import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: {
      target: './openapi3.json'
    },
    output: {
      mode: 'tags',
      target: './src/services/apis',
      schemas: './src/services/models',
      client: 'react-query',
      override: {
        mutator: {
          path: './src/lib/api-client.ts'
        }
      }
    }
  }
});
