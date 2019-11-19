module.exports = {
    env: {
        browser: true,
        node: true,
        jest: true
    },
    extends: ['airbnb', 'airbnb/hooks'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'
    ],
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'
            ],
        },
      'import/resolver': {
        typescript: {},
        },
    },
    rules: {
      'no-console': 'off',
      "react/jsx-props-no-spreading": "off",
      'react/jsx-filename-extension': [
            2,
            { extensions: ['.js', '.jsx', '.ts', '.tsx'
                ]
            }
        ],
      'import/no-extraneous-dependencies': [
            2,
            { devDependencies: ['**/test.tsx', '**/test.ts'
                ]
            }
        ],
      '@typescript-eslint/indent': [
            2,
            2
        ],
        'no-plusplus': ["error", { "allowForLoopAfterthoughts": true }]
    },
};