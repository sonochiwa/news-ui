import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://news-4-you-backend.ru',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// const setAuthToken = (token) => {
//     if (token) {
//         instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     } else {
//         delete instance.defaults.headers.common['Authorization'];
//     }
// };
//
// setAuthToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTYyOTExNjYsImlhdCI6MTcxNjAzMTk2NiwibG9naW4iOiJzbWFsbEBnbWFpbC5jb20ifQ.Uw_vkxOncwT6vMqRgUNOsfC1y_k9bQOkWc-OuW1VrMs');

export {instance};