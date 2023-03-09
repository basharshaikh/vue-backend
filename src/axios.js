import axios from "axios";
import store from "./store";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
})

axiosClient.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${store.state.user.token}`;
    // config.headers['X-XSRF-TOKEN'] = store.state.user.token.substring(3);
    return config;
})

export default axiosClient