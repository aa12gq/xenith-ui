<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { onMounted, ref, onActivated } from 'vue';
import router from '@/router';
import { ucStore } from '@/stores/app/auth';

const store = ucStore();
const { userInfo } = storeToRefs(store);
let userId = ref(0);

const updateUserId = () => {
    userId.value = Number(router.currentRoute.value.params.id);
};

onMounted(updateUserId);
onActivated(updateUserId);

watch(router.currentRoute, (to, from) => {
    if (to.params.id !== from.params.id) {
        updateUserId();
    }
});
</script>

<template>
    <el-col :xl="6" :lg="4" :md="4" class=""></el-col>

    <el-col :xl="12" :lg="18" :md="18" class="flex h-full">
        <div class="grid grid-cols-12 gap-6 mt-4 box bg-slate-50 p-3">
            <div class="flex flex-col-reverse col-span-12 lg:col-span-2 2xl:col-span-2 lg:block">
                <!-- BEGIN: 左边菜单-->
                <el-menu default-active="2" class="el-menu-vertical-demo w-[14rem] h-[38rem] bg-white rounded-xl">
                    <el-menu-item index="1" disabled>
                        <span v-if="userId == Number(userInfo.id)">我的创作</span>
                        <span v-else>Ta的创作</span>
                    </el-menu-item>
                    <el-menu-item index="2" @click="$router.push(`/users/${userId}`)" :class="{ 'selected-menu': $route.path === `/users/${userId}` }">
                        <el-icon><User /></el-icon>
                        <span>基本资料</span>
                    </el-menu-item>
                </el-menu>
            </div>

            <!-- BEGIN: 右边子页面 -->
            <div class="overflow-hidden col-span-12 lg:col-span-10 2xl:col-span-10 rounded-xl">
                <RouterView v-slot="{ Component }">
                    <keep-alive>
                        <component :is="Component" />
                    </keep-alive>
                </RouterView>
            </div>
            <!-- END: 右边子页面 -->
        </div>
        <!-- END: 左边菜单-->
    </el-col>
    <el-col :xl="6" :lg="4" :md="4" class=""></el-col>
</template>

<style scoped>
.selected-menu {
    background-color: #f0f0f0;
}
</style>
