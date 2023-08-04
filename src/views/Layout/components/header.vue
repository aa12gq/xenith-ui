<template>
    <el-row class="h-full flex items-center justify-center shadow-2xl bg-white">
        <el-col :span="5" class="bg-purple-200"></el-col>

        <el-col :span="13" class="flex h-full">
            <div class="flex items-center space-x-6 h-full">
                <el-dropdown trigger="click" size="large" class="cursor-pointer h-full">
                    <span class="el-dropdown-link flex items-center w-[5.5rem]">
                        <img :src="currentCommunity.logo" class="w-8" />
                        <span class="font-bold ml-2 text-md">{{ currentCommunity.name }}</span>
                        <el-icon class="el-icon--right w-4 h-4 ml-auto">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu size="large">
                            <el-dropdown-item
                                v-for="item in communitys"
                                :key="item.id"
                                @click="currentCommunity = item"
                            >
                                <img :src="item.logo" class="w-4 h-4 mr-2" />
                                <span>{{ item.name }}</span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <div
                    class="hidden md:flex xl:flex justify-center items-center text-md text-[#6c6c6c] font-bold h-full"
                >
                    <div class="menu-item">
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
                <el-autocomplete
                    class="hidden xl:flex"
                    v-model="state"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="社区搜索"
                    @select="handleSelect"
                >
                    <template #suffix>
                        <el-icon class="el-input__icon">
                            <search />
                        </el-icon>
                    </template>
                    <template #default="{ item }">
                        <div class="value">{{ item.value }}</div>
                        <span class="link">{{ item.link }}</span>
                    </template>
                </el-autocomplete>
            </div>
            <div class="flex items-center ml-auto">
                <el-dropdown trigger="click" size="large" class="cursor-pointer h-full">
                    <span class="el-dropdown-link font-bold flex items-center w-[7.3rem] text-xl">
                        <img
                            src="https://bitpig-column.oss-cn-hangzhou.aliyuncs.com/AA12/132366678901129217.jpg?x-oss-process=image/resize,m_pad,h_50,w_50"
                            class="w-7 rounded-2xl"
                        />
                        <span class="ml-2 mt-1 text-lg">AA12</span>
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>我的博客</el-dropdown-item>
                            <el-dropdown-item>个人中心</el-dropdown-item>
                            <el-dropdown-item>编辑资料</el-dropdown-item>
                            <el-dropdown-item>退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </el-col>
        <el-col :span="5" class="pl-6"></el-col>
    </el-row>
</template>

<script lang="ts" setup>
import * as pb from '@/stores/proto/app/community';
import { ListCommunity } from '@/stores/app/community';
import { onMounted, ref } from 'vue';

const communitys = ref<pb.ListCommunityReply>(pb.ListCommunityReply.create());
const currentCommunity = ref<pb.Community>(pb.Community.create({}));

const state = ref('');
interface LinkItem {
    value: string;
    link: string;
}

let timeout: NodeJS.Timeout;
const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
    const results = queryString ? links.value.filter(createFilter(queryString)) : links.value;

    clearTimeout(timeout);
    timeout = setTimeout(() => {
        cb(results);
    }, 3000 * Math.random());
};
const createFilter = (queryString: string) => {
    return (restaurant: LinkItem) => {
        return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
    };
};

const handleSelect = (item: LinkItem) => {
    console.log(item);
};

const loadAll = () => {
    return [
        { value: 'vue', link: 'https://github.com/vuejs/vue' },
        { value: 'element', link: 'https://github.com/ElemeFE/element' },
        { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
        { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
        { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
        { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
        { value: 'babel', link: 'https://github.com/babel/babel' },
    ];
};

const links = ref<LinkItem[]>([]);

const RefreshCommunity = () => {
    ListCommunity(
        pb.ListCommunityRequest.create(),
        (d: pb.ListCommunityReply) => {
            communitys.value = d;
            currentCommunity.value = communitys.value[0];
        },
        (why: { response: { data: any } }) => {
            console.log('获取社区列表失败', why.response.data);
        }
    );
};

onMounted(() => {
    RefreshCommunity();
    links.value = loadAll();
});
</script>

<style scoped>
.menu-item {
    @apply cursor-pointer hover:bg-slate-50 hover:text-black px-2 flex items-center h-full;
}
</style>
