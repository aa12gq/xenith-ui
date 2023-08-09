<template>
    <el-row class="w-full h-full bg-[#eef0f3]">
        <el-col :span="6" class="py-4 flex justify-end">1</el-col>
        <el-col :span="12" class="flex h-full py-12 flex-col bg-pink-100">
            <!-- BENGIN: 文章Tab栏目 -->
            <el-row class="body w-full"></el-row>
            <!-- END: 文章Tab栏目 -->
        </el-col>
        <el-col :span="6" class="pl-6 py-12">
            <el-card class="box-card w-[20rem] !shadow-none">
                <template #header>
                    <div class="card-header border-b">
                        <img
                            src="https://bitpig-column.oss-cn-hangzhou.aliyuncs.com/AA12/190691488370262017.jpg"
                            class="w-8 mr-3"
                        />
                        <span>A12技术社区</span>
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
import * as pb from '@/stores/proto/app/article';
import { GetArticle } from '@/stores/app/article';
import { onMounted, ref, watch } from 'vue';

const getArticle = () => {
    GetArticle(
        pb.GetArticleRequest.create({ id: BigInt(1n) }),
        (d: pb.GetArticleReply) => {
            console.log('测试', d);
        },
        () => {}
    );
};

onMounted(() => {
    getArticle();
});
</script>
