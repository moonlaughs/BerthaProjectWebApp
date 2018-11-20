import axios, {
    AxiosResponse,
    AxiosError} from "../../node_modules/axios";
    
    interface IUser {
        id : number;
        firstName : string;
        lastName : string;
        userName : string;
        pass : string;
        age : number;
        gender : string;
        typeOfUser : string;
    }

    let firstName: HTMLInputElement = <HTMLInputElement> document.getElementById("firstName");
    let lastName: HTMLInputElement = <HTMLInputElement> document.getElementById("lastName");
    let username: HTMLInputElement = <HTMLInputElement> document.getElementById("username");
    let pass: HTMLInputElement = <HTMLInputElement> document.getElementById("pass");
    let age: HTMLInputElement = <HTMLInputElement> document.getElementById("age");
    let selectGender: HTMLSelectElement = <HTMLSelectElement> document.getElementById("selectGender");

    let addButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("addButton");
    addButton.addEventListener("click", AddUser);

    function AddUser(): void{
        let myfirstname: string = firstName.value;
        let mylastname: string = lastName.value;
        let myusername: string = username.value;
        let mypass: string = pass.value;
        let myage: number = parseInt(age.value);
        let mygender: string = selectGender.value;
        let myTypeOfUser: string = "U";

        let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/users";
        axios.post<IUser>(uri, {firstName: myfirstname, lastName: mylastname, userName: myusername, pass: mypass, age: myage, gender: mygender, typeOfUser: myTypeOfUser})
        .then(function(response: AxiosResponse){
            console.log(response.status + " " + response.statusText);
            if (response.status === 200) {
                window.location.href = 'http://localhost:3000';
            }
            if (response.status === "HTTP400")
            {
                alert("Check if all values are correct!");
            }
            else
            {
                alert("Check if all values are correct!");
            }
        })
        .catch((error: AxiosError) => {
            console.log(error)
        })
    }
