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

    axios.get<IHealth>(uri)
        .then(function (response: AxiosResponse<IHealth[]>): void {
            let result: string = "<table></th><th>Blood pressure upper</th><th>Blood pressure down</th><th>Hearth rate</th><th>Temperature</th><th>Date</th>"
            response.data.forEach((userHealthData: IHealth) => {
                result += "<tr><td>" + userHealthData.bloodPressureUpper + "</td><td>" + userHealthData.bloodPressureDown + "</td><td>" + userHealthData.heartRate + "</td><td>" + userHealthData.temperature + "</td><td>" + userHealthData.dateTimeInfo + "</td></tr>"
            });
            result += "</table>"
            healthDataOutput.innerHTML = result;
        })
        .catch(function (error: AxiosError): void {
            if (error.response) {
                healthDataOutput.innerHTML = error;
            }
            else { healthDataOutput.innerHTML = error; }
        })


        let bloodPressureUInput: HTMLInputElement = <HTMLInputElement>document.getElementById("bloodPressureUInput");
let bloodPressureDInput: HTMLInputElement = <HTMLInputElement>document.getElementById("bloodPressureDInput");
let heartRateInput: HTMLInputElement = <HTMLInputElement>document.getElementById("heartRateInput");
let temperatureInput: HTMLInputElement = <HTMLInputElement>document.getElementById("temperatureInput");
let userIdInput: HTMLInputElement = <HTMLInputElement>document.getElementById("userIdInput");
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
}