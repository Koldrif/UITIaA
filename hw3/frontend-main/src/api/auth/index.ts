import Endpoints from "../endpoints";
import {AxiosPromise} from "axios"
import { axiosInstance } from "../instance";
import { ILoginResponse, ILoginRequest } from "./types";

export const login = (params: ILoginRequest): AxiosPromise<ILoginResponse> =>
    axiosInstance.post(Endpoints.AUTH.LOGIN, params, {headers: {"crossorigin" : "true"}})

export const refreshToken = (): AxiosPromise<ILoginResponse> => axiosInstance.get(Endpoints.AUTH.REFRESH)

export const logout = (): AxiosPromise => {
    return axiosInstance.get(Endpoints.AUTH.LOGOUT)
}

export const getProfile = (): AxiosPromise<string> => axiosInstance.get(Endpoints.AUTH.PROFILE)