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
google.charts.setOnLoadCallback(envDataChart);

function envDataChart(): void {
    var regex = /[?&]([^=#]+)=([^&#]*)/g,
    url = window.location.href;
    var params: any = {},
    match;
    while(match = regex.exec(url)) {
        params[match[1]] = match[2];
    }

    let uri: string = "https://thebertharestconsumer20181031102055.azurewebsites.net/api/users/" + params.id + "/environment";

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
        }