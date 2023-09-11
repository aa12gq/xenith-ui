<template>
    <div class="bg-white min-h-fit p-6">
        <div class="border-b w-full">
            <h2 class="flex items-center space-x-2 text-[#596064]">
                <el-icon><Edit /></el-icon>
                <span>修改密码</span>
            </h2>
        </div>
        <el-form :label-position="labelPosition" label-width="100px" :model="form" :rules="rules" ref="formRef" style="max-width: 500px">
            <el-form-item label="旧密码" prop="password">
                <el-input v-model="form.password" type="password" class="relative" />
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
                <el-input v-model="form.newPassword" type="password" class="relative" />
            </el-form-item>
            <el-form-item label="重复密码" prop="newPasswordConfirm">
                <el-input v-model="form.newPasswordConfirm" type="password" class="relative" />
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="submitForm">应用修改</el-button>
    </div>
</template>

<script setup lang="ts">
import * as pb from '@/stores/proto/app/auth';
import { ucStore } from '@/stores/app/auth';

const store = ucStore();
const labelPosition = ref('top');
const form = reactive<pb.UpdateUserPasswordRequest>(pb.UpdateUserPasswordRequest.create());

const rules = {
    password: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
    newPassword: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        {
            validator: (rule: any, value: string, callback: any) => {
                if (value && value.length < 6) {
                    callback(new Error('密码长度不能少于6位'));
                } else {
                    callback();
                }
            },
            trigger: 'blur',
        },
    ],
    newPasswordConfirm: [
        { required: true, message: '请再次输入新密码', trigger: 'blur' },
        {
            validator: (rule: any, value: string, callback: any) => {
                if (value !== form.newPassword) {
                    callback(new Error('两次输入的密码不一致'));
                } else {
                    callback();
                }
            },
            trigger: 'blur',
        },
    ],
};

const formRef = ref();

const submitForm = () => {
    formRef.value.validate((valid: boolean) => {
        if (valid) {
            store.updatePassword(form);
        } else {
            return false;
        }
    });
};
</script>
