import axios,{
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios";

interface IHealth {
    id : number;
    bloodPressureUpper : number;
    bloodPressureDown : number;
    heartRate : number;
    temperature : number;
    userId : number;
    dateTimeInfo : Date;
}

google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(healthDataChart);

    function healthDataChart(): void {
        var regex = /[?&]([^=#]+)=([^&#]*)/g,
        url = window.location.href;
        var params: any = {},
        match;
        while(match = regex.exec(url)) {
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
            for (var i=1; i<response.data.length; i++) {
               if (response.data[i].dateTimeInfo.toString().split('T')[0]!=response.data[i-1].dateTimeInfo.toString().split('T')[0]){
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
                  legendTextStyle: {color: 'white', italic: true}
            };
      
            var chart = new google.visualization.LineChart(document.getElementById('curve_Chart'));
            chart.draw(data, options);
        })

        let healthDataOutput : HTMLOutputElement = <HTMLOutputElement> document.getElementById("healthDataOutput");

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