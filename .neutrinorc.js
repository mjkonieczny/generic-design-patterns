const airbnbBase = require('@neutrinojs/airbnb-base');
const library = require('@neutrinojs/library');
const jest = require('@neutrinojs/jest');

const typescript = () => (neutrino) => {
  neutrino.config.resolve.extensions.add('.tsx');
  neutrino.config.resolve.extensions.add('.ts');
  neutrino.config.module.rule('compile').test(/\.(jsx|js|tsx|ts)$/);
}

module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    airbnbBase({
      eslint: {
        parser: '@typescript-eslint/parser',
        parserOptions: {
          project: './tsconfig.json',
        },
        plugins: [
          '@typescript-eslint',
        ],
        baseConfig: {
          extends: [
            'plugin:@typescript-eslint/eslint-recommended',
            'plugin:@typescript-eslint/recommended',
          ],
          settings: {
            'import/resolver': {
              node: {
                extensions: [".ts"],
              },
            },
          },
        },
        rules: {
          "import/extensions": [
            "error",
            "ignorePackages",
            {
              "js": "never",
              "jsx": "never",
              "ts": "never",
              "tsx": "never"
            },
          ],
        }
      },
    }),
    library({
      name: 'generic-design-patterns',
      target: 'node',
      babel: {
        presets: ['@babel/preset-typescript'],
      },
    }),
    jest({
      testRegex: 'test/.*.test.ts$',
      transform: {
        "^.+\\.ts$": "ts-jest"
      },
    }),
    typescript(),
  ],
};
