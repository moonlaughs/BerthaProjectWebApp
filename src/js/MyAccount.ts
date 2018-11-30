import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios";

interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    pass: string;
    age: number;
    gender: string;
    typeOfUser: string;
}

let Info: HTMLOutputElement = <HTMLOutputElement>document.getElementById("Info");
let infoButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("infoButton");
infoButton.addEventListener("click", AccountInfo)

function AccountInfo(): void {
    /*var regex = /[?&]([^=#]+)=([^&#]*)/g,
        url = window.location.href;
    var params: any = {},
        match;
    while (match = regex.exec(url)) {
        params[match[1]] = match[2];
    }*/

}
let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/users/4"; //+ "?id="+ "1";//params.id;
axios.get<IUser>(uri)
    .then(function (response: AxiosResponse<IUser>): void {
        console.log(response.data);
        let result: string = "<table><tr><td>First Name</td><td>" + response.data.firstName + "</td></tr><tr><td>Last Name</td><td>" + response.data.lastName + "</td><tr><td>Username</td><td>" + response.data.userName + "</td><tr><td>Age</td><td>" + response.data.age +"</td><tr><td>Gender</td><td>" + response.data.gender + "</td></table>";
Info.innerHTML = result;
})
    .catch (function (error: AxiosError): void {
    if (error.response) {
        Info.innerHTML = error;
    }
    else { Info.innerHTML = error; }
});


let confirmButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("confirmButton");
confirmButton.addEventListener("click", updateCredentials);

let username: HTMLInputElement = <HTMLInputElement>document.getElementById("username");
let pass1: HTMLInputElement = <HTMLInputElement>document.getElementById("pass1");
let pass2: HTMLInputElement = <HTMLInputElement>document.getElementById("pass2");

function updateCredentials(): void {
    /*var regex = /[?&]([^=#]+)=([^&#]*)/g,
    url = window.location.href;
var params: any = {},
    match;
while (match = regex.exec(url)) {
    params[match[1]] = match[2];
}*/

    let myusername: string = username.value;
    let mypassword: string = pass1.value;

    if (pass1.value === pass2.value) {
        let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/users/4"; // + params.id;
        axios.put<IUser>(uri, { userName: myusername, pass: mypassword })
            .then((response: AxiosResponse) => {
                console.log(response.status)
                alert("Credentials were changed successfuly");
            })
            .catch(function (error: AxiosError): void {
                console.log(error);
            })
    }
    else alert("Password does not match!")
}

let delOutput: HTMLOutputElement = <HTMLOutputElement>document.getElementById("delOutput");
let delUser: HTMLButtonElement = <HTMLButtonElement>document.getElementById("delUser");
delUser.addEventListener("click", delAccount);

function delAccount(): void {
    /*var regex = /[?&]([^=#]+)=([^&#]*)/g,
url = window.location.href;
var params: any = {},
match;
while (match = regex.exec(url)) {
params[match[1]] = match[2];
}*/
    let deleteUri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/users/4"; //+ params.id;
    console.log("DELETE " + deleteUri);
    axios.delete<IUser>(deleteUri)
        .then(function (response: AxiosResponse<IUser>): void {
            console.log(JSON.stringify(response));
            delOutput.innerHTML = response.status + " " + response.statusText;
            delOutput.innerHTML += "Account deleted";
            window.location.href = 'LoginPage.html';
        })
        .catch(function (error: AxiosError): void {
            if (error.response) {
                delOutput.innerHTML = error;
            }
            else { delOutput.innerHTML = error; }
        })
}

