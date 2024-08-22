import axios from "axios"

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params) => {
    console.log("API Request Details:", { method, url, bodyData, headers, params });
    
    return axiosInstance({
        method: `${method}`,
        url: `${url}`,
        data: bodyData ? bodyData : null,
        headers: {
            Accept: 'application/json',
            ...headers, // merge with any existing headers
          },
        params: params ? params : null,
    })         
}