import axios,{
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios";

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

let allButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("allButton");
allButton.addEventListener("click", getAllEnv);

function getAllEnv(): void{
    let envOutput2: HTMLDivElement = <HTMLDivElement>document.getElementById("envOutput2");
    let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/environment"; 

    axios.get<IEnvironment>(uri)
    .then(function (response: AxiosResponse<IEnvironment[]>): void{
        let result: string = "<table><tr><th>Id</th><th>Oxygen</th><th>Co2</th><th>Co</th><th>Pm25</th><th>Pm10</th><th>Ozon</th><th>Dust Particles</th><th>Nitrogen Dioxide</th><th>Sulphur Dioxide</th><th>Longitute</th><th>Latitute</th><th>User Id</th><th>Date</th>" 
             response.data.forEach((envD: IEnvironment) => {
            result += "<tr><td>" + envD.id + "</td><td>" + envD.oxygen + "</td><td>" + envD.co2 + "</td><td>" + envD.co + "</td><td>" + envD.pm25 + "</td><td>" + envD.pm10 + "</td><td>" + envD.ozon + "</td><td>" + envD.dustParticles + "</td><td>" + envD.nitrogenDioxide + "</td><td>" + envD.sulphurDioxide + "</td><td>" + envD.longitude + "</td><td>" + envD.latitude + "</td><td>" + envD.userId + "</td><td>" + envD.dateTimeInfo + "</td></tr>"
        });
        result += "</table>"
        envOutput2.innerHTML = result;
    })
    .catch (function (error: AxiosError): void {
        if (error.response) {
            envOutput2.innerHTML = error;}
        else {envOutput2.innerHTML = error;}
   })
}

let getAllButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("getAllButton");
getAllButton.addEventListener("click", getEnvData);

function getEnvData(): void{
    let envInput: HTMLInputElement = <HTMLInputElement>document.getElementById("envInput");
    let envOutput: HTMLDivElement = <HTMLDivElement>document.getElementById("envOutput");
    let id: string = envInput.value;
    let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/users/" + id + "/environment";

    axios.get<IEnvironment>(uri)
    .then(function (response: AxiosResponse<IEnvironment[]>): void{
        let result: string = "<table><tr><th>Id</th><th>Oxygen</th><th>Co2</th><th>Co</th><th>Pm25</th><th>Pm10</th><th>Ozon</th><th>Dust Particles</th><th>Nitrogen Dioxide</th><th>Sulphur Dioxide</th><th>Longitute</th><th>Latitute</th><th>User Id</th><th>Date</th>" 
             response.data.forEach((env: IEnvironment) => {
            result += "<tr><td>" + env.id + "</td><td>" + env.oxygen + "</td><td>" + env.co2 + "</td><td>" + env.co + "</td><td>" + env.pm25 + "</td><td>" + env.pm10 + "</td><td>" + env.ozon + "</td><td>" + env.dustParticles + "</td><td>" + env.nitrogenDioxide + "</td><td>" + env.sulphurDioxide + "</td><td>" + env.longitude + "</td><td>" + env.latitude + "</td><td>" + env.userId + "</td><td>" + env.dateTimeInfo + "</td></tr>"
        });
        result += "</table>"
        envOutput.innerHTML = result;
    })
    .catch (function (error: AxiosError): void {
        if (error.response) {
            envOutput.innerHTML = error;}
        else {envOutput.innerHTML = error;}
   })
}

let addOxInput: HTMLInputElement = <HTMLInputElement>document.getElementById("addOxInput");
let addCo2Input: HTMLInputElement = <HTMLInputElement>document.getElementById("addCo2Input");
let addCoInput: HTMLInputElement = <HTMLInputElement>document.getElementById("addCoInput");
let addPm25Input: HTMLInputElement = <HTMLInputElement>document.getElementById("addPm25Input");
let addPm10Input: HTMLInputElement = <HTMLInputElement>document.getElementById("addPm10Input");
let addOzInput: HTMLInputElement = <HTMLInputElement>document.getElementById("addOzInput");
let addDPInput: HTMLInputElement = <HTMLInputElement>document.getElementById("addDPInput");
let addNDInput: HTMLInputElement = <HTMLInputElement>document.getElementById("addNDInput");
let addSDInput: HTMLInputElement = <HTMLInputElement>document.getElementById("addSDInput");
let addLonInput: HTMLInputElement = <HTMLInputElement>document.getElementById("addLonInput");
let addLanInput: HTMLInputElement = <HTMLInputElement>document.getElementById("addLanInput");
let addUIInput: HTMLInputElement = <HTMLInputElement>document.getElementById("addUIInput");

let envOutput: HTMLDivElement = <HTMLDivElement>document.getElementById("envOutput");

let addEnvButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addEnvButton");
addEnvButton.addEventListener("click", addEnvData);

function addEnvData(): void{
    let addOx: number = Number(addOxInput.value);
    let addCo2: number = Number(addCo2Input.value);
    let addCo: number = Number(addCoInput.value);
    let addPm25: number = Number(addPm25Input.value);
    let addPm10: number = Number(addPm10Input.value);
    let addOz: number = Number(addOzInput.value);
    let addDP: number = Number(addDPInput.value);
    let addND: number = Number(addNDInput.value);
    let addSD: number = Number(addSDInput.value);
    let addLon: number = Number(addLonInput.value);
    let addLan: number = Number(addLanInput.value);
    let addUI: number = Number(addUIInput.value);
    let myDate : Date = new Date();
    let hours : number = myDate.getHours();
    let dTII : Date = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate(), (hours + 1), myDate.getMinutes(), myDate.getSeconds());
    let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/environment";

    axios.post<IEnvironment>(uri,{oxygen: addOx, co2: addCo2, co: addCo, pm25: addPm25, pm10: addPm10, ozon: addOz, dustParticles: addDP, nitrogenDioxide: addND, sulphurDioxide: addSD, longitude: addLon, latitude: addLan, userId: addUI, dateTimeInfo: dTII})
    .then ((response:AxiosResponse) => {
        envOutput.innerHTML = "Response: " + response.status + " " + response.statusText + "\t";
        envOutput.innerHTML += "The environment data is added!"})
     .catch(function(error : AxiosError) : void {
         if (error.response){
            envOutput.innerHTML = error;}
         else {envOutput.innerHTML = error;}
     })
}
