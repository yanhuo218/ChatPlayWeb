const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        host: '0.0.0.0',
        port: 8081,
        client: {
            webSocketURL: 'ws://0.0.0.0/ws',
        },
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
})
