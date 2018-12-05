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
    pass2:string;
    age: number;
    gender: string;
    typeOfUser: string;
}

let firstName: HTMLInputElement = <HTMLInputElement>document.getElementById("firstName");
let lastName: HTMLInputElement = <HTMLInputElement>document.getElementById("lastName");
let userName: HTMLInputElement = <HTMLInputElement>document.getElementById("username");
let pass: HTMLInputElement = <HTMLInputElement>document.getElementById("pass");
let pass2: HTMLInputElement = <HTMLInputElement>document.getElementById("pass2");
let age: HTMLInputElement = <HTMLInputElement>document.getElementById("age");
let selectGender: HTMLSelectElement = <HTMLSelectElement>document.getElementById("selectGender");

let addButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addButton");
addButton.addEventListener("click", AddUserWithUsernameValidation);

function AddUser(): void {
    let myfirstname: string = firstName.value;
    let mylastname: string = lastName.value;
    let myusername: string = userName.value;
    let mypass: string = pass.value;
    let myage: number = parseInt(age.value);
    let mygender: string = selectGender.value;
    let myTypeOfUser: string = "U";

    if (pass.value === pass2.value) {
        let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/users";
        axios.post<IUser>(uri, { firstName: myfirstname, lastName: mylastname, userName: myusername, pass: mypass, age: myage, gender: mygender, typeOfUser: myTypeOfUser })
            .then(function (response: AxiosResponse) {
                console.log(response.status + " " + response.statusText);
                alert("User " + userName + " was succesfully added");
                window.location.href = 'LoginPage.html';
            })
            .catch((error: AxiosError) => {
                alert("Check if all values are correct!");
                console.log(error);
            })
    }
    else alert("password does not match!")
}


function AddUserWithUsernameValidation(): void {
    let myfirstname: string = firstName.value;
    let mylastname: string = lastName.value;
    let myusername: string = userName.value;
    let mypass: string = pass.value;
    let myage: number = parseInt(age.value);
    let mygender: string = selectGender.value;
    let myTypeOfUser: string = "U";

    if (pass.value === pass2.value) {
        let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/users";
        axios.post<IUser>(uri, { firstName: myfirstname, lastName: mylastname, userName: myusername, pass: mypass, age: myage, gender: mygender, typeOfUser: myTypeOfUser })
            .then(function (response: AxiosResponse) {
                console.log(response.status + " " + response.statusText);
                if(response.data === true){
                alert("User " + userName.value + " was succesfully added");
                window.location.href = 'LoginPage.html';}
                if(response.data === false){
                    alert("sorry, this username already exists")
                }
            })
            .catch((error: AxiosError) => {
                alert("Check if all values are correct!");
                console.log(error);
            })
    }
    else alert("password does not match!")
}