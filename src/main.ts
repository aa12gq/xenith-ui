import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import './assets/css/app.css';
import './assets/css/common.css';
import 'normalize.css';

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.use(ElementPlus);
app.use(createPinia());
app.use(router);

app.mount('#app');
