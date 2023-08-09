<template>
    <el-container class="flex flex-col h-screen">
        <el-header class="h-14 p-0">
            <Header />
        </el-header>
        <el-container class="flex-grow bg-slate-50">
            <!-- <Body /> -->
            <RouterView v-slot="{ Component }">
                <transition name="fade">
                    <keep-alive :max="10">
                        <component :is="Component"></component>
                    </keep-alive>
                </transition>
            </RouterView>
        </el-container>
        <el-footer class="bg-[#1a1a1b]">
            <Footer />
        </el-footer>
    </el-container>
</template>

<script lang="ts" setup>
import Header from './components/header.vue';
import Footer from './components/footer.vue';
</script>

<style></style>
