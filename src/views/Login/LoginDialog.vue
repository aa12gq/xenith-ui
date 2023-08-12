<template>
    <div>
        <div :class="{ overlay: isDialogVisible }">
            <el-dialog
                v-model="isDialogVisible"
                title="请登录"
                width="15%"
                align-center
                :modal="true"
            >
                <!-- 对话框内容 -->
                <div class="">
                    <el-form
                        ref="ruleFormRef"
                        :model="ruleForm"
                        status-icon
                        :rules="rules"
                        class="demo-ruleForm"
                    >
                        <el-form-item prop="account">
                            <el-input
                                class="h-10"
                                v-model="ruleForm.account"
                                type="text"
                                placeholder="邮箱or手机or用户名"
                            >
                                <template #prepend>
                                    <el-button :icon="User" />
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input
                                class="h-10"
                                v-model="ruleForm.password"
                                type="password"
                                placeholder="请输入密码"
                                show-password
                            >
                                <template #prepend>
                                    <el-button :icon="Lock" />
                                </template>
                            </el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <!-- 对话框底部按钮 -->
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="closeDialog">取消</el-button>
                        <el-button type="primary" @click="submitForm(ruleFormRef)">
                            <span class="mr-2">提交</span>
                            <el-icon class="text-xl font-bold"><Right /></el-icon>
                        </el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script lang="ts" setup>
import * as pb from '@/stores/proto/app/auth';
import { ucStore } from '@/stores/app/auth';
import { storeToRefs } from 'pinia';
import type { FormInstance, FormRules } from 'element-plus';
import { User, Lock } from '@element-plus/icons-vue';

const store = ucStore();
const { isDialogVisible } = storeToRefs(store);

const showDialog = () => {
    store.setDialogModal(true);
};

const closeDialog = () => {
    store.setDialogModal(false);
};

const ruleFormRef = ref<FormInstance>();

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'));
    } else if (value !== ruleForm.password) {
        callback(new Error('两个输入不匹配'));
    } else {
        callback();
    }
};

const ruleForm = reactive<pb.LoginByPasswordRequest>(pb.LoginByPasswordRequest.create());

const rules = reactive<FormRules<typeof ruleForm>>({
    account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { validator: validatePass, trigger: 'blur' },
    ],
});

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate(valid => {
        if (valid) {
            store.login(ruleForm);
        } else {
            return false;
        }
    });
};

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
};
</script>

<style scoped>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* 半透明的遮罩层颜色 */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999; /* 确保遮罩层位于其他内容之上 */
}

/* 对话框样式，保持默认点击交互 */
.el-dialog {
    pointer-events: auto;
}

/* ...（其他样式，保持不变） */
</style>
