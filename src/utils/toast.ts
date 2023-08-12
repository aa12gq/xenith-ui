import { ElNotification, ElMessageBox, ElMessage } from 'element-plus';
import nprogress from 'nprogress';
import type { RendererNode, RendererElement } from 'vue';

export function toast(message: string, type: 'success' | 'warning' | 'error' = 'success') {
    ElNotification({
        message,
        type,
        duration: 3000,
    });
}
export function showModal(
    content = '提示内容',
    type: 'info' | 'success' | 'warning' | 'error' = 'warning',
    title = ''
) {
    return ElMessageBox.confirm(content, title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type,
    });
}

export function showFullLoading() {
    nprogress.start();
}

export function hideFulllading() {
    nprogress.done();
}

export function showPrompt(
    tip:
        | string
        | globalThis.VNode<RendererNode, RendererElement, { [key: string]: any }>
        | (() => globalThis.VNode<RendererNode, RendererElement, { [key: string]: any }>)
        | undefined,
    value = ''
) {
    return ElMessageBox.prompt(tip, '', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputValue: value,
    });
}

export function showMessage(
    message: string,
    type: 'info' | 'success' | 'warning' | 'error' = 'info'
) {
    ElMessage({
        message,
        type,
    });
}
