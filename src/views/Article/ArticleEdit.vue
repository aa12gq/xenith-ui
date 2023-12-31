<template>
    <el-row class="w-full h-full bg-[#eef0f3]">
        <el-col :xs="6" :xl="3" class="py-4 flex justify-end"></el-col>
        <el-col :xs="12" :xl="18" class="w-full h-full bg-[#eef0f3]">
            <el-col class="flex h-full flex-col p-12">
                <div class="w-full h-full bg-white p-6">
                    <div class="text-xl flex items-center justify-center pb-8 space-x-2 text-[#596064] font-blod select-text">
                        <el-icon><EditPen /></el-icon>
                        <span>{{ title }}</span>
                    </div>
                    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" class="demo-ruleForm">
                        <el-form-item prop="title">
                            <el-input class="h-10" v-model="ruleForm.title" type="text" placeholder="标题"></el-input>
                        </el-form-item>
                    </el-form>
                    <mavon-editor class="h-[800px]" v-model="ruleForm.content" />
                    <div class="bg-[#F7F7F8] h-16 mt-4 flex items-center space-x-4">
                        <el-button
                            class="ml-6 space-x-2 bg-[#35A9A4] hover:bg-[#35A9A4]"
                            type="primary"
                            @click="
                                () => {
                                    ruleForm.status = 1;
                                    if (ruleForm.status == 1) {
                                        submitForm(ruleFormRef);
                                    }
                                }
                            "
                        >
                            <el-icon><Position /></el-icon>
                            <span>保存修改</span>
                        </el-button>
                        <span>or</span>
                        <el-button
                            type="info"
                            @click="
                                () => {
                                    ruleForm.status = 0;
                                    if (ruleForm.status == 0) {
                                        submitForm(ruleFormRef);
                                    }
                                }
                            "
                        >
                            <el-icon><Collection /></el-icon>
                            <span>存为草稿</span>
                        </el-button>
                    </div>
                </div>
            </el-col>
        </el-col>
        <el-col :xs="6" :xl="3" class="pl-6 py-12"></el-col>
    </el-row>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus';
import * as pb from '@/stores/proto/app/article';
import { UpdateArticle } from '@/stores/app/article';
import { showMessage } from '@/utils/toast';
import router from '@/router';
import { GetArticle } from '@/stores/app/article';
import { getToken } from '@/utils/auth';

const ruleFormRef = ref<FormInstance>();
let ruleForm = reactive<pb.UpdateArticleRequest>(pb.UpdateArticleRequest.create({}));
let title = '';

const rules = reactive<FormRules<typeof ruleForm>>({
    title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
});

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate(valid => {
        if (valid) {
            UpdateArticle(
                ruleForm,
                reply => {
                    showMessage('保存成功！');
                    setTimeout(() => {
                        // 清空数据
                        ruleForm.title = '';
                        router.push(`/articles/${ruleForm.id}`);
                    }, 500);
                },
                why => {
                    console.log('why', why);
                    const { message } = why.response.data;
                    showMessage(message, 'error');
                }
            );
        } else {
            return false;
        }
    });
};

const fetchArticle = (id: string) => {
    const parsedArticleId = BigInt(id);

    GetArticle(
        pb.GetArticleRequest.create({ id: parsedArticleId }),
        (d: pb.GetArticleReply) => {
            Object.assign(ruleForm, d.article!);
            title = ruleForm.title;
        },
        why => {
            console.log('获取文章详情失败', why);
        }
    );
};

onMounted(() => {
    const { params } = useRoute();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    if (id) {
        fetchArticle(id);
    } else {
        console.log('缺少有效的文章ID');
    }
    let token = getToken();
    if (token == '' || token == undefined) {
        router.push('/');
    }
});

onActivated(() => {
    const { params } = useRoute();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    if (id) {
        fetchArticle(id);
    } else {
        console.log('缺少有效的文章ID');
    }
});
</script>

<style scoped>
#editor {
    margin: auto;
    width: 80%;
    max-height: 1000px;
    overflow-y: auto;
}
</style>
