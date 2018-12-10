import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios";

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

// GET that displays the environmental data in a chart
google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(envDataChart);

var itemID = JSON.parse(localStorage.getItem('id'));

function envDataChart(): void {
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
            titleColor: 'black',
            textStyle: {
              color: 'black',
              fontSize: 16,
              italic: true,
              bold: true
            }
          },
          vAxis: {
            title: 'Environment', 
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
          curveLine: 'none',
          lineWidth: 3,
          legendTextStyle: {color: 'black', italic: true}
        };
        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
        chart.draw(data, options);
    })

    // GET that displays the environmental data in a simple table 
    let envOutput: HTMLDivElement = <HTMLDivElement>document.getElementById("envOutput");

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