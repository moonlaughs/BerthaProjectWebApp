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

    let allHButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("allHButton");
    allHButton.addEventListener("click", getAllHealth);

    function getAllHealth(): void{
    let allHOutput: HTMLOutputElement = <HTMLOutputElement>document.getElementById("allHOutput");
    let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/health";
    
    axios.get<IHealth>(uri)
    .then(function (response: AxiosResponse<IHealth[]>): void{
        let result: string = "<table></th><th>Id</th><th>Blood pressure upper</th><th>Blood pressure down</th><th>Heart rate</th><th>Temperature</th><th>User Id</th><th>DateTime</th>"
        response.data.forEach((allHealth: IHealth) => {
        result += "<tr><td>" + allHealth.id + "</td><td>" + allHealth.bloodPressureUpper + "</td><td>" + allHealth.bloodPressureDown + "</td><td>" + allHealth.heartRate + "</td><td>" + allHealth.temperature + "</td><td>" + allHealth.userId + "</td><td>" + allHealth.dateTimeInfo + "</td></tr>"
        });
        result += "</table>"
        allHOutput.innerHTML = result;
    })
    .catch (function(error: AxiosError): void {
        if (error.response) {
            allHOutput.innerHTML = error;
        }
    })  
}
    
    let showSelectedUsersHealthDataButton : HTMLButtonElement = <HTMLButtonElement> document.getElementById("showSelectedUsersHealthData");
    showSelectedUsersHealthDataButton.addEventListener("click", showSelUserHealthData);
    let healthDataOutput : HTMLOutputElement = <HTMLOutputElement> document.getElementById("healthDataOutput");
  
    function addToDOM(response: AxiosResponse<IHealth[]>) : void {
        let tElement : HTMLTableElement = document.createElement<"table">("table");
        healthDataOutput.appendChild(tElement)  
    
        let trElement: HTMLTableRowElement = document.createElement<"tr">("tr");
    
        let thElement: HTMLTableHeaderCellElement = document.createElement<"th">("th");
        thElement.innerHTML = "User's Id";
        trElement.appendChild(thElement);
        let th1Element: HTMLTableHeaderCellElement = document.createElement<"th">("th");
        th1Element.innerHTML = "Upper blood pressure";
        trElement.appendChild(th1Element);
        let th2Element: HTMLTableHeaderCellElement = document.createElement<"th">("th");
        th2Element.innerHTML = "Down blood pressure";
        trElement.appendChild(th2Element);
        let th3Element: HTMLTableHeaderCellElement = document.createElement<"th">("th");
        th3Element.innerHTML = "Heart rate";
        trElement.appendChild(th3Element);
        let th4Element: HTMLTableHeaderCellElement = document.createElement<"th">("th");
        th4Element.innerHTML = "Temperature";
        trElement.appendChild(th4Element);
        let th5Element: HTMLTableHeaderCellElement = document.createElement<"th">("th");
        th5Element.innerHTML = "Date";
        trElement.appendChild(th5Element);
    
        tElement.appendChild(trElement)
    
        let updateInput : HTMLInputElement = <HTMLInputElement> document.getElementById("updateInput");
    
        response.data.forEach((userHealthData: IHealth) => {
    
            let tr2Element: HTMLTableRowElement = document.createElement<"tr">("tr");
          
            let tdElement: HTMLTableDataCellElement = document.createElement<"td">("td");
            tdElement.innerHTML = userHealthData.userId.toString();
            tr2Element.appendChild(tdElement);
    
            let td2Element: HTMLTableDataCellElement = document.createElement<"td">("td");
            td2Element.innerHTML = userHealthData.bloodPressureUpper.toString();
            tr2Element.appendChild(td2Element);
            let td3Element: HTMLTableDataCellElement = document.createElement<"td">("td");
            td3Element.innerHTML = userHealthData.bloodPressureDown.toString();
            tr2Element.appendChild(td3Element);
            let td4Element: HTMLTableDataCellElement = document.createElement<"td">("td");
            td4Element.innerHTML = userHealthData.heartRate.toString();
            tr2Element.appendChild(td4Element);
            let td5Element: HTMLTableDataCellElement = document.createElement<"td">("td");
            td5Element.innerHTML = userHealthData.temperature.toString();
            tr2Element.appendChild(td5Element);
            let td6Element: HTMLTableDataCellElement = document.createElement<"td">("td");
            td6Element.innerHTML = userHealthData.dateTimeInfo.toString();
            tr2Element.appendChild(td6Element);
    
            tElement.appendChild(tr2Element)
    
            // tooltip effect, not implemented (yet)
            // https://www.w3schools.com/css/tryit.asp?filename=trycss_tooltip
            tr2Element.addEventListener("click", () => {
                console.log(userHealthData.userId);
                // text string!
                // ++ detailContent.innerHTML = bid.item + "<br /> " + bid.price;
                cHealthDataInput.placeholder = userHealthData.id.toString();
                cuserIdInput.placeholder = userHealthData.userId.toString();
                cbloodPressureUInput.placeholder = userHealthData.bloodPressureUpper.toString();
                cbloodPressureDInput.placeholder = userHealthData.bloodPressureDown.toString();
                cheartRateInput.placeholder = userHealthData.heartRate.toString();
                ctemperatureInput.placeholder = userHealthData.temperature.toString();
                cdateTimeInfoInput.placeholder = userHealthData.dateTimeInfo.toString();
                tr2Element.style.backgroundColor = "red"; // how to unset color?
                //deleteButton.style.display = "block";
                //deleteButton.addEventListener("click", () => {
                //    deleteComment(comment.id);
                //});
            });
        });
    }
    
    function showSelUserHealthData() : void {
        let healthDataInput : HTMLInputElement = <HTMLInputElement> document.getElementById("healthDataInput");
        let id: string = healthDataInput.value;
        let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/users/" + id + "/health";
    
        axios.get<IHealth>(uri)
        .then(function(response:AxiosResponse<IHealth[]>): void {
            let result: string = "<table></th><th>Blood pressure upper</th><th>Blood pressure down</th><th>Hearth rate</th><th>Temperature</th><th>Date</th>" 
                    response.data.forEach((userHealthData: IHealth) => {
                result += "<tr><td>" + userHealthData.bloodPressureUpper + "</td><td>" + userHealthData.bloodPressureDown + "</td><td>" + userHealthData.heartRate + "</td><td>" + userHealthData.temperature + "</td><td>" + userHealthData.dateTimeInfo + "</td></tr>"
            });
            result += "</table>"
            healthDataOutput.innerHTML = result;
        })
        .catch(function(error : AxiosError) : void {
            if (error.response){
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

let cHealthDataInput : HTMLInputElement = <HTMLInputElement> document.getElementById("cHealthDataInput");
let cuserIdInput : HTMLInputElement = <HTMLInputElement> document.getElementById("cuserIdInput");
let cbloodPressureUInput : HTMLInputElement = <HTMLInputElement> document.getElementById("cbloodPressureUInput");
let cbloodPressureDInput : HTMLInputElement = <HTMLInputElement> document.getElementById("cbloodPressureDInput");
let cheartRateInput : HTMLInputElement = <HTMLInputElement> document.getElementById("cheartRateInput");
let ctemperatureInput : HTMLInputElement = <HTMLInputElement> document.getElementById("ctemperatureInput");
let cdateTimeInfoInput : HTMLInputElement = <HTMLInputElement> document.getElementById("cdateTimeInfoInput");
let changeHealthDataOutput : HTMLOutputElement = <HTMLOutputElement> document.getElementById("changeHealthDataOutput");
let changeHealthDataButton : HTMLButtonElement = <HTMLButtonElement> document.getElementById("changeHealthDataButton");
changeHealthDataButton.addEventListener("click", changeHealthData);

function changeHealthData() : void {
    let id : number = Number(cHealthDataInput.value);
    let bPUI : number = Number(cbloodPressureUInput.value);
    let bPDI : number = Number(cbloodPressureDInput.value);
    let hRI : number = Number(cheartRateInput.value);
    let tI : number = Number(ctemperatureInput.value);
    let uII : number = Number(cuserIdInput.value);
    let myDate : Date = new Date();
    let hours : number = myDate.getHours();
    let dTII : Date = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate(), (hours + 1), myDate.getMinutes(), myDate.getSeconds());
    let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/health/" + id;
    axios.put<IHealth>(uri, {bloodPressureUpper : bPUI, bloodPressureDown : bPDI, heartRate : hRI, temperature : tI, userId : uII, dateTimeInfo : dTII})
    .then ((response:AxiosResponse) => {
     changeHealthDataOutput.innerHTML = "Response: " + response.status + " " + response.statusText + "\t";
     changeHealthDataOutput.innerHTML += "The health data is changed!"})
     .catch(function(error : AxiosError) : void {
         if (error.response){
             changeHealthDataOutput.innerHTML = error;}
         else {changeHealthDataOutput.innerHTML = error;}
     })
 }