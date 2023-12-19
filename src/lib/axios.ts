import axios from 'axios';
// import { useAuthContext } from '../context/AuthContext';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/api/v1/`,
    timeout: 60000,
});
// axiosInstance.interceptors.request.use(async (config) => {
// const { user } = useAuthContext()
//     if (user?.token) {
//         config.headers.Token = `${user.token}`;
//     }
//     return config;
// });
export default axiosInstance;