import axios, {
  AxiosResponse,
  AxiosError
} from "../../node_modules/axios";

interface ITemp {
  DT: Date;
  id: number;
  Temp: number;
}

google.charts.load('current', { packages: ['corechart', 'line'] });
google.charts.setOnLoadCallback(tempDataChart);

function tempDataChart(): void {
  let uri: string = "https://restservicefrombroadcast20181120110311.azurewebsites.net/api/dts";

  axios.get<ITemp>(uri)
    .then(function (response: AxiosResponse<ITemp[]>): void {
      console.log(response);
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'X');
      data.addColumn('number', 'Temp');

      response.data.sort((a: ITemp, b: ITemp) => {
        return new Date(Date.parse(a.DT.toString())).getTime() - new Date(Date.parse(b.DT.toString())).getTime();
      });

      var newarr = [response.data[0]];
      for (var i = 1; i < response.data.length; i++) {
        if (response.data[i].dateTimeInfo.toString().split('T')[0] != response.data[i - 1].dateTimeInfo.toString().split('T')[0]) {
          newarr.push(response.data[i]);
        }
      }

      newarr.forEach((temp: ITemp) => {
        data.addRows([
            [temp.DT.toString().split('T')[0], temp.Temp]
          ]);
        
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
  
        var chart = new google.visualization.LineChart(document.getElementById('curve-Chart'));
            chart.draw(data, options);
    }); 
    })
}