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

interface IHealth {
    id: number;
    bloodPressureUpper: number;
    bloodPressureDown: number;
    heartRate: number;
    temperature: number;
    userId: number;
    dateTimeInfo: Date;
}

interface IEnvironment{
    id : number;
    oxygen: number;
    co2: number;
    co: number;
    pm25: number;
    pm10: number;
    ozon: number;
    dustParticles: number;
    nitrogenDioxide: number;
    sulphurDioxide: number;
    longitude: number;
    latitude: number;
    userId: number;
    dateTimeInfo: Date;
}

let output: HTMLDivElement = <HTMLDivElement>document.getElementById("output");
let showallUsersButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("showAllUsersButton");
showallUsersButton.addEventListener("click", showAllUsers);

function showAllUsers(): void {
    let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/users";
    axios.get<IUser[]>(uri)
        .then(function (response: AxiosResponse<IUser[]>): void {
            let result: string = "<ol>";
            response.data.forEach((user: IUser) => {
                result += "<li>" + user.firstName + " " + user.lastName + `<button id='goToChart${user.id}'>Details</button>` + "</li>"

            });
            result += "</ol>";
            output.innerHTML = result;
            response.data.forEach((user: IUser) => {
                let gotoChartButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`goToChart${user.id}`);
                gotoChartButton.addEventListener("click", function () {
                    // pass in `this` (the element), and someOtherVar
                    goToChart(user.id);
                });
            });
        })
        .catch(function (error: AxiosError): void {
            if (error.response) {
                output.innerHTML = error;
            }
            else { output.innerHTML = error; }
        });

}

let showSelectedUser: HTMLButtonElement = <HTMLButtonElement>document.getElementById("showSelectedUser");
showSelectedUser.addEventListener("click", showUser);

function goToChart(id: Number): void {

    window.location.href = 'Chart.html?id=' + id;
}

function showUser(): void {
    let selOutput: HTMLDivElement = <HTMLDivElement>document.getElementById("selOutput");
    let selInput: HTMLInputElement = <HTMLInputElement>document.getElementById("selInput");
    let id: string = selInput.value;
    let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/users/" + id;

    axios.get<IUser>(uri)
        .then(function (response: AxiosResponse<IUser>): void {
            console.log(response.data);
            let result: string = response.data.firstName + response.data.lastName + `<button id='goToChart${response.data.id}'>Details</button>`;
            selOutput.innerHTML = result;
              let gotoChartButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`goToChart${response.data.id}`);
              gotoChartButton.addEventListener("click", function () {
                    // pass in `this` (the element), and someOtherVar
                goToChart(response.data.id);
            });
        })
        .catch(function (error: AxiosError): void {
            if (error.response) {
                selOutput.innerHTML = error;
            }
            else { selOutput.innerHTML = error; }
        });
}









