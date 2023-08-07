import AppVue from '@/App.vue';
import HomeView from '@/views/Layout/index.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        redirect: '/go',
    },
    {
        path: '/go',
        name: 'go',
        component: () => import('@/views/Layout/index.vue'),
    },
    {
        path: '/:communityName',
        name: 'community',
        component: () => import('@/views/Layout/index.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
