import React, {createContext, ReactNode, useContext, useEffect, useRef} from "react";
import {useAlert} from "react-alert";
import axios from "axios";
import {AxiosInstance} from "axios";

const ApiContext = createContext<AxiosInstance>(axios.create());

export const ApiContextProvider = ({children}: {children: ReactNode | ReactNode[]}) => {
    const alert = useAlert();
    const apiRef = useRef(axios.create({
        baseURL: process.env.REACT_APP_BASE_URL
    }));
    useEffect(() => {
        apiRef.current.interceptors.response.use((response: any) => {
            if (response.status !== 200)
                alert.error("Ошибка запроса: " + response.data);
            return response;
        }, (error: any) => {
            alert.error("Ошибка запроса: " + error);
            return Promise.reject(error)
        });
    }, [alert]);

    return (
        <ApiContext.Provider value={apiRef.current}>
            {children}
        </ApiContext.Provider>
    )
}

export const useApi = () => {
    return useContext(ApiContext);
}