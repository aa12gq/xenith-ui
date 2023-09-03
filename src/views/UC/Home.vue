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
    <el-col :span="2" class=""></el-col>

    <el-col :span="20" class="flex h-full">
        <div class="w-full">
            <div class="grid grid-cols-8 gap-6 mt-4 box p-3">
                <div class="col-span-1">
                    <!-- BEGIN: 左边菜单-->
                    <el-menu default-active="2" class="w-full h-[38rem] bg-white rounded">
                        <el-menu-item index="1" disabled>
                            <span v-if="userId == Number(userInfo.id)">我的创作</span>
                            <span v-else>Ta的创作</span>
                        </el-menu-item>
                        <el-menu-item index="2" @click="$router.push(`/users/${userId}`)" :class="{ 'selected-menu': $route.path === `/users/${userId}` }">
                            <el-icon><User /></el-icon>
                            <span>基本资料</span>
                        </el-menu-item>
                    </el-menu>
                    <!-- END: 左边菜单-->
                </div>

                <!-- BEGIN: 右边子页面 -->
                <div class="col-span-7 rounded-xl">
                    <RouterView v-slot="{ Component }">
                        <keep-alive>
                            <component :is="Component" />
                        </keep-alive>
                    </RouterView>
                </div>
                <!-- END: 右边子页面 -->
            </div>
        </div>
    </el-col>
    <el-col :span="2" class=""></el-col>
</template>

<style scoped>
.selected-menu {
    background-color: #f0f0f0;
}
</style>
