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

//Environmental chart
google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(envDataChart);

var itemID = JSON.parse(localStorage.getItem('id'));

function envDataChart(): void {
    /*var regex = /[?&]([^=#]+)=([^&#]*)/g,
       url = window.location.href;
    var params: any = {},
       match;
    while(match = regex.exec(url)) {
       params[match[1]] = match[2];
    }*/


    let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/users/" + itemID + "/environment";

    axios.get<IEnvironment>(uri)
       .then(function (response: AxiosResponse<IEnvironment[]>): void {
          console.log(response);
          var data = new google.visualization.DataTable();
          data.addColumn('string', 'X');
          data.addColumn('number', 'Oxygen');
          data.addColumn('number', 'Co2');
          data.addColumn('number', 'Co');
          data.addColumn('number', 'Pm25');
          data.addColumn('number', 'Pm10');
          data.addColumn('number', 'Ozon');
          data.addColumn('number', 'Dust particles');
          data.addColumn('number', 'Nitrogen Dioxide');
          data.addColumn('number', 'Sulphur dioxide');
        
          response.data.sort((a: IEnvironment, b: IEnvironment) => {
             return new Date(Date.parse(a.dateTimeInfo.toString())).getTime() - new Date(Date.parse(b.dateTimeInfo.toString())).getTime();
          });
          var newarr = [response.data[0]];
          for (var i=1; i<response.data.length; i++) {
               if (response.data[i].dateTimeInfo.toString().split('T')[0]!=response.data[i-1].dateTimeInfo.toString().split('T')[0]){
                   newarr.push(response.data[i]);
                }
            }

          newarr.forEach((env: IEnvironment) => {
               data.addRows([
                   [env.dateTimeInfo.toString().split('T')[0], env.oxygen, env.co2, env.co, env.pm25, env.pm10, env.ozon, env.dustParticles, env.nitrogenDioxide, env.sulphurDioxide]
               ]);
            
            });   
  
          var options = {
                hAxis: {
                   title: 'Date',
                   titleColor: 'white',
                   textStyle: {
                     color: 'white',
                     fontSize: 16,
                     italic: true,
                     bold: true
                    }
                },
                vAxis: {
                   title: 'Environment', 
                   titleColor: 'white',
                   textStyle: {
                     color: 'white',
                     fontSize: 16,
                     italic: true, 
                     bold: true
                    }
                },
                titleTextStyle: {
                    color: 'white',
                    fontSize: 16,
                    italic: true,
                    bold: true
                },
                backgroundColor: 'transparent', 
                curveLine: 'none',
                lineWidth: 3,
                legendTextStyle: {color: 'white', italic: true}
            };
          var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
          chart.draw(data, options);
        })
 
        let envDataOutput: HTMLOutputElement = <HTMLOutputElement>document.getElementById("envDataOutput");

        axios.get<IEnvironment[]>(uri)
       .then(function(response : AxiosResponse<IEnvironment[]>) : void {
       addToDOM(response)
    })
    .catch(function(error : AxiosError) : void {
        if (error.response){
            envDataOutput.innerHTML = error;}
        else {envDataOutput.innerHTML = error;}
    })

        function addToDOM(response: AxiosResponse<IEnvironment[]>): void {
            let tElement: HTMLTableElement = document.createElement<"table">("table");
            envDataOutput.appendChild(tElement)
        
            let trElement: HTMLTableRowElement = document.createElement<"tr">("tr");
        
            let thElement: HTMLTableHeaderCellElement = document.createElement<"th">("th");
            thElement.innerHTML = "User's Id";
            trElement.appendChild(thElement);
            let th1Element: HTMLTableHeaderCellElement = document.createElement<"th">("th");
            th1Element.innerHTML = "Oxygen";
            trElement.appendChild(th1Element);
            let th2Element: HTMLTableHeaderCellElement = document.createElement<"th">("th");
            th2Element.innerHTML = "co2";
            trElement.appendChild(th2Element);
            let th3Element: HTMLTableHeaderCellElement = document.createElement<"th">("th");
            th3Element.innerHTML = "co";
            trElement.appendChild(th3Element);
            let th4Element: HTMLTableHeaderCellElement = document.createElement<"th">("th");
            th4Element.innerHTML = "pm25";
            trElement.appendChild(th4Element);
            let th5Element: HTMLTableHeaderCellElement = document.createElement<"th">("th");
            th5Element.innerHTML = "pm10";
            trElement.appendChild(th5Element);
            let th6Element: HTMLTableHeaderCellElement = document.createElement<"th">("th");
            th6Element.innerHTML = "Ozon";
            trElement.appendChild(th6Element);
            let th7Element: HTMLTableHeaderCellElement = document.createElement<"th">("th");
            th7Element.innerHTML = "Dust particules";
            trElement.appendChild(th7Element);
            let th8Element: HTMLTableHeaderCellElement = document.createElement<"th">("th");
            th8Element.innerHTML = "Nitrogen Dioxide";
            trElement.appendChild(th8Element);
            let th9Element: HTMLTableHeaderCellElement = document.createElement<"th">("th");
            th9Element.innerHTML = "Sulphur Dioxide";
            trElement.appendChild(th9Element);
            let th10Element: HTMLTableHeaderCellElement = document.createElement<"th">("th");
            th10Element.innerHTML = "Longitude";
            trElement.appendChild(th10Element);
            let th11Element: HTMLTableHeaderCellElement = document.createElement<"th">("th");
            th11Element.innerHTML = "Latitude";
            trElement.appendChild(th11Element);
            let th12Element: HTMLTableHeaderCellElement = document.createElement<"th">("th");
            th12Element.innerHTML = "Date";
            trElement.appendChild(th12Element);
        
            tElement.appendChild(trElement)
        
            response.data.forEach((userEnvData: IEnvironment) => {
        
                let tr2Element: HTMLTableRowElement = document.createElement<"tr">("tr");
        
                let tdElement: HTMLTableDataCellElement = document.createElement<"td">("td");
                tdElement.innerHTML = userEnvData.userId.toString();
                tr2Element.appendChild(tdElement);        
                let td2Element: HTMLTableDataCellElement = document.createElement<"td">("td");
                td2Element.innerHTML = userEnvData.oxygen.toString();
                tr2Element.appendChild(td2Element);
                let td3Element: HTMLTableDataCellElement = document.createElement<"td">("td");
                td3Element.innerHTML = userEnvData.co2.toString();
                tr2Element.appendChild(td3Element);
                let td1Element: HTMLTableDataCellElement = document.createElement<"td">("td");
                td1Element.innerHTML = userEnvData.co.toString();
                tr2Element.appendChild(td1Element);
                let td4Element: HTMLTableDataCellElement = document.createElement<"td">("td");
                td4Element.innerHTML = userEnvData.pm25.toString();
                tr2Element.appendChild(td4Element);
                let td5Element: HTMLTableDataCellElement = document.createElement<"td">("td");
                td5Element.innerHTML = userEnvData.pm10.toString();
                tr2Element.appendChild(td5Element);
                let td6Element: HTMLTableDataCellElement = document.createElement<"td">("td");
                td6Element.innerHTML = userEnvData.ozon.toString();
                tr2Element.appendChild(td6Element);
                let td7Element: HTMLTableDataCellElement = document.createElement<"td">("td");
                td7Element.innerHTML = userEnvData.dustParticles.toString();
                tr2Element.appendChild(td7Element);
                let td8Element: HTMLTableDataCellElement = document.createElement<"td">("td");
                td8Element.innerHTML = userEnvData.nitrogenDioxide.toString();
                tr2Element.appendChild(td8Element);
                let td9Element: HTMLTableDataCellElement = document.createElement<"td">("td");
                td9Element.innerHTML = userEnvData.sulphurDioxide.toString();
                tr2Element.appendChild(td9Element);
                let td10Element: HTMLTableDataCellElement = document.createElement<"td">("td");
                td10Element.innerHTML = userEnvData.longitude.toString();
                tr2Element.appendChild(td10Element);
                let td11Element: HTMLTableDataCellElement = document.createElement<"td">("td");
                td11Element.innerHTML = userEnvData.latitude.toString();
                tr2Element.appendChild(td11Element);
                let td12Element: HTMLTableDataCellElement = document.createElement<"td">("td");
                td12Element.innerHTML = userEnvData.dateTimeInfo.toString();
                tr2Element.appendChild(td12Element);
        
                tElement.appendChild(tr2Element)
        
                tr2Element.addEventListener("click", () => {
                    console.log(userEnvData.userId);
                    cEnvDataInput = userEnvData.id;
                    cuserIdInput = userEnvData.userId;
                    cOxygenInput.defaultValue = userEnvData.oxygen.toString();
                    cCo2Input.defaultValue = userEnvData.co2.toString();
                    cCoInput.defaultValue = userEnvData.co.toString();
                    cPm25Input.defaultValue = userEnvData.pm25.toString();
                    cPm10Input.defaultValue = userEnvData.pm10.toString();
                    cOzonInput.defaultValue = userEnvData.ozon.toString();
                    cDustPInput.defaultValue = userEnvData.dustParticles.toString();
                    cNitDioInput.defaultValue = userEnvData.nitrogenDioxide.toString();
                    cSulDioInput.defaultValue = userEnvData.sulphurDioxide.toString();
                    cLongInput.defaultValue = userEnvData.longitude.toString();
                    cLatInput.defaultValue = userEnvData.latitude.toString();
                    deleteButton.addEventListener("click", () => {
                        deleteEnvDataRecord(userEnvData.id); });
                    tr2Element.style.backgroundColor = "red"; 
                });
            });
        } 

    let cEnvDataInput: Number;
    let cuserIdInput: Number;
    let cOxygenInput: HTMLInputElement = <HTMLInputElement>document.getElementById("cOxygenInput");
    let cCo2Input: HTMLInputElement = <HTMLInputElement>document.getElementById("cCo2Input");
    let cCoInput: HTMLInputElement = <HTMLInputElement>document.getElementById("cCoInput");
    let cPm25Input: HTMLInputElement = <HTMLInputElement>document.getElementById("cPm25Input");
    let cPm10Input: HTMLInputElement = <HTMLInputElement>document.getElementById("cPm10Input");
    let cOzonInput: HTMLInputElement = <HTMLInputElement>document.getElementById("cOzonInput");
    let cDustPInput: HTMLInputElement = <HTMLInputElement>document.getElementById("cDustPInput");
    let cNitDioInput: HTMLInputElement = <HTMLInputElement>document.getElementById("cNitDioInput");
    let cSulDioInput: HTMLInputElement = <HTMLInputElement>document.getElementById("cSulDioInput");
    let cLongInput: HTMLInputElement = <HTMLInputElement>document.getElementById("cLongInput");
    let cLatInput: HTMLInputElement = <HTMLInputElement>document.getElementById("cLatInput");
    let changeEnvDataOutput: HTMLOutputElement = <HTMLOutputElement>document.getElementById("changeEnvDataOutput");
    let changeEnvDataButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("changeEnvDataButton");
    changeEnvDataButton.addEventListener("click", changeEnvData);
    
    function changeEnvData(): void {
        let id: number = Number(cEnvDataInput);
        let oxygenI: number = Number(cOxygenInput.value);
        let co2I: number = Number(cCo2Input.value);
        let coI: number = Number(cCoInput.value);
        let pm25I: number = Number(cPm25Input.value);
        let pm10I: number = Number(cPm10Input);
        let ozonI: number = Number(cOzonInput.value);
        let dustPI: number = Number(cDustPInput.value);
        let nitDioI: number = Number(cNitDioInput.value);
        let sulDioI: number = Number(cSulDioInput.value);
        let longI: number = Number(cLongInput);
        let latI: number = Number(cLatInput.value);
        let uII: number = Number(cuserIdInput);
        let myDate: Date = new Date();
        let hours: number = myDate.getHours();
        let dTII: Date = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate(), (hours + 1), myDate.getMinutes(), myDate.getSeconds());
        let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/environment/" + id;
        axios.put<IEnvironment>(uri, { oxygen: oxygenI, co2: co2I, co: coI, pm25: pm25I, pm10: pm10I, ozon: ozonI, dustParticles: dustPI, nitrogenDioxide: nitDioI, sulphurDioxide: sulDioI, longitude: longI, latitude: latI, userId: uII, dateTimeInfo: dTII })
            .then((response: AxiosResponse) => {
                changeEnvDataOutput.innerHTML = "Response: " + response.status + " " + response.statusText + "\t";
                changeEnvDataOutput.innerHTML += "The health data is changed!"
            })
            .catch(function (error: AxiosError): void {
                if (error.response) {
                    changeEnvDataOutput.innerHTML = error;
                }
                else { changeEnvDataOutput.innerHTML = error; }
            })
    }

