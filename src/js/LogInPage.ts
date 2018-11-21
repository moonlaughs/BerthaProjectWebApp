import axios,
{
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios";

interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    age: number;
    gender: string;
    typeOfUser: string;
}

let usernameInput: HTMLInputElement = <HTMLInputElement>document.getElementById("username");
let passwordInput: HTMLInputElement = <HTMLInputElement>document.getElementById("password");
let selectType: HTMLSelectElement = <HTMLSelectElement> document.getElementById("selectType");

let loginButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("loginButton");
loginButton.addEventListener("click", login);

function login(): void {

    let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/users/login/" + usernameInput.value + "/" + passwordInput.value + "/" + selectType.value;
    axios.get(uri)
        .then(function (response: AxiosResponse): void {
            console.log(response.data);
            if (response.data === true)
                if(selectType.value === "U")
                window.location.href = 'http://localhost:3000/index.htm';
                else
                window.location.href = 'http://localhost:3000/EnvironmentPage.html';
            if (response.data === false)
            alert("Wrong credentials")
        })
        .catch (function (error: AxiosError): void {
    console.log(error);
    alert("Wrong credentials")
}
        )
}