let myFrame: HTMLFrameElement = <HTMLFrameElement>document.getElementById("myFrame");
let healthButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("healthButton");
let envirnmentButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("environmentButton");

//healthButton.addEventListener("click", getHealth);
//envirnmentButton.addEventListener("click", getEnvironment);

var itemID = JSON.parse(localStorage.getItem('id'));

function getHealth(): void {

    /*var regex = /[?&]([^=#]+)=([^&#]*)/g,
            url = window.location.href;
        var params: any = {},
            match;
        while (match = regex.exec(url)) {
            params[match[1]] = match[2];*/
        


        let uri: string = "HealthUser.html?id=" + itemID;
        myFrame.src = uri;
}}

function getEnvironment(): void {

    var regex = /[?&]([^=#]+)=([^&#]*)/g,
            url = window.location.href;
        var params: any = {},
            match;
        while (match = regex.exec(url)) {
            params[match[1]] = match[2];
        


        let myuri: string = "EnvironmentUser.html?id=" + params.id;
        let uri: string = "EnvironmentPage.html?id=" + params.id;
        myFrame.src = uri;
}}

<<<<<<< HEAD
function getAccount(): void {

    var regex = /[?&]([^=#]+)=([^&#]*)/g,
            url = window.location.href;
        var params: any = {},
            match;
        while (match = regex.exec(url)) {
            params[match[1]] = match[2];
        


        let uri: string = "MyAccount.html?id=" + params.id;
        myFrame.src = uri;
}}
=======
>>>>>>> 791c05fd6f33096f427c4b6f3c9d9ad7d3186db0
