<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import router from '@/router';
import { ucStore } from '@/stores/app/auth';
import * as authPb from '@/stores/proto/app/auth';
import * as articlePb from '@/stores/proto/app/article';
import { ListArticleForUser } from '@/stores/app/article';
import { GetUserInfo } from '@/stores/app/auth';
import { formatRelativeTime, formatDate } from '@/utils/date';

const userInfo = ref<authPb.UserInfo>(authPb.UserInfo.create());
const articles = ref<articlePb.ListArticlesForUserReply>(articlePb.ListArticlesForUserReply.create());

const refreshArticle = () => {
    const userId = router.currentRoute.value.params.id?.[0];
    if (userId !== undefined) {
        ListArticleForUser(articlePb.ListArticlesForUserRequest.create({ userId: BigInt(userId), page: 1 }), (reply: articlePb.ListArticlesForUserReply) => {
            articles.value = reply;
        });
    }
};

const refreshUserInfo = () => {
    const userId = router.currentRoute.value.params.id?.[0];
    if (userId !== undefined) {
        GetUserInfo(BigInt(userId), reply => {
            userInfo.value = reply.userInfo!;
        });
    }
};

onMounted(() => {
    refreshUserInfo();
    refreshArticle();
});
onActivated(() => {
    refreshUserInfo();
    refreshArticle();
});

watch(router.currentRoute, (to, from) => {
    if (to.params.id !== from.params.id) {
        refreshUserInfo();
        refreshArticle();
    }
});

const isLastItem = (index: number) => index === articles.value.count - 1;
</script>

<template>
    <div class="w-full h-full flex">
        <!-- BEGIN: 中间内容区 -->
        <el-col :span="18" class="h-full pr-8">
            <div class="w-full h-14 bg-white flex items-center justify-center shadow-sm text-md text-[#596064]">注册于 {{ formatRelativeTime(userInfo?.createdDate?.seconds) }}</div>
            <div class="w-full h-14 bg-white flex items-center justify-center shadow-sm text-md text-[#596064] mt-4" v-if="userInfo.personalProfile">个人介绍: {{ userInfo.personalProfile }}</div>
            <div class="w-full h-full shadow-sm mt-6">
                <!-- BEGIN:动态 -->
                <!-- <div class="bg-white p-6">
                    <div class="text-lg text-[#9B9B9B] flex items-center space-x-1">
                        <el-icon><BellFilled /></el-icon>
                        <span>{{ userInfo.userName }}的动态</span>
                    </div>
                </div> -->
                <!-- END:动态 -->
                <!-- BEGIN:博文 -->
                <div class="bg-white mt-4 p-6">
                    <div class="text-lg text-[#9B9B9B] flex flex-col space-x-1">
                        <div class="mb-2 flex items-center">
                            <el-icon><Management /></el-icon>
                            <span class="ml-1">{{ userInfo.userName }}发布的博文</span>
                        </div>
                        <div class="">
                            <div class="" :style="{ 'border-bottom': isLastItem(index) ? 'none' : '1px #e0e3ea solid' }" v-for="(item, index) in articles.data" :key="index">
                                <h4 class="text-lg font-semibold hover:underline my-4 text-[#4A4A4A]" @click="$router.push(`/articles/${item.id}`)">
                                    <span class="cursor-pointer">
                                        {{ item.title }}
                                    </span>
                                </h4>

                                <div class="flex items-center text-sm">
                                    <div>
                                        <el-tooltip class="box-item" effect="dark" :content="'发布于 ' + formatDate(item?.createdDate!.seconds, true)" placement="top">
                                            <span class="text-gray-500 cursor-pointer">
                                                {{ formatRelativeTime(item?.createdDate!.seconds) }}
                                            </span>
                                        </el-tooltip>
                                    </div>
                                    <div class="ml-4 flex items-center">
                                        <el-icon><View /></el-icon>
                                        <span class="ml-1">{{ item.views }}</span>
                                    </div>
                                    <div class="mx-4 flex items-center">
                                        <el-icon><ChatDotSquare /></el-icon>
                                        <span class="ml-1">0</span>
                                    </div>
                                    <div class="mr-2 flex items-center">
                                        <el-icon><Star /></el-icon>
                                        <span class="ml-1">{{ item.links }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- END:博文 -->
            </div>
        </el-col>
        <!-- END: 中间内容区 -->

        <!-- BEGIN: 右侧用户介绍卡片 -->
        <el-col :span="6" class="flex flex-row h-full">
            <el-card :body-style="{ padding: '0px' }" class="w-full h-[37rem] p-6 !shadow-sm">
                <img :src="userInfo.avatar" class="image h-[16rem] object-contain" />
                <div class="w-full border-b py-4" style="border-bottom: 1px #e0e3ea solid">
                    <div class="text-sm text-[#7D8183] flex justify-around text-center w-full">
                        <div class="flex flex-col">
                            <span>文章</span>
                            <span>{{ userInfo.articleTotal }}</span>
                        </div>
                        <div class="flex flex-col">
                            <span>粉丝</span>
                            <span>0</span>
                        </div>
                        <div class="flex flex-col">
                            <span>喜欢</span>
                            <span>0</span>
                        </div>
                        <div class="flex flex-col">
                            <span>收藏</span>
                            <span>0</span>
                        </div>
                    </div>
                </div>
                <div class="mt-6 text-xl flex items-center space-x-1">
                    <span>{{ userInfo.userName }}</span>
                    <el-icon v-if="userInfo.gender == 0" class="text-[#96A3BF] font-blod"><Male /></el-icon>
                    <el-icon v-else class="text-[#E26357] font-blod"><Female /></el-icon>
                </div>
                <div class="mt-2 text-[#9B9B9B] text-sm flex items-center space-x-1" v-if="userInfo.city">
                    <el-icon class="font-blod"><LocationInformation /></el-icon>
                    <span>{{ userInfo.city }}</span>
                </div>
                <div class="flex items-center w-full justify-center mt-6">
                    <el-button class="w-full px-2">
                        <el-icon><Plus /></el-icon>
                        <span class="ml-2">关注</span>
                    </el-button>
                </div>
                <div class="flex items-center w-full justify-center mt-4">
                    <el-button class="w-full px-2">
                        <el-icon><Plus /></el-icon>
                        <span class="ml-2">私信</span>
                    </el-button>
                </div>
            </el-card>
        </el-col>
        <!-- EDN: 右侧用户介绍卡片 -->
    </div>
</template>
