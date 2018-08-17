
const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')
const path = require('path')

class TailwindExtractor {
    static extract (content) {
        return content.match(/[A-Za-z0-9-_:\/]+/g) || []
    }
}

module.exports = {
    head: {
        title: 'frontend',
        meta: [
            {
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: 'Nuxt.js project'
            }
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico'
            }
        ]
    },

    css: [
        '@/assets/css/main.css'
    ],

    router: {
        base: '',
        linkActiveClass: 'is-active'
    },

    loading: {
        color: '#20504f'
    },

    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/toast',
        '@nuxtjs/moment',
    ],

    axios: {
        baseURL: 'http://hausify.test/api/v1',
        retry: {
            retries: 3
        }
    },

    toast: {
        position: 'bottom-right'
    },

    plugins: [
        '~/plugins/axios'
    ],

    mode: 'spa',

    build: {
        extend (config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }

            if (!isDev) {
                config.plugins.push(
                    new PurgecssPlugin({
                        paths: glob.sync([
                            path.join(__dirname, './pages/**/*.vue'),
                            path.join(__dirname, './layouts/**/*.vue'),
                            path.join(__dirname, './components/**/*.vue')
                        ]),
                        extractors: [{
                            extractor: TailwindExtractor,
                            extensions: [
                                'vue'
                            ]
                        }],
                        whitelist: [
                            'html', 'body'
                        ]
                    })
                )
            }
        }
    }
}

