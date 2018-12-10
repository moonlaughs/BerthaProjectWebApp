import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios";

interface IHealth {
    id: number;
    bloodPressureUpper: number;
    bloodPressureDown: number;
    heartRate: number;
    temperature: number;
    userId: number;
    dateTimeInfo: Date;
}
interface IUserId {
    id: number;
    typeOfUser: string;
    firstName: string;
    lastName: string;
}

var itemID = JSON.parse(localStorage.getItem('id'));

let userDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("userIdOutput");
let typeDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("divTypeOfUser");
var itemID = JSON.parse(localStorage.getItem('id'));
let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/users/" + itemID;
axios.get<IUserId>(uri)
    .then(function (response: AxiosResponse<IUserId[]>): void {
        console.log(response.data);
        userDiv.innerHTML = response.data.firstName + " " + response.data.lastName;
        
        let extra: HTMLLIElement = <HTMLLIElement>document.getElementById("extra");

        if (response.data.typeOfUser === "S") {
            extra.hidden = false;
            typeDiv.innerHTML = "scientist";
        }
        else{
            extra.hidden = true;
            typeDiv.innerHTML = "user";
        }

    })
    .catch(function (error: AxiosError): void {
        console.log(error);
    });

//Health chart
google.charts.load('current', { packages: ['corechart', 'line'] });
google.charts.setOnLoadCallback(healthDataChart);

//userId in the header
function userIdOutput(): void {
    var itemID = JSON.parse(localStorage.getItem('id'));
    let typeOfUser: HTMLOutputElement = <HTMLOutputElement>document.getElementById("typeOfUser");
    let firstName: HTMLOutputElement = <HTMLOutputElement>document.getElementById("firstName");
    let lastName: HTMLOutputElement = <HTMLOutputElement>document.getElementById("lastName");

    let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/users/" + itemID + typeOfUser + ": " + firstName + " " + lastName;
    axios.get<IUserId>(uri)
        .then(function (response: AxiosResponse<IUserId[]>): void {
            console.log(response);
        })
    let userIdOutput: HTMLOutputElement = <HTMLOutputElement>document.getElementById("userIdOutput");

    axios.catch(function (error: AxiosError): void {
        if (error.response) {
            userIdOutput.innerHTML = error;
        }
        else { userIdOutput.innerHTML = error; }
    });
}




/*userDiv.innerHTML = userData.userName.toString();
userDiv.innerHTML = itemID.toString();*/ //Megs...
//userDiv.innerHTML = "Sth";


// end of userId in the header


function healthDataChart(): void {


    let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/users/" + itemID + "/health";

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
                    titleColor: 'black',
                    textStyle: {
                        color: 'black',
                        fontSize: 16,
                        italic: true,
                        bold: true
                    }
                },
                vAxis: {
                    title: 'Health',
                    titleColor: 'black',
                    textStyle: {
                        color: 'black',
                        fontSize: 16,
                        italic: true,
                        bold: true
                    }
                },
                titleTextStyle: {
                    color: 'black',
                    fontSize: 16,
                    italic: true,
                    bold: true
                },
                backgroundColor: 'transparent',
                curveType: 'none',
                lineWidth: 3,
                dataColor: 'black',
                legendTextStyle: { color: 'black', italic: true }
            };

            var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
            chart.draw(data, options);
        })


    // GET that displays the data in a table whose rows/records can be selected
    let healthDataOutput: HTMLOutputElement = <HTMLOutputElement>document.getElementById("healthDataOutput");

    axios.get<IHealth[]>(uri)
        .then(function (response: AxiosResponse<IHealth[]>): void {
            addToDOM(response)
        })
        .catch(function (error: AxiosError): void {
            if (error.response) {
                healthDataOutput.innerHTML = error;
            }
            else { healthDataOutput.innerHTML = error; }
        })

    function addToDOM(response: AxiosResponse<IHealth[]>): void {
        let tElement: HTMLTableElement = document.createElement<"table">("table");
        healthDataOutput.appendChild(tElement)

        let trElement: HTMLTableRowElement = document.createElement<"tr">("tr");

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

            //let userDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("userIdOutput");
            //let userData : IUser;
            //var itemID = JSON.parse(localStorage.getItem('id'));
            //let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/users/" + itemID;
            //userDiv.innerHTML = userHealthData.userId.toString();
            // userIdOutput



            let tr2Element: HTMLTableRowElement = document.createElement<"tr">("tr");

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
                    deleteHealthRecord(userHealthData.id);
                });
                tr2Element.style.backgroundColor = "lightslategray";
            });
        });
    }

    // Variables and method for Update    
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
                alert("The health record has been successfully updated!");
                refreshPage();
            })
            .catch(function (error: AxiosError): void {
                if (error.response) {
                    changeHealthDataOutput.innerHTML = error;
                }
                else { changeHealthDataOutput.innerHTML = error; }
            })
    }

    // Variables and method for Add
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
        let uII: number = itemID;
        let myDate: Date = new Date();
        let hours: number = myDate.getHours();
        let dTII: Date = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate(), (hours + 1), myDate.getMinutes(), myDate.getSeconds());
        let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/health";
        axios.post<IHealth>(uri, { bloodPressureUpper: bPUI, bloodPressureDown: bPDI, heartRate: hRI, temperature: tI, userId: uII, dateTimeInfo: dTII })
            .then((response: AxiosResponse) => {
                alert("The health data record has beeen successfully added!");
                refreshPage();
            })
            .catch(function (error: AxiosError): void {
                if (error.response) {
                    addHealthDataOutput.innerHTML = error;
                }
                else { addHealthDataOutput.innerHTML = error; }
            })
    }

    // Method used in Add, Update and Delete that refreshes the data
    function refreshPage() {
        window.location.reload();
    }

    // Variables and method for Delete    
    let deleteButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("deletebutton");
    let delHealthDataOutput: HTMLDivElement = <HTMLDivElement>document.getElementById("delHealthDataOutput");

    function deleteHealthRecord(id: number): void {
        let deleteUri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/health/" + id;
        console.log("DELETE " + deleteUri);
        axios.delete<IHealth>(deleteUri)
            .then(function (response: AxiosResponse<IHealth>): void {
                console.log(JSON.stringify(response));
                alert("The record was successfully removed!");
                refreshPage();
            })
            .catch(function (error: AxiosError): void {
                if (error.response) {
                    delHealthDataOutput.innerHTML = error;
                }
                else { delHealthDataOutput.innerHTML = error; }
            })
    }

}