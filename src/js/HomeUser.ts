let myFrame: HTMLFrameElement = <HTMLFrameElement>document.getElementById("myFrame");
let healthButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("healthButton");
let envirnmentButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("environmentButton");

var itemID = JSON.parse(localStorage.getItem('id'));

function getHealth(): void {

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
<<<<<<< HEAD
=======
>>>>>>> 4a658e1b6280a57fd125fad764f737fe4bbb3a6e
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
<<<<<<< HEAD
=======
>>>>>>> 791c05fd6f33096f427c4b6f3c9d9ad7d3186db0
=======
>>>>>>> 4a658e1b6280a57fd125fad764f737fe4bbb3a6e
