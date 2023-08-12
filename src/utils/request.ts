import axios, { type AxiosResponse, type Method } from 'axios';
import { getToken } from '@/utils/auth';
import { toast } from './toast';
import { ucStore } from '@/stores/app/auth';

const instance = axios.create({
    baseURL: '/api',
    timeout: 50000,
});

/**
 * 封装 axios，整合 TS 类型
 * @param url 请求地址
 * @param method 请求类型
 * @param submitData 对象类型，提交数据
 */
export const http = <T>(method: Method, url: string, submitData?: object): Promise<T> => {
    return new Promise((resolve, reject) => {
        instance
            .request({
                url,
                method,
                [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitData,
            })
            .then((res: AxiosResponse<T>) => {
                resolve(res.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

instance.interceptors.request.use(
    function (config: any) {
        // 在发送请求之前做些什么
        const token = getToken();
        console.log('请求前获取的token', token);

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

export default instance;
