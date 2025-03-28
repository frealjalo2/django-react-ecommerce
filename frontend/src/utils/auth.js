import axios from "./axios";
import { useAuthStore } from "../store/auth";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';

export const login = async(email, password) => {
    console.log(email, password)
    try {
        const {data, status} = await axios.post("/user/token/", {
            email, 
            password
        });
        if(status === 200){
            
            setAuthUser(data.access, data.refresh);
            // Alert - Signed In Successfully
        }
        return {data, error: null};
    } catch (error) {
        return {
            data: null, 
            error: error.response.data?.detail || "Something went wrong"
        };
    }
}

export const register = async(full_name, email, phone, password, password2) => {
    try {
        const {data} = await axios.post("user/register/", {
            full_name, 
            email, 
            phone, 
            password, 
            password2
        });
        await login(email, password);

        // Alert - Signed Up Successfully

        return {data, error: null};
    } catch (error) {
        return {
            data: null, 
            error: error.response.data?.detail || "Something went wrong"
        };
    }
}

export const logout = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    useAuthStore.getState().setUser(null);

    // Alert - Signed out Successfully
}


export const setUser = async () => {
    const accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');

    if (!accessToken || !refreshToken) return;
    if (isAccessTokenExpired(accessToken)) {
        const response = await getRefreshToken();
        setAuthUser(response.access, response.refresh);
    }else {
        setAuthUser(accessToken, refreshToken);
    }
}

export const setAuthUser = (access_token, refresh_token) => {
    Cookies.set(        
        'access_token', access_token,
        {
            expires: 1,
            secure: true
        }
    );
    Cookies.set(
        'refresh_token', refresh_token,
        {
            expires: 7,
            secure: true
        }
    );
    
    const user = jwtDecode(access_token) ?? null;
    console.log(access_token)

    if (user) {
        useAuthStore.getState().setUser(user)
    }
    useAuthStore.getState().setLoading(false);
}

export const getRefreshToken = async() => {
    const refresh_token = Cookies.get('refresh_token');
    const response = await axios.post('user/token/refresh/', {
        refresh: refresh_token
    });

    return response.data
}

export const isAccessTokenExpired = (access_token) => {
    try {
        const decodedToken = jwtDecode(access_token);
        return decodedToken.exp < Date.now() / 100;
    } catch (error) {
        return true;
    }
}


