<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const activeMenu = computed(() => {
    switch (route.path) {
        case '/users/settings/edit':
            return '1';
        case '/users/settings/edit_avatar':
            return '2';
        case '/users/settings/edit_password':
            return '3';
        default:
            return '1';
    }
});
</script>

<template>
    <el-col :xl="6" :lg="4" :md="4" class=""></el-col>

    <el-col :xl="12" :lg="18" :md="18" class="flex h-full">
        <div class="grid grid-cols-12 gap-6 mt-4 box bg-slate-50 p-3">
            <div class="overflow-auto col-span-12 lg:col-span-2 2xl:col-span-2 lg:block row-span-3">
                <!-- BEGIN: 左边菜单-->
                <el-menu :default-active="activeMenu" class="el-menu-vertical-demo w-[16rem] h-[38rem] bg-white rounded-xl">
                    <el-menu-item index="1" @click="$router.push('/users/settings/edit')">
                        <el-icon><User /></el-icon>
                        <span>个人信息</span>
                    </el-menu-item>
                    <el-menu-item index="2" @click="$router.push('/users/settings/edit_avatar')">
                        <el-icon><PictureFilled /></el-icon>
                        <span>修改头像</span>
                    </el-menu-item>
                    <el-menu-item index="3" @click="$router.push('/users/settings/edit_password')">
                        <el-icon><Lock /></el-icon>
                        <span>修改密码</span>
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
