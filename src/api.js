import { applyAuthTokenInterceptor, setAuthTokens } from 'axios-jwt';
import ms from 'ms';


import axios from 'axios';

const BASE_URL = 'https://agentflow-v1.herokuapp.com/v1/'
// const BASE_URL = 'http://localhost:3000/v1/'

// 1. Create an axios instance that you wish to apply the interceptor to
export const axiosInstance = axios.create({ baseURL: BASE_URL })

// 2. Define token refresh function.
const requestRefresh = async (refreshToken) => {
    // Notice that this is the global axios instance, not the axiosInstance!
    const response = await axios.post(`${BASE_URL}/auth/refresh_token`, { refreshToken })
    await setAuthTokens({
        accessToken: response.data.access.token,    
        refreshToken: response.data.refresh.token
    })
    return response.data.access.token
};

// 3. Apply interceptor
// Notice that this uses the axiosInstance instance.
// applyAuthTokenInterceptor(axiosInstance, { requestRefresh }); 

applyAuthTokenInterceptor(axiosInstance, {requestRefresh});
