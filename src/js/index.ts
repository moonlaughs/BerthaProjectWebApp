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
let goBackButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("goBackButton");
goBackButton.addEventListener("click", goBack);
let iFrame : HTMLIFrameElement = <HTMLIFrameElement> document.getElementById("iFrame");

var itemID = JSON.parse(localStorage.getItem('id'));

// Makes the frame navigate to a specific user's health data
function goToEnvChartAndTable(id: Number): void {

    iFrame.style.visibility = "visible";
    iFrame.contentWindow.location.href = 'EnvironmentUser.html?id=' + id;
}

// Makes the frame navigate to a specific user's environmental data
function goToHealthChartAndTable(id: Number): void {
    iFrame.style.visibility = "visible";
    iFrame.contentWindow.location.href = 'Chart.html?id=' + id;
}

// Navigates back to the scientist's user profile
function goBack(): void {
    window.location.href = 'HealthUser.html?id=' + itemID;
}

// GET - shows a specific user's first and last name when scientist searches for a user by id
function showUser(): void {
    let selOutput: HTMLDivElement = <HTMLDivElement>document.getElementById("selOutput");
    let selInput: HTMLInputElement = <HTMLInputElement>document.getElementById("selInput");
    let id: string = selInput.value;
    let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/users/" + id;

    axios.get<IUser>(uri)
        .then(function (response: AxiosResponse<IUser>): void {
            console.log(response.data);
            let result: string = "User: " + response.data.firstName + " " + response.data.lastName + '\xa0\xa0\xa0\xa0\xa0\xa0' + `<button class='buttonD' id='goToHealthChartAndTable${response.data.id}' href=''Chart.html?id=' + id'>Check Health Data</button>` + '\xa0\xa0' + `<button class='buttonD' id='goToEnvChartAndTable${response.data.id}' href=''EnvironmentUser.html?id=' + id'>Check Environmental Data</button>`;
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









