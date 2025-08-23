const inputSlider=document.querySelector("[data-lengthSlider]");//custom attribute ko use karne ke liye
const lengthDisplay=document.querySelector("[data-lengthNumber]");

const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copybtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copyMsg]");
const uppercasecheck=document.querySelector("#uppercase");
const lowercasecheck=document.querySelector("#lowercase");
const numbercheck=document.querySelector("#numbers");
const symbols=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generator=document.querySelector(".generatorButton");
const allcheckbox=document.querySelectorAll("input[type=checkbox]");

let password="";
let passwordlength=10;
let checkCount=1;
handleSlider();
//set strength circle to grey

//set pwd length
function handleSlider(){
    inputSlider.value=passwordlength;
    lengthDisplay.innerText=passwordlength;
}

function setIndicator(color){
    indicator.style.backgroundColor=color;
    //shadow
}

function getRndInteger(min,max){
   return Math.floor(Math.random()*(max-min)) +min;
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode( getRndInteger(97,123));
}

function generateupperCase(){
    return String.fromCharCode( getRndInteger(65,91));
}
function generateSymbol(){
    
}