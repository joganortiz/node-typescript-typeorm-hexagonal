module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current'
                }
            }
        ],
        '@babel/preset-typescript'
    ],
    plugins: [
        [
            'module-resolver',
            {
                alias: {
                    '@Apps': './src/Apps',
                    '@Contexts': './src/Contexts',
                    '@Mooc': './src/Contexts/Mooc',
                    '@Shared': './src/Contexts/Shared'
                }
            }
        ],
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-proposal-class-properties", { "loose": true }]
    ]
};