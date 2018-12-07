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

let showSelectedUser: HTMLButtonElement = <HTMLButtonElement>document.getElementById("showSelectedUser");
showSelectedUser.addEventListener("click", showUser);

function goToEnvChartAndTable(id: Number): void {

    window.location.href = 'EnvironmentUser.html?id=' + id;
}

function goToHealthChartAndTable(id: Number): void {

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
            let result: string = response.data.firstName + " " + response.data.lastName + " " + `<button id='goToHealthChartAndTable${response.data.id}'>Check Health Data</button>` + " " + `<button id='goToEnvChartAndTable${response.data.id}'>Check ENV Data</button>`;
            selOutput.innerHTML = result;
              let gotoHealthChartAndTableButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`goToHealthChartAndTable${response.data.id}`);
              gotoHealthChartAndTableButton.addEventListener("click", function () {
                    goToHealthChartAndTable(response.data.id);      
              });
              let gotoEnvChartAndTableButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`goToEnvChartAndTable${response.data.id}`);
              gotoEnvChartAndTableButton.addEventListener("click", function () {
                    // pass in `this` (the element), and someOtherVar
                    goToEnvChartAndTable(response.data.id);
              });
        })
        .catch(function (error: AxiosError): void {
            if (error.response) {
                selOutput.innerHTML = error;
            }
            else { selOutput.innerHTML = error; }
        });
}









