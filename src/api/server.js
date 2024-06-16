import axios from 'axios';

// setup axios and export the instance for us
const api = axios.create({
    baseURL: 'https://coherent-welcomed-snipe.ngrok-free.app'
});

api.interceptors.response.use((response) => response.data);

// let cancelToken;
// api.interceptors.request.use((config) => {
//     if (cancelToken) cancelToken.cancel();
//     cancelToken = axios.CancelToken.source();
//     config.cancelToken = cancelToken.token;
//     return config;
// });


export default api;