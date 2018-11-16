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
    
    interface IHealth {
        id : number;
        bloodPressureUpper : number;
        bloodPressureDown : number;
        heartRate : number;
        temperature : number;
        userId : number;
        dateTimeInfo : Date;
    }
    
    let output: HTMLDivElement = <HTMLDivElement> document.getElementById("output");
    let showallUsersButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("showAllUsersButton");
    showallUsersButton.addEventListener("click", showAllUsers);
    
    function showAllUsers(): void {
        let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/users";
        axios.get<IUser[]>(uri)
        .then(function(response:AxiosResponse<IUser[]>): void {
            let result: string = "<ol>";
            response.data.forEach((user: IUser) => {
                result += "<li>" + user.firstName + " " + user.lastName + "</li>"
            });
            result += "</ol>";
            output.innerHTML = result;
        })
        .catch (function (error: AxiosError): void {
            if (error.response) {
                output.innerHTML = error;}
            else {output.innerHTML = error;}
        });
    }
    
    let showSelectedUser:HTMLButtonElement = <HTMLButtonElement> document.getElementById("showSelectedUser");
    showSelectedUser.addEventListener("click", showUser);
    
    function showUser(): void {
        let selOutput: HTMLDivElement = <HTMLDivElement> document.getElementById("selOutput");
        let selInput : HTMLInputElement = <HTMLInputElement> document. getElementById("selInput");
        let id: string = selInput.value;
        let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/users/" + id;
    
        axios.get<IUser>(uri)
        .then(function (response: AxiosResponse<IUser>): void {
            console.log(response.data);
            let result : string = response.data.firstName;
            selOutput.innerHTML =  result;
        })
        .catch (function (error: AxiosError): void {
             if (error.response) {
                 selOutput.innerHTML = error;
             }
             else {selOutput.innerHTML = error;}
        })
    }
    
    let showSelectedUsersHealthDataButton : HTMLButtonElement = <HTMLButtonElement> document.getElementById("showSelectedUsersHealthData");
    showSelectedUsersHealthDataButton.addEventListener("click", showSelUserHealthData);
    
    function showSelUserHealthData() : void {
        let healthDataInput : HTMLInputElement = <HTMLInputElement> document.getElementById("healthDataInput");
        let healthDataOutput : HTMLOutputElement = <HTMLOutputElement> document.getElementById("healthDataOutput");
        let id: string = healthDataInput.value;
        let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/users/" + id + "/health";
    
        axios.get<IHealth>(uri)
        .then(function(response:AxiosResponse<IHealth[]>): void {
            let result: string = "<table><tr><th>Id</th><th>Blood pressure upper</th><th>Blood pressure down</th><th>Hearth rate</th><th>Temperature</th><th>Date</th>" 
                    response.data.forEach((userHealthData: IHealth) => {
                result += "<tr><td>" + userHealthData.id + "</td><td>" + userHealthData.bloodPressureUpper + "</td><td>" + userHealthData.bloodPressureDown + "</td><td>" + userHealthData.heartRate + "</td><td>" + userHealthData.temperature + "</td><td>" + userHealthData.dateTimeInfo + "</td></tr>"
            });
            result += "</table>"
            healthDataOutput.innerHTML = result;
        })
        .catch (function (error: AxiosError): void {
             if (error.response) {
                 healthDataOutput.innerHTML = error;}
             else {healthDataOutput.innerHTML = error;}
        })
    }
    
    let bloodPressureUInput : HTMLInputElement = <HTMLInputElement> document.getElementById("bloodPressureUInput");
    let bloodPressureDInput : HTMLInputElement = <HTMLInputElement> document.getElementById("bloodPressureDInput");
    let heartRateInput : HTMLInputElement = <HTMLInputElement> document.getElementById("heartRateInput");
    let temperatureInput : HTMLInputElement = <HTMLInputElement> document.getElementById("temperatureInput");
    let userIdInput : HTMLInputElement = <HTMLInputElement> document.getElementById("userIdInput");
    let addHealthDataOutput : HTMLOutputElement = <HTMLOutputElement> document.getElementById("addHealthDataOutput");
    let addHealthDataButton : HTMLButtonElement = <HTMLButtonElement> document.getElementById("addHealthDataButton");
    addHealthDataButton.addEventListener("click", addHealthData);
    
    function addHealthData() : void {
       let bPUI : number = Number(bloodPressureUInput.value);
       let bPDI : number = Number(bloodPressureDInput.value);
       let hRI : number = Number(heartRateInput.value);
       let tI : number = Number(temperatureInput.value);
       let uII : number = Number(userIdInput.value);
       let myDate : Date = new Date();
       let hours : number = myDate.getHours();
       let dTII : Date = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate(), (hours + 1), myDate.getMinutes(), myDate.getSeconds());
       let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/health";
       axios.post<IHealth>(uri, {bloodPressureUpper : bPUI, bloodPressureDown : bPDI, heartRate : hRI, temperature : tI, userId : uII, dateTimeInfo : dTII})
       .then ((response:AxiosResponse) => {
        addHealthDataOutput.innerHTML = "Response: " + response.status + " " + response.statusText + "\t";
        addHealthDataOutput.innerHTML += "The health data is added!"})
        .catch(function(error : AxiosError) : void {
            if (error.response){
                addHealthDataOutput.innerHTML = error;}
            else {addHealthDataOutput.innerHTML = error;}
        })
    }