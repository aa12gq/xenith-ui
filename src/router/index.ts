import AppVue from '@/App.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: () => import('@/views/Layout/index.vue'),
        children: [
            {
                path: '/',
                component: () => import('@/views/Home/Home.vue'),
            },
            {
                path: '/article/:id',
                component: () => import('@/views/Article/ArticleDetail.vue'),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;
