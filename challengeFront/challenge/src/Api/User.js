import { axiosClient } from "./AxiosClient";

export const axiosLogin = (body) =>{
  axiosClient.interceptors.request.use(
    async config => {
      config.headers = {
        "Accept":"application/json",
        "Content-Type":"application/json"
      }
      return config
    },
    error=>{
        Promise.reject(error)
    });
    return axiosClient.post(`/Auth/login`,body);
}
export const axiosSignUp = (body) =>{
  axiosClient.interceptors.request.use(
    async config => {
      config.headers = {
        "Accept":"application/json",
        "Content-Type":"application/json"
      }
      return config
    },
    error=>{
        Promise.reject(error)
    });
    return axiosClient.post(`/User`,body);
}