<template>
    <el-row class="w-full h-full bg-[#eef0f3]">
        <el-col :xs="6" :sm="6" :md="6" :xl="7" class="py-4 flex justify-end">
            <div class="h-full mr-6">
                <div class="bg-white w-[18rem] !shadow-none mt-8 p-4">
                    <Category />
                </div>
                <!-- BEGIN: 常用工具集 -->
                <ToolList />
                <!-- END: 常用工具集 -->
            </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :xl="10" class="flex h-full py-12 flex-col">
            <!-- BENGIN: 文章Tab栏目 -->
            <el-row class="body w-full">
                <el-col :span="24" class="bg-white p-4 pt-0">
                    <el-tabs v-model="defaultTab">
                        <el-tab-pane label="推荐" name="first" class="h-full">
                            <!-- BEGIN: 推荐文章列表 -->
                            <ArticleList :articles="articles" @handleArticleListPageChange="handlePageChange" />
                            <!-- END:   推荐文章列表 -->
                        </el-tab-pane>
                        <el-tab-pane label="最新" name="second">
                            <!-- BEGIN: 最新文章列表 -->
                            <ArticleList :articles="articles" @handleArticleListPageChange="handlePageChange" />
                            <!-- END:   最新文章列表 -->
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-row>
            <!-- END: 文章Tab栏目 -->
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :xl="7" class="pl-6 py-12">
            <!-- BEGIN:社区介绍 -->
            <Introduce />
            <!-- END:社区介绍 -->
            <!-- BEGIN:友情链接 -->
            <Links />
            <!-- END:友情链接 -->
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import Introduce from './Introduce.vue';
import Links from './Links.vue';
import Category from './Category.vue';
import ArticleList from '@/components/ArticleList.vue';
import ToolList from '@/components/ToolList.vue';
import * as pb from '@/stores/proto/app/article';
import { ListArticle } from '@/stores/app/article';
import { onMounted, ref, watch } from 'vue';
import { ElMessage } from 'element-plus';

const defaultTab = ref<string>('');
const articles = ref<pb.ListArticleReply>(pb.ListArticleReply.create());

const handlePageChange = (page: number) => {
    pageNum.value = page;
    RefreshArticle();
};

const pageNum = ref(1);
const RefreshArticle = () => {
    const sortType = defaultTab.value === 'first' ? 'recommend' : 'latest';

    ListArticle(
        pb.ListArticleRequest.create({ page: pageNum.value }),
        sortType,
        (d: pb.ListArticleReply) => {
            console.log('测试', d);
            articles.value = pb.ListArticleReply.create();
            setTimeout(() => {
                articles.value = d;
            }, 200);

            localStorage.setItem('selectedTab', defaultTab.value);
        },
        why => {
            ElMessage.error(why);
            console.log('获取文章列表失败', why);
        }
    );
};

// 页面加载时设置选中的选项卡
watch(defaultTab, newTab => {
    if (newTab) {
        localStorage.setItem('selectedTab', newTab);
        RefreshArticle();
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

<style scoped></style>
