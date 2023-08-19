<template>
    <el-row class="w-full h-full bg-[#eef0f3]">
        <el-col :xs="6" :sm="6" :md="6" :xl="7" class="py-4 flex justify-end"></el-col>
        <el-row class="w-full h-full bg-[#eef0f3]">
            <el-col :xs="6" :sm="6" :md="6" :xl="7" class="py-4 flex justify-end"></el-col>
            <!-- BEGIN: 博文内容 -->
            <el-col :xs="12" :sm="12" :md="12" :xl="10" class="flex h-full flex-col p-4">
                <!-- BEGIN: 博文标题 -->
                <el-row class="body h-full w-full bg-white p-4 flex flex-col">
                    <div class="w-full border flex flex-col" style="border-bottom: 1px #cedbe5 solid">
                        <div class="py-4">
                            <span class="text-xl border-b">{{ Article?.title }}</span>
                        </div>

                        <div class="pb-4 flex items-center text-[#A4A8A6]">
                            <img :src="Article.author?.avatar" class="w-5 mr-1 rounded-2xl" />
                            <span class="hover:text-[#2174F4] cursor-pointer" @click="$router.push(`/users/${Article.author?.id}`)">
                                {{ Article.author?.name }}
                            </span>
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
                                :content="'发布于 ' + formatDate(Article.createdDate!.seconds || 0n, true)"
                                placement="top"
                            >
                                <span class="cursor-pointer">
                                    创建于
                                    {{ formatRelativeTime(Article.createdDate!.seconds || 0n) }}
                                </span>
                            </el-tooltip>
                            <span class="mx-2" v-if="Article && Article.updatedDate && Article.updatedDate.seconds != Article.createdDate?.seconds">/</span>
                            <el-tooltip
                                v-if="Article && Article.updatedDate && Article.updatedDate.seconds != Article.createdDate?.seconds"
                                class="box-item"
                                effect="dark"
                                :content="'更新于 ' + formatDate(Article.updatedDate!.seconds || 0n, true)"
                                placement="top"
                            >
                                <span class="text-gray-500 cursor-pointer">
                                    更新于
                                    {{ formatRelativeTime(Article.updatedDate!.seconds || 0n) }}
                                </span>
                            </el-tooltip>
                            <div class="ml-4 space-x-4 flex" v-if="Article.author?.id == userInfo.id">
                                <div class="flex items-center space-x-1 cursor-pointer hover:underline hover:text-[#2174F4]" @click="$router.push(`/articles/${Article.id}/edit`)">
                                    <el-icon><Edit /></el-icon>
                                    <span>编辑</span>
                                </div>
                                <div class="flex items-center space-x-1 cursor-pointer hover:underline hover:text-[#2174F4]" @click="openDeleteBox">
                                    <el-icon><Delete /></el-icon>
                                    <span>删除</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="select-text w-full pt-4" v-html="renderedMarkdown" style="white-space: normal; word-break: break-word"></div>
                </el-row>
                <!-- END: 博文标题 -->
            </el-col>
            <!-- END: 博文内容 -->
            <el-col :xs="6" :sm="6" :md="6" :xl="7" class="pl-6 py-4">
                <div class="box-card w-[20rem] !shadow-none bg-white p-4">
                    <div class="card-header border-b flex items-center p-2" style="border-bottom: 1px #e0e3ea solid">
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
import { GetArticle, DeleteArticle } from '@/stores/app/article';
import { useRouter } from 'vue-router';
import { formatRelativeTime, formatDate } from '@/utils/date';
import hljs from 'highlight.js';
import { ucStore } from '@/stores/app/auth';
import { storeToRefs } from 'pinia';
import { ElMessageBox, ElMessage } from 'element-plus';
import { Delete } from '@element-plus/icons-vue';
import { showMessage } from '@/utils/toast';
import ClipboardJS from 'clipboard';

const store = ucStore();
const { userInfo } = storeToRefs(store);
const router = useRouter();
const markdown = ref('');
const renderedMarkdown = ref('');
let md = new MarkdownIt({
    html: false,
    xhtmlOut: false,
    breaks: false,
    langPrefix: 'language-',
    linkify: false,
    typographer: false,
    quotes: '“”‘’',
    highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' + hljs.highlight(lang, str, true).value + '</code></pre>';
            } catch (__) {}
        }

        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    },
}) as MarkdownIt;

const Article = ref<pb.Article>(pb.Article.create());



const fetchArticle = (id: string) => {
    const parsedArticleId = BigInt(id);

    GetArticle(
        pb.GetArticleRequest.create({ id: parsedArticleId }),
        (d: pb.GetArticleReply) => {
            Article.value = pb.Article.create();
            setTimeout(() => {
                Article.value = d.article!;
                markdown.value = d.article?.content || '';
                renderMarkdown();
            }, 100);
        },
        why => {
            Article.value = pb.Article.create();
            renderedMarkdown.value = '';
            markdown.value = '';
            const { message } = why.response.data;
            showMessage(message, 'error');
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
    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
        new ClipboardJS(btn);
    });
}

const deleteArticle = () => {
    DeleteArticle(
        Article.value.id,
        reply => {
            showMessage(reply.message);
            setTimeout(() => {
                router.push('/');
            }, 100);
        },
        why => {
            const { message } = why.response.data;
            showMessage(message, 'error');
        }
    );
};

const openDeleteBox = () => {
    ElMessageBox.confirm('您确定要删除这篇文章吗?', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    })
        .then(() => {
            deleteArticle();
        })
        .catch(() => {});
};
</script>
