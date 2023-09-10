<script lang="ts" setup>
import * as pb from '@/stores/proto/app/auth';
import { ucStore } from '@/stores/app/auth';
import { UpdateUserAvatarRequest } from '@/stores/proto/app/auth';
import { storeToRefs } from 'pinia';
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import type { UploadProps } from 'element-plus';
import { id } from 'element-plus/es/locale';

const store = ucStore();
const { userInfo } = storeToRefs(store);

const imageUrl = ref('');
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    imageUrl.value = URL.createObjectURL(uploadFile.raw!);
    const { url } = response;
    store.updateuserAvatar(pb.UpdateUserAvatarRequest.create({ id: userInfo.value.id, avatar: url }));
};

const beforeAvatarUpload: UploadProps['beforeUpload'] = rawFile => {
    if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('头像图片必须为jpg格式!');
        return false;
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('头像图片大小不能超过2mb!');
        return false;
    }
    return true;
};

const isMouseOver = ref(false);
const handleMouseover = () => {
    isMouseOver.value = true;
};

const handleMouseleave = () => {
    isMouseOver.value = false;
};
</script>

<template>
    <div class="bg-white h-full p-6">
        <div class="border-b w-full">
            <h2 class="flex items-center space-x-2 text-[#596064]">∫、
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
        <el-upload class="avatar-uploader" action="/api/v1/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <div class="relative w-[20rem]" @mouseover="handleMouseover" @mouseleave="handleMouseleave">
                <img v-if="userInfo.avatar" :src="userInfo.avatar" class="w-full rounded-full h-[20rem]" />
                <div v-if="userInfo.avatar" class="absolute inset-0 flex justify-center items-center bg-white text-slate-100 text-4xl bg-opacity-60" v-show="isMouseOver">点击重新上传</div>
                <el-icon v-else class="absolute bottom-0 right-0"><Plus /></el-icon>
            </div>
        </el-upload>
    </div>
</template>
