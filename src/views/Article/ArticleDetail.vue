<template>
    <el-row class="w-full h-full bg-[#eef0f3]">
        <el-col :xs="6" :sm="6" :md="6" :xl="7" class="py-4 flex justify-end"></el-col>
        <el-row class="w-full h-full bg-[#eef0f3]">
            <el-col :xs="6" :sm="6" :md="6" :xl="7" class="py-4 flex justify-end"></el-col>
            <!-- BEGIN: 博文内容 -->
            <el-col :xs="12" :sm="12" :md="12" :xl="10" class="flex h-full flex-col p-4">
                <!-- BEGIN: 博文标题 -->
                <el-row class="body h-full w-full bg-white p-4 flex flex-col">
                    <div
                        class="w-full border flex flex-col"
                        style="border-bottom: 1px #cedbe5 solid"
                    >
                        <div class="py-4">
                            <span class="text-xl border-b">{{ Article?.title }}</span>
                        </div>

                        <div class="pb-4 flex items-center">
                            <img :src="Article.author?.avatar" class="w-5 mr-1 rounded-2xl" />
                            <span>{{ Article.author?.name }}</span>
                            <span class="mx-2">/</span>
                            <el-icon><View /></el-icon>
                            <span class="ml-2">{{ Article.views }}</span>
                            <span class="mx-2">/</span>
                            <el-icon><ChatDotSquare /></el-icon>
                            <span class="ml-1">0</span>
                            <span class="mx-2">/</span>
                            <el-icon><Star /></el-icon>
                            <span class="ml-1">{{ Article.links }}</span>
                            <span class="mx-2">/</span>
                            <el-tooltip
                                v-if="Article && Article.createdDate"
                                class="box-item"
                                effect="dark"
                                :content="
                                    '发布于 ' + formatDate(Article.createdDate!.seconds || 0n, true)
                                "
                                placement="top"
                            >
                                <span class="text-gray-500 cursor-pointer">
                                    创建于
                                    {{ formatRelativeTime(Article.createdDate!.seconds || 0n) }}
                                </span>
                            </el-tooltip>
                            <span class="mx-2">/</span>
                            <el-tooltip
                                v-if="Article && Article.updatedDate"
                                class="box-item"
                                effect="dark"
                                :content="
                                    '更新于 ' + formatDate(Article.updatedDate!.seconds || 0n, true)
                                "
                                placement="top"
                            >
                                <span class="text-gray-500 cursor-pointer">
                                    更新于
                                    {{ formatRelativeTime(Article.updatedDate!.seconds || 0n) }}
                                </span>
                            </el-tooltip>
                        </div>
                    </div>

                    <div
                        class="select-text w-full bg-pink-100"
                        v-html="renderedMarkdown"
                        style="white-space: normal; word-break: break-word"
                    ></div>
                </el-row>
                <!-- END: 博文标题 -->
            </el-col>
            <!-- END: 博文内容 -->
            <el-col :xs="6" :sm="6" :md="6" :xl="7" class="pl-6 py-4">
                <div class="box-card w-[20rem] !shadow-none bg-white p-4">
                    <div
                        class="card-header border-b flex items-center p-2"
                        style="border-bottom: 1px #e0e3ea solid"
                    >
                        <div class="flex flex-col">
                            <span class="text-[#6C6C6C]">{{ Article.author?.name }}</span>
                            <span class="text-xs mt-2 text-[#8E8E8E]">未填写</span>
                        </div>

                        <img :src="Article.author?.avatar" class="w-16 ml-auto rounded-full" />
                    </div>

                    <div class="w-full border-b py-4" style="border-bottom: 1px #e0e3ea solid">
                        <div class="text-sm text-[#7D8183] flex justify-around text-center w-full">
                            <div class="flex flex-col">
                                <span>文章</span>
                                <span>{{ Article.author?.articleTotal }}</span>
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

                    <div class="flex items-center w-full justify-center mt-6">
                        <el-button class="w-full px-2">
                            <el-icon><Plus /></el-icon>
                            <span class="ml-2">关注</span>
                        </el-button>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-col :xs="6" :sm="6" :md="6" :xl="7" class="pl-6 py-12"></el-col>
    </el-row>
</template>

<script lang="ts" setup>
import MarkdownIt from 'markdown-it';
import * as pb from '@/stores/proto/app/article';
import { GetArticle } from '@/stores/app/article';
import { useRouter } from 'vue-router';
import { formatRelativeTime, formatDate } from '@/utils/date';

const router = useRouter();
const markdown = ref('');
const renderedMarkdown = ref('');
const md = new MarkdownIt();

const Article = ref<pb.Article>(pb.Article.create());

const fetchArticle = (id: string) => {
    const parsedArticleId = BigInt(id);

    GetArticle(
        pb.GetArticleRequest.create({ id: parsedArticleId }),
        (d: pb.GetArticleReply) => {
            Article.value = d.article!;
            markdown.value = d.article?.content || '';
            renderMarkdown();
        },
        why => {
            console.log('获取文章详情失败', why);
        }
    );
};

onMounted(() => {
    const articleId = router.currentRoute.value.params.id;
    if (Array.isArray(articleId)) {
        fetchArticle(articleId[0]);
    } else {
        fetchArticle(articleId);
    }
});

onActivated(() => {
    const articleId = router.currentRoute.value.params.id;
    if (Array.isArray(articleId)) {
        fetchArticle(articleId[0]);
    } else {
        fetchArticle(articleId);
    }
});
function renderMarkdown() {
    renderedMarkdown.value = md.render(markdown.value);
}
</script>
