const name = process.env.REACT_APP_ID
const { version: streamswapVersion } = require('./package.json')

module.exports = {
    name,
    filename: 'index.js',
    shared: {
        react: { singleton: true, requiredVersion: '^17.0.2' },
        'react-dom': { singleton: true, requiredVersion: '^17.0.2' },
        'react-router-dom': { singleton: true, requiredVersion: '^5.3.0' },
        '@reduxjs/toolkit': { singleton: true, requiredVersion: '^1.6.2' },
        'react-redux': { singleton: true, requiredVersion: '^7.2.5' },
        antd: { singleton: true, requiredVersion: '^4.20.2' },
        '@stream-protocol/context': {
            import: 'os/store/context',
            singleton: true,
            requiredVersion: streamswapVersion,
        },
        '@stream-protocol/providers': {
            import: 'os/providers',
            singleton: true,
            requiredVersion: streamswapVersion,
        },
    },
    remotes: {
        '@frame/stream_swap_assets': 'stream_swap_assets@https://github.com/stream-protocol/stream-swap-assets/index.js',
    },
    exposes: {
        './bootstrap': 'app/bootstrap.app',
        './static': 'app/static.app',
    },
}