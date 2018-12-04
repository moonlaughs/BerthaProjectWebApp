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

var itemID = JSON.parse(localStorage.getItem('id'));


let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/users/" + itemID;
axios.get<IUser>(uri)
    .then(function (response: AxiosResponse<IUser>): void {
        console.log(response.data);
        let result: string = "<table><tr><th>First Name</th><td>" + response.data.firstName + "</td></tr><tr><th>Last Name</th><td>" + response.data.lastName + "</td><tr><th>Username</th><td>" + response.data.userName + "</td><tr><th>Age</th><td>" + response.data.age + "</td><tr><th>Gender</th><td>" + response.data.gender + "</td></table>";
        Info.innerHTML = result;
    })
    .catch(function (error: AxiosError): void {
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
    let myusername: string = username.value;
    let mypassword: string = pass1.value;

    

    if (pass1.value === pass2.value) {
        let uri1: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/users/" + itemID;

    axios.get<IUser>(uri1)
        .then(function (response: AxiosResponse<IUser>): void {
            console.log(response.data);
            var user: IUser = response.data;
            let uri2: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/users/" + itemID;
            axios.put<IUser>(uri2, { firstName: user.firstName, lastName: user.lastName, userName: myusername, pass: mypassword, age: user.age, gender: user.gender, typeOfUser: user.typeOfUser })
                .then((response: AxiosResponse) => {
                    console.log(response.status)
                    alert("Credentials were changed successfuly");
                })
                .catch(function (error: AxiosError): void {
                    console.log(error);
                    alert("Something went wrong...");
                }) 
        })
        .catch(function (error: AxiosError): void {
            console.log(error);
            alert("Something went wrong...");
        });

        
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

