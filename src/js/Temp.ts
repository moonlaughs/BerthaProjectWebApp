import axios, {
  AxiosResponse,
  AxiosError
} from "../../node_modules/axios";

interface ITemp {
  id: number;
  temp: number;
  dt: Date;
}

google.charts.load('current', { packages: ['corechart', 'line'] });
google.charts.setOnLoadCallback(tempDataChart);

function tempDataChart(): void {
  let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/Temperature";

  axios.get<ITemp[]>(uri)
    .then(function (response: AxiosResponse<ITemp[]>): void {
      console.log(response);
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'X');
      data.addColumn('number', 'temp');

      response.data.sort((a: ITemp, b: ITemp) => {
        return new Date(Date.parse(a.dt.toString())).getTime() - new Date(Date.parse(b.dt.toString())).getTime();
      });

      var newarr = [response.data[0]];
      for (var i = 1; i < response.data.length; i++) {
        if (response.data[i].dt.toString().split('T')[0] != response.data[i - 1].dt.toString().split('T')[0]) {
          newarr.push(response.data[i]);
        }
      }

      newarr.forEach((temp: ITemp) => {
        data.addRows([
            [temp.dt.toString().split('T')[2], temp.temp]
          ]);
        
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
              legendTextStyle: {color: 'black', italic: true}
        };
  
        var chart = new google.visualization.LineChart(document.getElementById("curve-Chart"));
            chart.draw(data, options);
    }); 
    })
}



let outPut: HTMLOutputElement = <HTMLOutputElement> document.getElementById("outPut");

let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/Temperature";


axios.get<ITemp>(uri)
           .then(function(response:AxiosResponse<ITemp[]>): void {
              let result: string = "<table><tr><th>Id</th><th>Temperature</th><th>Date</th>" 
                response.data.forEach((temp: ITemp) => {
              result += "<tr><td>" + temp.id + "</td><td>" + temp.temp + "</td><td>" + temp.dt + "</td>";
            });
        result += "</table>"
        outPut.innerHTML = result;
        })
        .catch (function (error: AxiosError): void {
           if (error.response) {
               outPut.innerHTML = error;}
           else {outPut.innerHTML = error;}
        })

