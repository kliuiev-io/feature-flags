import axios, { AxiosRequestConfig } from 'axios';

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 25000
  // withCredentials: true // send cookies when cross-domain requests
});

request.interceptors.response.use(
  response => {
    if ((response.status < 200 || response.status >= 300)) {
      return Promise.reject(new Error('Error'));
    } else {
      return response.data;
    }
  }
);

const config = {
  apiUrl: 'http://localhost:3000'
}

export class Api {
  static get = <T>(url: string, options?: AxiosRequestConfig) => request.get<any, T>(`${config.apiUrl}/${url}`, options);

  static post = <T>(url: string, data?: object, options?: AxiosRequestConfig) => request.post<any, T>(`${config.apiUrl}/${url}`, data, options);

  static patch = <T = void>(url: string, data?: object) => request.patch<any, T>(`${config.apiUrl}/${url}`, data);

  static put = <T>(url: string, data?: object) => request.put<any, T>(`${config.apiUrl}/${url}`, data);

  static delete = <T = void>(url: string, data?: object) => request.delete<any, T>(`${config.apiUrl}/${url}`, { data });
}