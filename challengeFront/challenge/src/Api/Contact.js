import { axiosClient } from "./AxiosClient";

export const axiosGetContacts = () =>{
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
    return axiosClient.get(`/Contact`);
}

export const axiosGetContactById = (id) =>{
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
    return axiosClient.get(`Contact/GetContactsById/${id}`);
}
export const GetContactsByGroup = (id) =>{
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
    return axiosClient.get(`Contact/group/${id}`);
}

export const axiosCreateContact = (body,groupId) =>{
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
    return axiosClient.post(`/Contact?groupIds=${groupId}`,body);
}

export const axiosUpdateContact = (id, body,groupId) =>{
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
    return axiosClient.put(`Contact/${id}?groupIds=${groupId}`, body);
}

export const axiosDeleteContact = (id) =>{
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
    return axiosClient.delete(`Contact/${id}`);
    
}