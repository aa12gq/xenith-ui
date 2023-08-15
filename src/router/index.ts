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
                path: '/articles/:id',
                component: () => import('@/views/Article/ArticleDetail.vue'),
            },
            {
                path: '/articles/create',
                component: () => import('@/views/Article/ArticleCreate.vue'),
            },
            {
                path: '/articles/:id/edit',
                component: () => import('@/views/Article/ArticleEdit.vue'),
            },
            {
                path: '/auth/login',
                component: () => import('@/views/Login/Login.vue'),
            },
            {
                path: '/users',
                component: () => import('@/views/UC/Home.vue'),
                children: [
                    {
                        path: '/users/:id',
                        component: () => import('@/views/UC/Profile.vue'),
                    },
                    {
                        path: '/users/:id/articles',
                        component: () => import('@/views/UC/Articles.vue'),
                    },
                ],
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;
