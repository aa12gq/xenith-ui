<template>
    <el-row class="w-full h-full bg-[#eef0f3]">
        <el-col :span="6" class=""></el-col>
        <el-col :span="12" class="flex h-full py-12 flex-col">
            <!-- BENGIN: 文章Tab栏目 -->
            <el-row class="body w-full">
                <el-col :span="24" class="bg-white p-4">
                    <el-tabs class="">
                        <el-tab-pane label="推荐" name="first" class="h-full">
                            <!-- BEGIN: 文章列表 -->
                            <div class="w-full min-h-32">
                                <div class="space-y-3">
                                    <div
                                        class="rounded-lg shadow-sm bg-white"
                                        v-for="(item, index) in articles.data"
                                        :key="index"
                                    >
                                        <div class="p-3">
                                            <h4 class="text-lg font-semibold">
                                                <span class="hover:text-blue-700">
                                                    {{ item.title }}
                                                </span>
                                            </h4>
                                            <div class="flex my-4 items-center">
                                                <div
                                                    v-if="item.authorAvatar"
                                                    class="rounded-lg w-[12rem] h-[4rem] overflow-hidden bg-pink-200"
                                                >
                                                    <img
                                                        class="w-full h-full object-cover"
                                                        :src="item.authorAvatar"
                                                    />
                                                </div>
                                                <div
                                                    class="w-full h-full whitespace-pre-wrap truncate"
                                                >
                                                    <p class="text-gray-500 ml-4 flex-grow">
                                                        {{ item.summary }}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="flex items-center">
                                                <div class="mr-2 flex items-center">
                                                    <img
                                                        :src="item.authorAvatar"
                                                        class="w-6 rounded-2xl"
                                                    />
                                                    <span class="ml-1">{{ item.authorName }}</span>
                                                </div>
                                                <div>
                                                    <span class="text-gray-500">
                                                        {{
                                                            formatRelativeTime(
                                                                item.createdDate.seconds
                                                            )
                                                        }}
                                                    </span>
                                                </div>
                                                <div class="mx-2 flex items-center">
                                                    <el-icon><View /></el-icon>
                                                    <span class="ml-1">{{ item.views }}</span>
                                                </div>
                                                <div class="mr-2 flex items-center">
                                                    <el-icon><ChatDotSquare /></el-icon>
                                                    <span class="ml-1">20</span>
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
                            <!-- END: 文章列表 -->
                        </el-tab-pane>
                        <el-tab-pane label="最新" name="second">最新</el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-row>
            <!-- END: 文章Tab栏目 -->
        </el-col>
        <el-col :span="6" class="pl-6"></el-col>
    </el-row>
</template>

<script lang="ts" setup>
import * as pb from '@/stores/proto/app/article';
import { ListArticle } from '@/stores/app/article';
import { onMounted, ref } from 'vue';
import { getDaysTs, FormatDate, formatRelativeTime } from '@/utils/date';
import { Timestamp } from '@/stores/proto/google/protobuf/timestamp';

const articles = ref<pb.ListArticleReply>(pb.ListArticleReply.create());

const RefreshArticle = () => {
    ListArticle(
        pb.ListArticleRequest.create({ page: 1 }),
        (d: pb.ListArticleReply) => {
            articles.value = d;
        },
        why => {
            console.log('获取文章列表失败', why.response.data);
        }
    );
};

onMounted(() => {
    RefreshArticle();
});
</script>
