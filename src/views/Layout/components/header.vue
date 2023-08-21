<template>
    <el-row class="h-full flex items-center justify-center shadow-md bg-white">
        <el-col :xl="6" :lg="2" :md="4" class="bg-purple-200"></el-col>

        <el-col :xl="12" :lg="20" :md="18" class="flex h-full">
            <div class="flex items-center space-x-6 h-full">
                <img src="https://bitpig-column.oss-cn-hangzhou.aliyuncs.com/AA12/190691488370262017.jpg" class="w-8" />
                <div class="hidden md:flex xl:flex justify-center items-center text-md text-[#6c6c6c] font-bold h-full">
                    <div class="menu-item" @click="$router.push('/')">
                        <span class="whitespace-nowrap">社区</span>
                    </div>
                    <div class="menu-item">
                        <span class="whitespace-nowrap">活动</span>
                    </div>
                    <div class="menu-item">
                        <span class="whitespace-nowrap">文档</span>
                    </div>
                    <div class="menu-item">
                        <span class="whitespace-nowrap">教程</span>
                    </div>
                    <div class="menu-item">
                        <span class="whitespace-nowrap">后端</span>
                    </div>
                    <div class="menu-item">
                        <span class="whitespace-nowrap">前端</span>
                    </div>
                </div>
                <el-autocomplete class="hidden xl:flex" v-model="state" :fetch-suggestions="querySearchAsync" placeholder="社区搜索" :loading="isLoading">
                    <template #suffix>
                        <el-icon class="el-input__icon">
                            <search />
                        </el-icon>
                    </template>
                    <template #default="{ item }">
                        <div v-if="noResults">
                            <div class="text-gray-500">搜索结果为0</div>
                        </div>
                        <div v-else class="p-3 w-[40rem] min-h-[10rem]">
                            <h4 class="text-lg max-w-fit font-semibold underline text-[#265CA1] hover:text-orange-500" @click="$router.push(`articles/${item.id}`)">
                                <span class="cursor-pointer">
                                    {{ item.title }}
                                </span>
                            </h4>
                            <div class="flex my-4 items-center">
                                <div v-if="item?.author?.avatar" class="rounded-lg w-[3rem] h-[2.5rem] overflow-hidden">
                                    <img class="w-full h-full object-contain" :src="item?.author?.avatar" />
                                </div>
                                <div class="w-full h-[2.5rem] whitespace-pre-wrap truncate">
                                    <p class="text-gray-500 ml-4 flex-grow">{{ item.summary }}</p>
                                </div>
                            </div>
                            <div class="flex items-center">
                                <div class="mr-2 flex items-center text-[#21529C] hover:underline cursor-pointer" @click="$router.push(`/users/${item.author?.id}`)">
                                    <span class="ml-1">{{ item?.author?.name }}</span>
                                </div>
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
                    </template>
                </el-autocomplete>
            </div>
            <div class="flex items-center ml-auto">
                <div class="flex space-x-8" v-if="!userInfo.id">
                    <div @click="store.setDialogModal(true)" class="cursor-pointer">登录</div>
                    <div class="cursor-pointer">注册</div>
                </div>
                <el-dropdown v-else trigger="click" size="large" class="cursor-pointer h-full">
                    <span class="el-dropdown-link font-bold flex items-center w-[7.3rem] text-xl">
                        <img :src="userInfo.avatar" class="w-7 rounded-2xl" />
                        <span class="ml-2 mt-1 text-lg">{{ userInfo.userName }}</span>
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="$router.push('/articles/create')">新建博文</el-dropdown-item>
                            <el-dropdown-item>我的博客</el-dropdown-item>
                            <el-dropdown-item @click="$router.push(`/users/${userInfo.id}`)">个人中心</el-dropdown-item>
                            <el-dropdown-item @click="$router.push('/users/settings/edit')">编辑资料</el-dropdown-item>
                            <el-dropdown-item @click="store.logout()">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </el-col>
        <el-col :xl="6" :lg="2" :md="4" class="pl-6"></el-col>
    </el-row>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import router from '@/router';
import { ucStore } from '@/stores/app/auth';
import { ListArticle } from '@/stores/app/article';
import * as pb from '@/stores/proto/app/article';
import { ElMessage } from 'element-plus';
import { formatRelativeTime, formatDate } from '@/utils/date';

const store = ucStore();
const { userInfo } = storeToRefs(store);
const state = ref('');
const noResults = ref(false);
const isLoading = ref(false);

const querySearchAsync = (queryString: string) => {
    return new Promise((resolve, reject) => {
        if (queryString) {
            ListArticle(
                pb.ListArticleRequest.create({ page: 1 }),
                'latest',
                queryString,
                (d: pb.ListArticleReply) => {
                    if (d.data && d.count === 0) {
                        noResults.value = true;
                        resolve([{ title: '搜索结果为0' }]);
                    } else {
                        noResults.value = false;
                        resolve(d.data);
                    }
                },
                why => {
                    const { message } = why.response.data;
                    ElMessage.error(message);
                    reject(why);
                }
            );
        } else {
            resolve([]);
        }
    });
};

onMounted(() => {});
</script>

<style scoped>
.menu-item {
    @apply cursor-pointer hover:bg-slate-50 hover:text-black px-2 flex items-center h-full;
}
</style>
