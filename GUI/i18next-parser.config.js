/** @type {import('i18next-parser').UserConfig} */
const config = {
  defaultNamespace: 'translation',
  createOldCatalogs: false, // save previous translation catalogs to the \_old folder
  resetDefaultValueLocale: 'en',

  lexers: {
    ts: ['JavascriptLexer'],
    tsx: ['JsxLexer'],
    default: ['JavascriptLexer'],
  },

  locales: ['en', 'et'],
  // An array of the locales in your applications

  keepRemoved: false,
  // Keep keys from the catalog that are no longer in code

  keySeparator: false,
  namespaceSeparator: false,
  // Namespace separator used in your translation keys
  // If you want to use plain english keys, separators such as `.` and `:` will conflict. You might want to set `keySeparator: false` and `namespaceSeparator: false`. That way, `t('Status: Loading...')` will not think that there are a namespace and three separator dots for instance.

  output: 'src/i18n/resources/$LOCALE.json',
  // Supports $LOCALE and $NAMESPACE injection
  // Supports JSON (.json) and YAML (.yml) file formats
  // Where to write the locale files relative to process.cwd()

  input: 'src/**/*.{ts,tsx}',
  // An array of globs that describe where to look for source files
  // relative to the location of the configuration file
  // Globs syntax: https://github.com/isaacs/node-glob#glob-primer
  sort: true,
  // (a, b) => a.key.localeCompare(b.key)
  // Whether or not to sort the catalog. Can also be a [compareFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#parameters)
};

export default config;
