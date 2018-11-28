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

//health chart
google.charts.load('current', { packages: ['corechart', 'line'] });
google.charts.setOnLoadCallback(healthDataChart);

function healthDataChart(): void {
    var regex = /[?&]([^=#]+)=([^&#]*)/g,
        url = window.location.href;
    var params: any = {},
        match;
    while (match = regex.exec(url)) {
        params[match[1]] = match[2];
    }

    let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/users/" + params.id + "/health";

    axios.get<IHealth>(uri)
        .then(function (response: AxiosResponse<IHealth[]>): void {
            console.log(response);
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'X');
            data.addColumn('number', 'Blood pressure upper');
            data.addColumn('number', 'Blood pressure down');
            data.addColumn('number', 'Heart rate');
            data.addColumn('number', 'Tempeture');

            response.data.sort((a: IHealth, b: IHealth) => {
                return new Date(Date.parse(a.dateTimeInfo.toString())).getTime() - new Date(Date.parse(b.dateTimeInfo.toString())).getTime();
            });
            var newarr = [response.data[0]];
            for (var i = 1; i < response.data.length; i++) {
                if (response.data[i].dateTimeInfo.toString().split('T')[0] != response.data[i - 1].dateTimeInfo.toString().split('T')[0]) {
                    newarr.push(response.data[i]);
                }
            }

            newarr.forEach((hth: IHealth) => {
                data.addRows([
                    [hth.dateTimeInfo.toString().split('T')[0], hth.bloodPressureUpper, hth.bloodPressureDown, hth.heartRate, hth.temperature]
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
                    title: 'Health',
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
                curveType: 'none',
                lineWidth: 3,
                dataColor: 'white',
                legendTextStyle: { color: 'white', italic: true }
            };

            var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
            chart.draw(data, options);
        })

        

        let healthDataOutput: HTMLOutputElement = <HTMLOutputElement>document.getElementById("healthDataOutput");

        axios.get<IHealth[]>(uri)
       .then(function(response : AxiosResponse<IHealth[]>) : void {
       addToDOM(response)
    })
    .catch(function(error : AxiosError) : void {
        if (error.response){
            healthDataOutput.innerHTML = error;}
        else {healthDataOutput.innerHTML = error;}
    })

        function addToDOM(response: AxiosResponse<IHealth[]>): void {
            let tElement: HTMLTableElement = document.createElement<"table">("table");
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
        
                tr2Element.addEventListener("click", () => {
                    console.log(userHealthData.userId);
                    cHealthDataInput = userHealthData.id;
                    cuserIdInput = userHealthData.userId;
                    cbloodPressureUInput.defaultValue = userHealthData.bloodPressureUpper.toString();
                    cbloodPressureDInput.defaultValue = userHealthData.bloodPressureDown.toString();
                    cheartRateInput.defaultValue = userHealthData.heartRate.toString();
                    ctemperatureInput.defaultValue = userHealthData.temperature.toString();
                    deleteButton.addEventListener("click", () => {
                        deleteHealthRecord(userHealthData.id); });
                    tr2Element.style.backgroundColor = "red"; 
                });
            });
        }    
       
    let cHealthDataInput: Number;
    let cuserIdInput: Number;
    let cbloodPressureUInput: HTMLInputElement = <HTMLInputElement>document.getElementById("cbloodPressureUInput");
    let cbloodPressureDInput: HTMLInputElement = <HTMLInputElement>document.getElementById("cbloodPressureDInput");
    let cheartRateInput: HTMLInputElement = <HTMLInputElement>document.getElementById("cheartRateInput");
    let ctemperatureInput: HTMLInputElement = <HTMLInputElement>document.getElementById("ctemperatureInput");
    let changeHealthDataOutput: HTMLOutputElement = <HTMLOutputElement>document.getElementById("changeHealthDataOutput");
    let changeHealthDataButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("changeHealthDataButton");
    changeHealthDataButton.addEventListener("click", changeHealthData);

    function changeHealthData(): void {
        let id: number = Number(cHealthDataInput);
        let bPUI: number = Number(cbloodPressureUInput.value);
        let bPDI: number = Number(cbloodPressureDInput.value);
        let hRI: number = Number(cheartRateInput.value);
        let tI: number = Number(ctemperatureInput.value);
        let uII: number = Number(cuserIdInput);
        let myDate: Date = new Date();
        let hours: number = myDate.getHours();
        let dTII: Date = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate(), (hours + 1), myDate.getMinutes(), myDate.getSeconds());
        let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/health/" + id;
        axios.put<IHealth>(uri, { bloodPressureUpper: bPUI, bloodPressureDown: bPDI, heartRate: hRI, temperature: tI, userId: uII, dateTimeInfo: dTII })
            .then((response: AxiosResponse) => {
                changeHealthDataOutput.innerHTML = "Response: " + response.status + " " + response.statusText + "\t";
                changeHealthDataOutput.innerHTML += "The health data is changed!"
            })
            .catch(function (error: AxiosError): void {
                if (error.response) {
                    changeHealthDataOutput.innerHTML = error;
                }
                else { changeHealthDataOutput.innerHTML = error; }
            })
    }


let bloodPressureUInput: HTMLInputElement = <HTMLInputElement>document.getElementById("bloodPressureUInput");
let bloodPressureDInput: HTMLInputElement = <HTMLInputElement>document.getElementById("bloodPressureDInput");
let heartRateInput: HTMLInputElement = <HTMLInputElement>document.getElementById("heartRateInput");
let temperatureInput: HTMLInputElement = <HTMLInputElement>document.getElementById("temperatureInput");
let addHealthDataOutput: HTMLOutputElement = <HTMLOutputElement>document.getElementById("addHealthDataOutput");
let addHealthDataButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addHealthDataButton");
addHealthDataButton.addEventListener("click", addHealthData);

function addHealthData(): void {
    let bPUI: number = Number(bloodPressureUInput.value);
    let bPDI: number = Number(bloodPressureDInput.value);
    let hRI: number = Number(heartRateInput.value);
    let tI: number = Number(temperatureInput.value);
    let uII: number = params.id;
    let myDate: Date = new Date();
    let hours: number = myDate.getHours();
    let dTII: Date = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate(), (hours + 1), myDate.getMinutes(), myDate.getSeconds());
    let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/health";
    axios.post<IHealth>(uri, { bloodPressureUpper: bPUI, bloodPressureDown: bPDI, heartRate: hRI, temperature: tI, userId: uII, dateTimeInfo: dTII })
        .then((response: AxiosResponse) => {
            addHealthDataOutput.innerHTML = "Response: " + response.status + " " + response.statusText + "\t";
            addHealthDataOutput.innerHTML += "The health data is added!"
        })
        .catch(function (error: AxiosError): void {
            if (error.response) {
                addHealthDataOutput.innerHTML = error;
            }
            else { addHealthDataOutput.innerHTML = error; }
        })
}

let deleteButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("deletebutton");
let delHealthDataOutput : HTMLDivElement = <HTMLDivElement> document.getElementById("delHealthDataOutput");

function deleteHealthRecord(id: number): void {
    let deleteUri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/health/" + id;
    console.log("DELETE " + deleteUri);
    axios.delete<IHealth>(deleteUri)
        .then(function(response: AxiosResponse<IHealth>) : void {
           console.log(JSON.stringify(response));
           delHealthDataOutput.innerHTML = response.status + " " + response.statusText;
           delHealthDataOutput.innerHTML += "Please refresh to see the changes!";
        })
        .catch(function(error : AxiosError) : void {
            if (error.response){
                delHealthDataOutput.innerHTML = error;}
            else {delHealthDataOutput.innerHTML = error;}
        })
}

}
