import {getUnixTime} from "./date"

export interface IAuthTokenInfo {
    exp: number
    iat: number
    login: string
}

const LIFT_TIME_TO_UPDATE_MULTIOLIER = 0.5

export const isTokenExpired = (token: string | null): boolean => {
    if(!token){
        return true;
    }

    try{
        const tokenInfo = token.split('.')[1]
        const tokenInfoDecoded = window.atob(tokenInfo)
        const {exp, iat}: IAuthTokenInfo = JSON.parse(tokenInfoDecoded)

        const tokenLeftTime = exp - getUnixTime() / 1000

        const minLifeTimeForUpdate = (exp - iat) * LIFT_TIME_TO_UPDATE_MULTIOLIER;

        return tokenLeftTime < minLifeTimeForUpdate
    }catch(e){
        console.error(e)
        return true
    }
}