let oxygenInput: HTMLInputElement = <HTMLInputElement>document.getElementById("co2Input");
let co2Input: HTMLInputElement = <HTMLInputElement>document.getElementById("co2Input");
let coInput: HTMLInputElement = <HTMLInputElement>document.getElementById("coInput");
let pm25Input: HTMLInputElement = <HTMLInputElement>document.getElementById("pm25Input");
let pm10Input: HTMLInputElement = <HTMLInputElement>document.getElementById("pm10Input");
let ozonInput: HTMLInputElement = <HTMLInputElement>document.getElementById("ozonInput");
let dustPInput: HTMLInputElement = <HTMLInputElement>document.getElementById("dustPInput");
let nitDioInput: HTMLInputElement = <HTMLInputElement>document.getElementById("nitDioInput");
let sulDioInput: HTMLInputElement = <HTMLInputElement>document.getElementById("sulDioInput");
let longInput: HTMLInputElement = <HTMLInputElement>document.getElementById("longInput");
let latInput: HTMLInputElement = <HTMLInputElement>document.getElementById("latInput");
let addEnvDataOutput: HTMLOutputElement = <HTMLOutputElement>document.getElementById("addEnvDataOutput");
let addEnvDataButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addEnvDataButton");
addEnvDataButton.addEventListener("click", addEnvData);
        
