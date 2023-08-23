<template>
    <div class="w-full px-6 py-2 bg-white">
        <div class="border-b w-full">
            <h2 class="flex items-center space-x-2 text-[#596064]">
                <el-icon><Edit /></el-icon>
                <span>修改资料</span>
            </h2>
        </div>
        <div>
            <el-form :label-position="labelPosition" label-width="100px" :model="form" style="max-width: 500px">
                <el-form-item label="用户名">
                    <el-input v-model="form.userName" class="relative" />
                    <span class="absolute -right-[18rem] text-[#596064]">用户名只能修改两次，请谨慎操作</span>
                </el-form-item>
                <el-form-item label="真实姓名">
                    <el-input v-model="form.realName" class="relative" />
                    <span class="absolute -right-[8rem] text-[#596064]">如：李小明</span>
                </el-form-item>
                <p class="mb-2">性别</p>
                <el-select v-model="form.gender" class="w-[500px] mb-2" placeholder="请选择">
                    <el-option label="男" :value="0" />
                    <el-option label="女" :value="1" />
                </el-select>
                <el-form-item label="城市">
                    <el-input v-model="form.city" class="relative" />
                    <span class="absolute -right-[10rem] text-[#596064]">如：北京、广州</span>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.email" class="relative" />
                    <span class="absolute -right-[14rem] text-[#596064]">如：name@website.com</span>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input v-model="form.phone" />
                </el-form-item>
                <el-form-item label="个人简介">
                    <el-input v-model="form.personalProfile" type="textarea" class="relative" />
                    <span class="absolute -right-[32rem] text-[#596064]">请一句话介绍你自己，大部分情况下会在你的头像和名字旁边显示</span>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="submit()">应用修改</el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ucStore } from '@/stores/app/auth';
import { storeToRefs } from 'pinia';
import * as pb from '@/stores/proto/app/auth';
import { GetUserInfo } from '@/stores/app/auth';
import { TimestampFromDate, formatRelativeTime, formatDate } from '@/utils/date';

const birthday = ref('');
const labelPosition = ref('top');
const form = reactive<pb.UpdateUserInfoRequest>(pb.UpdateUserInfoRequest.create());
const store = ucStore();
const { userInfo } = storeToRefs(store);

const fetchUserInfo = () => {
    GetUserInfo(BigInt(userInfo.value.id), reply => {
        Object.assign(form, reply.userInfo);
    });
};

const submit = () => {
    store.updateuser(pb.UpdateUserInfoRequest.create({ ...form, id: String(form.id) }));
};

onMounted(() => {
    fetchUserInfo();
});
</script>
