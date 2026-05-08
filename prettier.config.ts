const config = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'none',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  endOfLine: 'lf',
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss' // must be last
  ],
  importOrder: [
    '^react$',
    '',
    '<TYPES>',
    '<TYPES>^[.]',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^[@]/',
    '',
    '^[.]'
  ],
  ignorePatterns: [
    'src/services/**/*', // Ignore all files within src/services
    'src/lib/api-client.ts' // Also ignore your custom mutator if you don't want it formatted
  ]
};

export default config;
