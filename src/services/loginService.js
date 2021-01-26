import {unAuthAxiosCall} from './axios';

export const doLogin = (logindata) => 
    unAuthAxiosCall({
        body: logindata
    })