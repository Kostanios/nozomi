// eslint-disable-next-line no-undef
module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    plugins: ['react', 'jsx-a11y', 'import', '@typescript-eslint'],
    rules: {
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
        'jsx-quotes': [
            'error',
            'prefer-double'
        ],
        'no-var': [
            'error'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'no-constant-condition': 'off',
        'object-curly-spacing': [
            'error',
            'always'
        ],
        'semi': [
            2,
            'always'
        ],
        'no-extra-semi': 'error',
        'no-duplicate-imports': 'error',
        'react/prop-types': 'off',
        'react/display-name': 'off',
        'no-await-in-loop': 'off',
        'no-promise-executor-return': 'off',
        'class-methods-use-this': 'off',
        'import/prefer-default-export': 'off',
        'eol-last': 'error',
        'arrow-parens': [
            'error',
            'as-needed'
        ],
        'no-restricted-imports': [
            'off',
            {
                'patterns': [
                    '../../**'
                ]
            }
        ]
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
