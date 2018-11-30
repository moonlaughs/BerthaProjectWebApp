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
let userName: HTMLInputElement = <HTMLInputElement>document.getElementById("userName");
let pass: HTMLInputElement = <HTMLInputElement>document.getElementById("pass");
let pass2: HTMLInputElement = <HTMLInputElement>document.getElementById("pass2");
let age: HTMLInputElement = <HTMLInputElement>document.getElementById("age");
let selectGender: HTMLSelectElement = <HTMLSelectElement>document.getElementById("selectGender");

let addButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addButton");
addButton.addEventListener("click", AddUserWithUsernameValidation);
<<<<<<< HEAD

let backButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("back");
backButton.addEventListener("click", () => window.location.href = 'LoginPage.html')
=======
>>>>>>> a2560812519d27b2fea9e35c3f02741593978efd

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
<<<<<<< HEAD
                alert("User " + username + " was succesfully added");
=======
                alert("User " + userName + " was succesfully added");
>>>>>>> a2560812519d27b2fea9e35c3f02741593978efd
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
<<<<<<< HEAD
    let myusername: string = username.value;
=======
    let myusername: string = userName.value;
>>>>>>> a2560812519d27b2fea9e35c3f02741593978efd
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
<<<<<<< HEAD
                alert("User " + username.value + " was succesfully added");
=======
                alert("User " + userName.value + " was succesfully added");
>>>>>>> a2560812519d27b2fea9e35c3f02741593978efd
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