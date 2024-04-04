import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://localhost:7086/api/",
  responseType: "json",
  headers: {
    "Accept": "application/json",
    "Content-type": "application/json"
  }
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token').replace(/^"|"$/g, '');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosClient };
