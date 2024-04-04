import { axiosClient } from "./AxiosClient";

export const axiosGetGroups = () =>{
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
    return axiosClient.get(`/Group`);
}

export const axiosGetGroupById = (id) =>{
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
    return axiosClient.get(`Group/GetGroupById/${id}`);
}
export const axiosCreateGroup = (body) =>{
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
    return axiosClient.post(`/Group`,body);
}

export const axiosUpdateGroup = (id, body) =>{
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
    return axiosClient.put(`Group/${id}`, body);
}

export const axiosDeleteGroup = (id) =>{
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
    return axiosClient.delete(`Group/${id}`);
    
}