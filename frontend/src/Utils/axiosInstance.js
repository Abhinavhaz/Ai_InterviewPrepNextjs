import axios from "axios";
import { BASE_URL } from "./apiPath";


const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 80000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

//Request interceptor for API calls
//Interceptor in Axios is like a middleman that sits between your frontend request/response and the server.
// It allows you to intercept (catch) the request before it is sent OR the response before it is received, and do something with it.
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);


//Response interceptor for API calls
//Response interceptor → runs after the response comes back from the server (or if there’s an error).
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {

            if (error.response.status === 401) {
                window.location.href = "/"

            } else if (error.response.status === 500) {
                console.log("Server error.Please try again")

            } else if (error.code === "ECONNECTIONABORTED") {
                console.log("Request timed out. Please try again")
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;





