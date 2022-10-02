import axios from "axios";
import { i18next } from "./i18n";

axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

let API_ROOT = "https://api.dvpc.hu/api";

interface MockupFormData {
    firstName: string;
    lastName: string;
    email: string;
}

export function sendMockupForm(args: MockupFormData){
    return axios({
        url:API_ROOT+"/register",
        method:"POST",
        headers:{
            Accept: "*/*",
            "Content-Type": "application/json",
        },
        data:JSON.stringify({
            ...args,
            lang:i18next.language
        })
    })
}