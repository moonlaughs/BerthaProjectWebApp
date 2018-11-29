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
    //some extra shit for pop up
    userName:string;
    pass:string;
    pass2:string;

}

let usernameInput: HTMLInputElement = <HTMLInputElement>document.getElementById("username");
let passwordInput: HTMLInputElement = <HTMLInputElement>document.getElementById("password");

let loginButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("loginButton");
loginButton.addEventListener("click", login);

/*  the create an account button for pop up box*/
let addButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addButton");
addButton.addEventListener("click", AddUser);

let firstName: HTMLInputElement=<HTMLInputElement>document.getElementById("firstName");
let lastName:HTMLInputElement=<HTMLInputElement>document.getElementById("lastName");
let userName:HTMLInputElement=<HTMLInputElement>document.getElementById("userName");
let pass:HTMLInputElement=<HTMLInputElement>document.getElementById("pass");
let pass2:HTMLInputElement=<HTMLInputElement>document.getElementById("pass2");
let age:HTMLInputElement=<HTMLInputElement>document.getElementById("age");
let selectGender:HTMLInputElement=<HTMLInputElement>document.getElementById("selectGender");

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
/* for pop up sign up page*/
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