<template>
    <div class="w-full min-h-32" v-if="props.articles && props.articles.data">
        <div class="space-y-3">
            <div
                class="rounded-lg shadow-sm bg-white"
                v-for="(item, index) in props.articles.data"
                :key="index"
            >
                <div class="p-3">
                    <h4
                        class="text-lg font-semibold underline text-[#265CA1] hover:text-orange-500"
                        @click="$router.push(`articles/${item.id}`)"
                    >
                        <span class="cursor-pointer">
                            {{ item.title }}
                        </span>
                    </h4>
                    <div class="flex my-4 items-center">
                        <div
                            v-if="item?.author?.avatar"
                            class="rounded-lg w-[3rem] h-[2.5rem] overflow-hidden"
                        >
                            <img class="w-full h-full object-cover" :src="item?.author?.avatar" />
                        </div>
                        <div class="w-full h-[2.5rem] whitespace-pre-wrap truncate">
                            <p class="text-gray-500 ml-4 flex-grow">{{ item.summary }}</p>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <div
                            class="mr-2 flex items-center text-[#21529C] hover:underline cursor-pointer"
                        >
                            <span class="ml-1">{{ item?.author?.name }}</span>
                        </div>
                        <div>
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                :content="'发布于 ' + formatDate(item?.createdDate!.seconds, true)"
                                placement="top"
                            >
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
</template>

<script lang="ts" setup>
import * as pb from '@/stores/proto/app/article';
import { formatRelativeTime, formatDate } from '@/utils/date';
interface Props {
    articles: pb.ListArticleReply;
    [key: string]: any;
}
const props = defineProps<Props>();
</script>
