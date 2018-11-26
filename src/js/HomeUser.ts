import axios,
{
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios";

let myFrame: HTMLFrameElement = <HTMLFrameElement> document.getElementById("myFrame");
let healthButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("healthButton");
let envirnmentButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("environmentButton");

//healthButton.addEventListener("click", () => {
//    myFrame.src = 'http://localhost:3000/index.htm';
//})

//envirnmentButton.addEventListener("click", () => {
//    myFrame.src = "http://localhost:3000/EnvironmentPage.html";
//    myFrame.contentWindow.URL = "http://localhost:3000/index.htm";
//})