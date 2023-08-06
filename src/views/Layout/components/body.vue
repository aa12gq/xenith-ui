<template>
    <el-row class="w-full h-full bg-[#eef0f3]">
        <el-col :span="6" class="py-4 flex justify-end">
            <div class="h-full mr-6">
                <div class="bg-white w-[15rem] !shadow-none mt-8 p-4">
                    <div class="flex flex-col items-center w-full justify-center space-y-2 text-lg">
                        <div
                            class="hover:bg-slate-100 w-full h-10 flex items-center justify-center border-b bg-[#E8F0FE] text-[#2A73FA] space-x-2"
                        >
                            <el-icon><Sunny /></el-icon>
                            <span>精华</span>
                        </div>
                        <div
                            class="hover:bg-slate-100 w-full h-10 flex items-center justify-center border-b space-x-2"
                        >
                            <el-icon><Star /></el-icon>
                            <span>关注</span>
                        </div>
                    </div>
                </div>
            </div>
        </el-col>
        <el-col :span="12" class="flex h-full py-12 flex-col">
            <!-- BENGIN: 文章Tab栏目 -->
            <el-row class="body w-full">
                <el-col :span="24" class="bg-white p-4 pt-0">
                    <el-tabs v-model="defaultTab">
                        <el-tab-pane label="推荐" name="first" class="h-full">
                            <!-- BEGIN: 推荐文章列表 -->
                            <ArticleList :articles="articles" />
                            <!-- END:   推荐文章列表 -->
                        </el-tab-pane>
                        <el-tab-pane label="最新" name="second">
                            <!-- BEGIN: 最新文章列表 -->
                            <ArticleList :articles="articles" />
                            <!-- END:   最新文章列表 -->
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-row>
            <!-- END: 文章Tab栏目 -->
        </el-col>
        <el-col :span="6" class="pl-6 py-12">
            <el-card class="box-card w-[20rem] !shadow-none">
                <template #header>
                    <div class="card-header border-b">
                        <img
                            src="https://cdn.learnku.com//uploads/communities/sNljssWWQoW6J88O9G37.png"
                            class="w-8 mr-3"
                        />
                        <span>Go技术社区</span>
                    </div>
                </template>
                <div class="text-sm text-[#5D6367]">
                    Go（又称 Golang）是 Google
                    开发的一种静态强类型、编译型、并发型，并具有垃圾回收功能的编程语言。Go
                    被誉为是未来的服务器端编程语言。
                </div>
                <div class="flex items-center w-full justify-center mt-6">
                    <el-button class="w-full px-2">
                        <el-icon><EditPen /></el-icon>
                        <span class="ml-2">发布内容</span>
                    </el-button>
                </div>
            </el-card>
            <el-card class="box-card w-[20rem] !shadow-none mt-8">
                <template #header>
                    <div class="card-header border-b flex justify-center">
                        <span>友情链接</span>
                    </div>
                </template>

                <div class="flex flex-col items-center w-full justify-center">
                    <img
                        class="h-16"
                        src="https://cdn.learnku.com/assets/images/friends/ruby-china.png"
                    />
                    <img
                        class="h-16 mt-4"
                        src="https://cdn.learnku.com/uploads/banners/lHLqvDd0TQZD7CKdmguG.png"
                    />
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import ArticleList from '@/components/ArticleList.vue';
import * as pb from '@/stores/proto/app/article';
import { ListArticle } from '@/stores/app/article';
import { onMounted, ref, watch } from 'vue';

const defaultTab = ref<string>('');
const articles = ref<pb.ListArticleReply>(pb.ListArticleReply.create());

const RefreshArticle = () => {
    ListArticle(
        pb.ListArticleRequest.create({ page: 1 }),
        (d: pb.ListArticleReply) => {
            articles.value = d;
            localStorage.setItem('selectedTab', defaultTab.value);
        },
        why => {
            console.log('获取文章列表失败', why.response.data);
        }
    );
};

// 页面加载时设置选中的选项卡
watch(defaultTab, newTab => {
    if (newTab) {
        localStorage.setItem('selectedTab', newTab);
    }
});

onMounted(() => {
    const selectedTab = localStorage.getItem('selectedTab');
    if (selectedTab) {
        defaultTab.value = selectedTab;
    } else {
        defaultTab.value = 'first';
    }
    RefreshArticle();
});
</script>

html

<style scoped></style>
