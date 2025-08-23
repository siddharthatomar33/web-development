const inputSlider=document.querySelector("[data-lengthSlider]");//custom attribute ko use karne ke liye
const lengthDisplay=document.querySelector("[data-lengthNumber]");

const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copybtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copyMsg]");
const uppercasecheck=document.querySelector("#uppercase");
const lowercasecheck=document.querySelector("#lowercase");
const numberCheck=document.querySelector("#numbers");
const symbolsCheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generator=document.querySelector(".generatorButton");
const allcheckbox=document.querySelectorAll("input[type=checkbox]");
const symbols=' ~!@#$%^&*()_+=-;\,./<>?||":{}</>';

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
    const randNUM=getRndInteger(0,symbols.length);
    return symbols.charAt(randNUM);
}
//checked true/false
function calcstrength(){

    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if ((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >= 6) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}

//copy content
async function copyContent() {
    try{
    //clipboard ke upper write krta hai
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText="copied";//capied display hoga
    }
    catch(e){
        copyMsg.innerText="failed";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000)
}

function handleCheckboxChange() {
    checkCount=0;
    allcheckbox.forEach((checkbox)=>{
        checkCount++;   //count krlia ki kitne checked hai
    })

    //special condition
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}



allcheckbox.forEach((checkbox)=>{
checkbox.addEventListener('change',handleCheckboxChange)
})

//slider ka event
inputSlider.addEventListener('input',(e) => {
    passwordlength=e.target.value;
    handleSlider();
})

copybtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
        copyContent();
})

//generate pwd
generatebtn.addEventListener('click',()=>{
    
});