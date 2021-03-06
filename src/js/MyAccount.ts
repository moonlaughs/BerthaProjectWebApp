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
    year: number;
    gender: string;
    typeOfUser: string;
}

let Info: HTMLOutputElement = <HTMLOutputElement>document.getElementById("Info");

interface IUserId {
    id: number;
    typeOfUser: string;
    firstName: string;
    lastName: string;
}

var itemID = JSON.parse(localStorage.getItem('id'));
let extra: HTMLLIElement = <HTMLLIElement>document.getElementById("extra");
extra.hidden = true;

let userDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("userIdOutput");
let typeDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("divTypeOfUser");
var itemID = JSON.parse(localStorage.getItem('id'));
let uri2: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/users/" + itemID;
axios.get<IUserId>(uri2)
    .then(function (response: AxiosResponse<IUserId[]>): void {
        console.log(response.data);
        userDiv.innerHTML = response.data.firstName + " " + response.data.lastName;
        

        if (response.data.typeOfUser === "S") {
            extra.hidden = false;
            typeDiv.innerHTML = "scientist";
        }
        else{
            extra.hidden = true;
            typeDiv.innerHTML = "user";
        }

    })
    .catch(function (error: AxiosError): void {
        console.log(error);
    });



let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/users/" + itemID;


let confirmButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("confirmButton");
confirmButton.addEventListener("click", updateCredentials);

let firstName : HTMLInputElement = <HTMLInputElement> document.getElementById("firstName");
let lastName: HTMLInputElement = <HTMLInputElement>document.getElementById("lastName");
let year: HTMLInputElement = <HTMLInputElement>document.getElementById("year");
let gender: HTMLInputElement = <HTMLInputElement>document.getElementById("gender");
let username: HTMLInputElement = <HTMLInputElement>document.getElementById("username");
let password: HTMLInputElement = <HTMLInputElement>document.getElementById("password");
let pass1: HTMLInputElement = <HTMLInputElement>document.getElementById("pass1");
let pass2: HTMLInputElement = <HTMLInputElement>document.getElementById("pass2");

function updateCredentials(): void {

    let myfirstName: string = firstName.value;
    let mylastName: string = lastName.value;
    let myyear: number = Number(year.value);
    let mygender: string = gender.value;
    let myusername: string = username.value;
    let mypassword: string = password.value;
    let myTypeOfTheUser: string = "U";

    

    if (pass1.value === pass2.value) {
        let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/users/" + itemID;

        axios.put<IUser>(uri, {firstName: myfirstName, lastName: mylastName, userName: myusername, pass: mypassword, year: myyear, gender: mygender, typeOfUser: myTypeOfTheUser})
        .then((response: AxiosResponse) => {
            console.log(response.status);
            alert("credentials were changed successfuly");
        })
        .catch(function(error: AxiosError): void{
            console.log(error);
        })
    }
    else alert("Password does not match!")
}

let delOutput: HTMLOutputElement = <HTMLOutputElement>document.getElementById("delOutput");
let delUser: HTMLButtonElement = <HTMLButtonElement>document.getElementById("delUser");
delUser.addEventListener("click", delAccount);

function delAccount(): void {
    let deleteUri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/users/" + itemID;
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

axios.get<IUser>(uri)
    .then(function (response: AxiosResponse<IUser>): void {
        console.log(response.data);
        firstName.defaultValue = response.data.firstName;
        lastName.defaultValue = response.data.lastName;
        year.defaultValue = response.data.year;
        gender.defaultValue = response.data.gender;
        username.defaultValue = response.data.userName;
        password.defaultValue = response.data.pass;
    })
    .catch(function (error: AxiosError): void {
        if (error.response) {
            Info.innerHTML = error;
        }
        else { Info.innerHTML = error; }
    });

