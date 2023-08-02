import axios, { type AxiosResponse, type Method } from 'axios';

const instance = axios.create({
    baseURL: '/api',
});

  /**
   * 封装 axios，整合 TS 类型
   * @param url 请求地址
   * @param method 请求类型
   * @param submitData 对象类型，提交数据
   */
  export const http = <T>(
    method: Method,
    url: string,
    submitData?: object
  ): Promise<T> => {
    return new Promise((resolve, reject) => {
      instance
        .request({
          url,
          method,
          [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitData,
        })
        .then((res:AxiosResponse<T>) => {
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };
  
  
  export default instance;