let myFrame: HTMLFrameElement = <HTMLFrameElement>document.getElementById("myFrame");
let healthButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("healthButton");
let envirnmentButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("environmentButton");

healthButton.addEventListener("click", getHealth);
envirnmentButton.addEventListener("click", getEnvironment);

function getHealth(): void {

    var regex = /[?&]([^=#]+)=([^&#]*)/g,
            url = window.location.href;
        var params: any = {},
            match;
        while (match = regex.exec(url)) {
            params[match[1]] = match[2];
        


        let uri: string = "HealthUser.html?id=" + params.id;
        myFrame.src = uri;
}}

function getEnvironment(): void {

    var regex = /[?&]([^=#]+)=([^&#]*)/g,
            url = window.location.href;
        var params: any = {},
            match;
        while (match = regex.exec(url)) {
            params[match[1]] = match[2];
        


        let uri: string = "EnvironmentUser.html?id=" + params.id;
        myFrame.src = uri;
}}