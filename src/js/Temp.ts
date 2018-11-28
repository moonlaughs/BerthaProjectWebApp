import axios,{
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios";

interface ITemp{
    id : number;
    Temp: string;   //number or string?????
    DT : Date;
}

google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(tempDataChart);

function tempDataChart(): void {
    /*var regex = /[?&]([^=#]+)=([^&#]*)/g,
    url = window.location.href;
    var params: any = {},
    match;
    while(match = regex.exec(url)) {
        params[match[1]] = match[2];
    }*/

    let uri: string = "https://restservicefrombroadcast20181120110311.azurewebsites.net/api/dts";

    axios.get<ITemp>(uri)
    .then(function (response: AxiosResponse<ITemp[]>): void {
        console.log(response);
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'X');
        //data.addColumn('nmber', 'Date');
        /*data.addColumn('string', 'X');
        data.addColumn('number', 'Oxygen');
        data.addColumn('number', 'Co2');
        data.addColumn('number', 'Co');
        data.addColumn('number', 'Pm25');
        data.addColumn('number', 'Pm10');
        data.addColumn('number', 'Ozon');
        data.addColumn('number', 'Dust particles');
        data.addColumn('number', 'Nitrogen Dioxide');
        data.addColumn('number', 'Sulphur dioxide');*/
        


        response.data.sort((a: ITemp, b: ITemp) => {
            return new Date(Date.parse(a.DT.toString())).getTime() - new Date(Date.parse(b.DT.toString())).getTime();
        });
        var newarr = [response.data[0]];
        for (var i=1; i<response.data.length; i++) {
           if (response.data[i].DT.toString().split('T')[0]!=response.data[i-1].DT.toString().split('T')[0]){
            newarr.push(response.data[i]);
           }           
        }

        

        newarr.forEach((temp: ITemp) => {
            data.addRows([
                [parseInt(temp.Temp.split('-')[0])]
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
            title: 'Temperature', 
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
        var chart = new google.visualization.LineChart(document.getElementById('tempChart'));
        chart.draw(data, options);
    })
    }