function addEnvData(): void{
    let addOx: number = Number(oxygenInput.value);
    let addCo2: number = Number(co2Input.value);
    let addCo: number = Number(coInput.value);
    let addPm25: number = Number(pm25Input.value);
    let addPm10: number = Number(pm10Input.value);
    let addOz: number = Number(ozonInput.value);
    let addDP: number = Number(dustPInput.value);
    let addND: number = Number(nitDioInput.value);
    let addSD: number = Number(sulDioInput.value);
    let addLon: number = Number(longInput.value);
    let addLan: number = Number(latInput.value);
    let addUI: number = itemID;
    let myDate : Date = new Date();
    let hours : number = myDate.getHours();
    let dTII : Date = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate(), (hours + 1), myDate.getMinutes(), myDate.getSeconds());
    let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/environment";
        
    axios.post<IEnvironment>(uri,{oxygen: addOx, co2: addCo2, co: addCo, pm25: addPm25, pm10: addPm10, ozon: addOz, dustParticles: addDP, nitrogenDioxide: addND, sulphurDioxide: addSD, longitude: addLon, latitude: addLan, userId: addUI, dateTimeInfo: dTII})
        .then ((response:AxiosResponse) => {
                addEnvDataOutput.innerHTML = "Response: " + response.status + " " + response.statusText + "\t";
                addEnvDataOutput.innerHTML += "The environment data is added!"
        })
        .catch(function(error : AxiosError) : void {
            if (error.response){
                addEnvDataOutput.innerHTML = error;}
            else {addEnvDataOutput.innerHTML = error;}
        })
    
}    


let deleteButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("deletebutton");
let delEnvDataOutput : HTMLDivElement = <HTMLDivElement> document.getElementById("delEnvDataOutput");

function deleteEnvDataRecord(id: number): void {
      let deleteUri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/environment/" + id;
      console.log("DELETE " + deleteUri);
      axios.delete<IEnvironment>(deleteUri)
        .then(function(response: AxiosResponse<IEnvironment>) : void {
           console.log(JSON.stringify(response));
           delEnvDataOutput.innerHTML = response.status + " " + response.statusText;
           delEnvDataOutput.innerHTML += "Please refresh to see the changes!";
        })
        .catch(function(error : AxiosError) : void {
            if (error.response){
                delEnvDataOutput.innerHTML = error;}
            else {delEnvDataOutput.innerHTML = error;}
        })
}  
    
}




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*let allButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("allButton");
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
        let result: string = "<table></th><th>Oxygen</th><th>Co2</th><th>Co</th><th>Pm25</th><th>Pm10</th><th>Ozon</th><th>Dust Particles</th><th>Nitrogen Dioxide</th><th>Sulphur Dioxide</th><th>Longitute</th><th>Latitute</th><th>Date</th>" 
             response.data.forEach((env: IEnvironment) => {
            result += "<tr><td>" + env.oxygen + "</td><td>" + env.co2 + "</td><td>" + env.co + "</td><td>" + env.pm25 + "</td><td>" + env.pm10 + "</td><td>" + env.ozon + "</td><td>" + env.dustParticles + "</td><td>" + env.nitrogenDioxide + "</td><td>" + env.sulphurDioxide + "</td><td>" + env.longitude + "</td><td>" + env.latitude + "</td><td>" + env.dateTimeInfo + "</td></tr>"
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


 }*/