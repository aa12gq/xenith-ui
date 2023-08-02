<script setup lang="ts">
import * as pb from '@/stores/proto/app/article';
import * as pb2 from '@/stores/proto/app/auth';
import { ListArticle } from '@/stores/app/article';
import { Login } from '@/stores/app/auth';
import { onMounted, ref } from 'vue';

const article = ref<pb.ListArticleReply>(pb.ListArticleReply.create())

onMounted(() => {
    let req = pb.ListArticleRequest.create({
        page: 1,
    });
    console.log('test', req);
    ListArticle(
        req,
        (d: pb.ListArticleReply) => {
            article.value = d

        },
        fail => {
            console.log('获取博文列表失败', fail);
        }
    );

    Login(
        pb2.LoginByPasswordRequest.create({ account: '18173433075', password: '123456' }),
        (d: pb2.LoginByPasswordReply) => {
            console.log('登录成功', d);
        },
        () => {}
    );
});
</script>

<template>
    <RouterView />
</template>
