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
    var regex = /[?&]([^=#]+)=([^&#]*)/g,
        url = window.location.href;
    var params: any = {},
        match;
    while (match = regex.exec(url)) {
        params[match[1]] = match[2];
    }
    let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/users/1"; //+ "?id="+ "1";//params.id;
    axios.get<IUser>(uri)
        .then(function (response: AxiosResponse<IUser>): void {
            let result: string = "<table></th><th>First Name</th><th>Last Name</th><th>Username</th><th>Age</th><th>Gender</th>"
            response.data.forEach((user: IUser) => {
                result += "<tr><td>" + user.firstName + "</td><td>" + user.lastName + "</td><td>" + user.userName + "</td><td>" + user.age + "</td><td>" + user.gender + "</td></tr>"
            });
            result += "</table>"
            Info.innerHTML = result;
        })
        .catch(function (error: AxiosError): void {
            if (error.response) {
                Info.innerHTML = error;
            }
            else { Info.innerHTML = error; }
        })
}