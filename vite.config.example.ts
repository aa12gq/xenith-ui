import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import path from 'path';

export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            // 目标文件
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.vue$/,
                /\.vue\?vue/, // .vue
                /\.md$/, // .md
            ],

            // 全局引入插件
            imports: [
                // presets
                'vue',
                'vue-router',
                // custom
                {
                    '@vueuse/core': [
                        // named imports
                        'useMouse', // import { useMouse } from '@vueuse/core',
                        // alias
                        ['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
                    ],
                    axios: [
                        // default imports
                        ['default', 'axios'], // import { default as axios } from 'axios',
                    ],
                },
            ],

            // eslint报错解决
            eslintrc: {
                enabled: false, // enabled为true时，会根据filepath生成一个eslint的配置文件。这个文件需要引入到eslint的配置文件中,需要更新配置文件的时候改为true。
                filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
                globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
            },

            // 解析器，例如element-plus的ElementPlusResolver
            // see https://github.com/antfu/unplugin-auto-import/pull/23/
            resolvers: [
                /* ... */
            ],
            // 声明文件生成位置和文件名称
            dts: 'src/auto-import.d.ts',
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            'tailwind-config': path.resolve(__dirname, './tailwind.config.js'),
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://host:port',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, ''),
            },
        },
    },
});
