<script lang="ts" setup>
import { ucStore } from '@/stores/app/auth';
import { storeToRefs } from 'pinia';
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import type { UploadProps } from 'element-plus';

const store = ucStore();
const { userInfo } = storeToRefs(store);

const imageUrl = ref('');
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};

const beforeAvatarUpload: UploadProps['beforeUpload'] = rawFile => {
    if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('Avatar picture must be JPG format!');
        return false;
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!');
        return false;
    }
    return true;
};
</script>

<template>
    <div class="bg-white h-full p-6">
        <div class="border-b w-full">
            <h2 class="flex items-center space-x-2 text-[#596064]">
                <el-icon><Edit /></el-icon>
                <span>修改头像</span>
            </h2>
        </div>
        <div class="bg-[#FFF9F2] flex flex-col p-6 space-y-2 mb-4">
            <span class="flex items-center space-x-1">
                <el-icon><WarningFilled /></el-icon>
                <span>请注意</span>
            </span>
            <span>请上传正常的人物头像，真人或卡通皆可</span>
            <span>上传闪烁、奇异、违法、色情头像，情节严重者将会被禁言处理。</span>
        </div>
        <el-upload class="avatar-uploader" action="http://47.100.118.236:9100/v1/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <template #tip>
                <div>请选择图片：</div>
            </template>
            <img v-if="userInfo.avatar" :src="userInfo.avatar" class="w-[20rem] mb-4 avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
    </div>
</template>
