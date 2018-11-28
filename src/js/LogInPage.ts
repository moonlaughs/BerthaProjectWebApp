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

let loginButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("loginButton");
loginButton.addEventListener("click", login);

function login(): void {

    let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/users/login/" + usernameInput.value + "/" + passwordInput.value;
    axios.get(uri)
        .then(function (response: AxiosResponse): void {
            console.log(response.data);
            if (response.data !== null)
            {
                if (response.data.typeOfUser === "U")
                    passUserID("HomeUser.html", response.data.id)
                else if (response.data.typeOfUser === "S")
                    window.location.href = 'EnvironmentPage.html';
                else
                alert("Wrong credentials...")
            }
            if (response.data === null)
            alert("No such data...")
        })
        .catch (function (error: AxiosError): void {
    console.log(error);
    alert("Fill up all the information or check your network connection...")
}
)}

function passUserID(url: string, id: number): void {
    window.location.href = url + "?id=" + id;
}