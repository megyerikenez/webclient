import axios, { Axios, AxiosPromise } from "axios";
import { i18next } from "./i18n";

axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

let API_ROOT = "https://api.dvpc.hu/api";

interface MockupFormData {
    firstName: string;
    lastName: string;
    email: string;
}

function checkToken(){
    let search = (new URLSearchParams(window.location.search));
    let token = search.get("token");
    if(token){
        localStorage.setItem("token",search.get("token") as string);

        window.history.pushState({},"",window.location.pathname);
    }
}
checkToken();

export function getToken(){
    checkToken();

    return localStorage.getItem("token");
}

export function sendPostRequest<T>(url: string, data: Object){
    return axios.request<T>({
        url:API_ROOT+url,
        method:"POST",
        headers:{
            Accept: "*/*",
            "Content-Type": "application/json",
        },
        data:JSON.stringify({
            ...data,
            lang:i18next.language,
            token:getToken(),
        })
    })
}

export function sendMockupForm(args: MockupFormData){
    return sendPostRequest("/register",args);
}

export function calculateToulousePieronScore({incorrectlyIgnored, incorrectlyMarked, correctlyIgnored, correctlyMarked}: ToulousePieronResult){
    let pictureCount = incorrectlyIgnored+incorrectlyMarked+correctlyIgnored+correctlyMarked;
    let score = (pictureCount - (incorrectlyIgnored+incorrectlyMarked))/pictureCount;
    return score;
}

interface ChairLampResultItem {
    incorrectlyMarked: number;
    incorrectlyIgnored: number;
    correctlyMarked: number;
    correctlyIgnored: number;
    picturesRevised: number,
}
interface ChairLampResult {
    startTime: Date;
    endTime: Date;
    values: ChairLampResultItem[],
}
interface ToulousePieronResult {
    startTime: Date;
    endTime: Date;
    incorrectlyMarked: number;
    incorrectlyIgnored: number;
    correctlyMarked: number;
    correctlyIgnored: number;
}
interface BourdonResult {
    startTime: Date,
    endTime: Date,
    incorrectlyMarked: number,
    incorrectlyIgnored: number,
    correctlyMarked: number,
    correctlyIgnored: number,
    linesViewed: number,
    charsViewed: number,
}
export interface Results {
    toulousePieron: ToulousePieronResult[]
    chairLamp: ChairLampResult[]
    bourdon: BourdonResult[]
}

function requestResults(){
    return sendPostRequest<Results>("/results", {}).then(r=>r.data);
}

function convertUTCDateToLocalDate(date: Date): Date {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
}

function parseDate(date: string): Date {
    return convertUTCDateToLocalDate(new Date(date));
}

function fixDate(r: any){
    r.startTime = parseDate(r.startTime);
    r.endTime = parseDate(r.endTime);
}

/*export function getResults() {
    return requestResults().then(results=>{
        
        results.toulousePieron.forEach(el=>{
            fixDate(el);
        })
        results.chairLamp.forEach(el=>{
            fixDate(el);
        })
        results.bourdon.forEach(el=>{
            fixDate(el);
        })

        return results;
    });
}*/

export function getResults(){
    return new Promise<Results>((resolve,reject)=>{
        setTimeout(()=>{
            resolve({
                toulousePieron:[
                    {
                        startTime: new Date("2003-10-24"),
                        endTime: new Date(),
                        incorrectlyMarked: 15,
                        incorrectlyIgnored: 12,
                        correctlyMarked: 40,
                        correctlyIgnored: 30,
                    },
                    {
                        startTime: new Date("2003-9-24"),
                        endTime: new Date(),
                        incorrectlyMarked: 15,
                        incorrectlyIgnored: 12,
                        correctlyMarked: 40,
                        correctlyIgnored: 30,
                    },
                    {
                        startTime: new Date("2003-8-24"),
                        endTime: new Date(),
                        incorrectlyMarked: 15,
                        incorrectlyIgnored: 12,
                        correctlyMarked: 40,
                        correctlyIgnored: 30,
                    },
                ],
                chairLamp:[],
                bourdon:[],
            });
        },1000);
    })
}