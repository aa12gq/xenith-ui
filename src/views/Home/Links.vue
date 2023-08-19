<script lang="ts" setup>
import { ListLink } from '@/stores/app/link';
import * as pb from '@/stores/proto/app/link';
import { ElMessage } from 'element-plus';

const links = ref<pb.ListLinkReply>(pb.ListLinkReply.create());

function RefreshLinks() {
    ListLink(
        function (d) {
            links.value = d;
        },
        function (why) {
            const { message } = why.response.data;
            ElMessage.error(message);
        }
    );
}

function handleLinkClick(url: string | URL | undefined) {
    window.open(url, '_blank');
}

onMounted(() => {
    RefreshLinks();
});
</script>

<template>
    <el-card class="box-card w-[20rem] !shadow-none mt-8">
        <template #header>
            <div class="card-header border-b flex justify-center">
                <span>友情链接</span>
            </div>
        </template>

        <div class="flex flex-col items-center w-full justify-center" v-for="(data, index) in links.links" :key="index">
            <a :href="data.url" @click="handleLinkClick(data.url)">
                <img class="h-16" :src="data.imgPath" />
            </a>
        </div>
    </el-card>
</template>
