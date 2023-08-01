/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    // 自定义规则
    rules: {
        // vue组件必须用组合词: 关闭
        'vue/multi-word-component-names': 'off',
        // 禁止使用 var
        'no-var': 'error',
        // 优先使用 interface 而不是 type
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        // 'prettier/prettier': 'off',
    },
    extends: [
        'vue-global-api',
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-typescript',
        '@vue/eslint-config-prettier',
        'vue-global-api/reactivity',
        'vue-global-api/lifecycle',
        'vue-global-api/component',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
};
