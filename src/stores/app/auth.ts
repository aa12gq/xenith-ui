import * as pb from '@/stores/proto/app/auth';
import { Success } from '@/stores/proto/app/article';
import { http } from '@/utils/request';
import { defineStore } from 'pinia';
import { setToken, removeToken } from '@/utils/auth';
import { toast, showMessage } from '@/utils/toast';
import router from '@/router';
import { userInfo } from 'os';

const ST_KEY = 'uc_store';
const PERSIST_STORAGE = localStorage;
export const ucStore = defineStore(
    ST_KEY,
    () => {
        const userInfo = ref<pb.UserInfo>(pb.UserInfo.create());
        const isDialogVisible = ref(false);
        const login = (req: pb.LoginByPasswordRequest) => {
            Login(
                req,
                res => {
                    setToken((res as any)?.token);
                    getinfo(res.uid);
                    toast('登录成功');
                    setDialogModal(false);
                },
                why => {
                    setDialogModal(false);
                    const { message } = why.response.data;
                    showMessage(message, 'error');
                }
            );
        };
        const getinfo = (uid: bigint) => {
            GetUserInfo(
                uid,
                res => {
                    userInfo.value = res.userInfo!;
                },
                why => {
                    const { message } = why.response.data;
                    showMessage(message, 'error');
                }
            );
        };
        const logout = () => {
            removeToken();

            userInfo.value = pb.UserInfo.create({});
            localStorage.removeItem(ST_KEY);
            router.push('/');
            toast('退出成功');
        };

        const updateuser = (req: pb.UpdateUserInfoRequest) => {
            UpdateUserInfo(
                req,
                (d: pb.UpdateUserInfoReply) => {
                    getinfo(req.id);
                    toast('更新成功');
                },
                why => {
                    const { message } = why.response.data;
                    showMessage(message, 'error');
                }
            );
        };

        const updateuserAvatar = (req: pb.UpdateUserAvatarRequest) => {
            UpdateUserAvatar(
                req,
                (d: pb.Success) => {
                    getinfo(req.id);
                    toast(d.message);
                },
                why => {
                    const { message } = why.response.data;
                    showMessage(message, 'error');
                }
            );
        };

        const updatePassword = (req: pb.UpdateUserPasswordRequest) => {
            UpdateUserPassword(
                req,
                (d: pb.Success) => {
                    userInfo.value = pb.UserInfo.create({});
                    localStorage.removeItem(ST_KEY);
                    setDialogModal(true);
                    toast(d.message);
                },
                why => {
                    const { message } = why.response.data;
                    showMessage(message, 'error');
                }
            );
        };

        const setDialogModal = (value: boolean) => {
            isDialogVisible.value = value;
        };
        return { userInfo, isDialogVisible, login, getinfo, logout, setDialogModal, updateuser, updateuserAvatar };
    },
    {
        persist: true,
    }
);

export function Login(req: pb.LoginByPasswordRequest, success: (value: pb.LoginByPasswordReply) => void, fail?: (why: any) => void) {
    const c = http<pb.LoginByPasswordReply>('post', '/v1/auth/login/using-password', req);
    c.then(re => {
        return success(re);
    }).catch(fail);
}

export function GetUserInfo(req: bigint, success: (value: pb.GetUserInfoReply) => void, fail?: (why: any) => void) {
    const c = http<pb.GetUserInfoReply>('get', `/v1/users/${req}`, {});
    c.then(re => {
        return success(re);
    }).catch(fail);
}

export function UpdateUserInfo(req: pb.UpdateUserInfoRequest, success: (value: pb.UpdateUserInfoReply) => void, fail?: (why: any) => void) {
    const c = http<pb.UpdateUserInfoReply>('put', `/v1/users`, req);
    c.then(re => {
        return success(re);
    }).catch(fail);
}

export function UpdateUserAvatar(req: pb.UpdateUserAvatarRequest, success: (value: pb.success) => void, fail?: (why: any) => void) {
    const c = http<pb.success>('put', `/v1/users/avatar`, req);
    c.then(re => {
        return success(re);
    }).catch(fail);
}

export function UpdateUserPassword(req: pb.UpdateUserPasswordRequest, success: (value: pb.success) => void, fail?: (why: any) => void) {
    const c = http<pb.success>('put', `/v1/users/password`, req);
    c.then(re => {
        return success(re);
    }).catch(fail);
}
