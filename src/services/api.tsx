import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { UseWaitAPI } from "react-wait";

const api: AxiosInstance = axios.create({
  //baseURL: "http://localhost:3333"
  baseURL: "http://dummy.restapiexample.com/api/v1/"
});

export const addWaitMiddleware = (api: AxiosInstance, wait: UseWaitAPI) => {
  const requestHandler = (request: AxiosRequestConfig) => {
    wait.startWaiting("api:" + request.baseURL + "" + request.url);
    return request;
  };

  const successHandler = (response: AxiosResponse<any>) => {
    wait.endWaiting("api:" + response.config.url);
    return response;
  };

  const errorHandler = (error: any) => {
    wait.endWaiting("api:" + error.response.config.url);
    return Promise.reject({ ...error });
  };

  api.interceptors.request.use(request => requestHandler(request));
  api.interceptors.response.use(
    response => successHandler(response),
    error => errorHandler(error)
  );
};

export default api;
