import Cookies from "js-cookie";

const TOKEN_KEY = "ODPAuthToken";

export function login(token: string){
    Cookies.set(TOKEN_KEY, token);
}

export function logout(){
    Cookies.remove(TOKEN_KEY);
    window.location.reload();
}

export function getToken(){
    return Cookies.get(TOKEN_KEY);
}