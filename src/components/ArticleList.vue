<script lang="ts" setup>
import * as pb from '@/stores/proto/app/article';
import { formatRelativeTime, formatDate } from '@/utils/date';

interface Props {
    articles: pb.ListArticleReply;
    [key: string]: any;
}

const props = defineProps<Props>();
const emit = defineEmits(['handleArticleListPageChange']);

const handleArticleListPageChange = (page: number) => {
    emit('handleArticleListPageChange', page);
};

const isNewArticle = (createdDateSeconds: bigint) => {
    const currentDate = new Date();
    const articleDate = new Date(Number(createdDateSeconds) * 1000);
    const timeDiff = Math.abs(currentDate.getTime() - articleDate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return diffDays <= 3;
};
</script>

<template>
    <el-skeleton :rows="5" animated v-if="props.articles.count == 0" />
    <div class="intro-x w-full min-h-32" v-else>
        <div class="space-y-3">
            <div class="rounded-lg shadow-sm bg-white" v-for="(item, index) in props.articles.data" :key="index">
                <div class="p-2 cursor-pointer hover:bg-slate-100" @click="$router.push(`articles/${item.id}`)">
                    <h4 class="text-lg max-w-fit font-semibold text-[#596064]">
                        <span class="cursor-pointer">
                            {{ item.title }}
                        </span>
                        <el-tooltip class="box-item" effect="dark" content="三天内发布的文章" placement="top" v-if="isNewArticle(item?.createdDate!.seconds)">
                            <i style="font-size: 0.9em; color: #dd4848; margin-left: 5px" class="ui popover visible">new</i>
                        </el-tooltip>
                    </h4>
                    <div class="flex m-2 items-center">
                        <div v-if="item?.author?.avatar" class="rounded w-[2.5rem] overflow-hidden">
                            <img class="w-full h-full object-contain" :src="item?.author?.avatar" />
                        </div>
                        <div class="w-full h-[2.8rem] whitespace-pre-wrap truncate">
                            <p class="text-gray-500 ml-4 flex-grow">{{ item.summary }}</p>
                        </div>
                    </div>
                    <div class="flex items-center text-[#7F8694]">
                        <div class="mr-2 flex items-center hover:text-[#21529C] hover:underline cursor-pointer" @click.stop="$router.push(`/users/${item.author?.id}`)">
                            <span class="ml-1">{{ item?.author?.name }}</span>
                        </div>
                        <div class="text-[#7F8694]">
                            <el-tooltip class="box-item" effect="dark" :content="'发布于 ' + formatDate(item?.createdDate!.seconds, true)" placement="top">
                                <span class="text-[#7F8694] cursor-pointer">
                                    {{ formatRelativeTime(item?.createdDate!.seconds) }}
                                </span>
                            </el-tooltip>
                        </div>
                        <div class="ml-4 flex items-center text-[#7F8694]">
                            <el-icon><View /></el-icon>
                            <span class="ml-1">{{ item.views }}</span>
                        </div>
                        <div class="mx-4 flex items-center text-[#7F8694]">
                            <el-icon><ChatDotSquare /></el-icon>
                            <span class="ml-1">0</span>
                        </div>
                        <div class="mr-2 flex items-center text-[#7F8694]">
                            <el-icon><Star /></el-icon>
                            <span class="ml-1">{{ item.links }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <el-pagination background layout="prev, pager, next" :total="props.articles.total" v-model:current-page="props.articles.page" @current-change="handleArticleListPageChange" />
        </div>
    </div>
</template>
