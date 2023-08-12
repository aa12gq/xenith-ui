import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import App from './App.vue';
import router from './router';
import '@/assets/css/app.css';
import '@/assets/css/common.css';
import '@/assets/css/preflight.css';
import 'nprogress/nprogress.css';

import 'normalize.css';

const app = createApp(App);
app.use(createPinia().use(piniaPluginPersistedstate));
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app.use(ElementPlus);
app.use(router);

app.mount('#app');
