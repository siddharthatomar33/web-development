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
const generatebtn = document.querySelector(".generatorButton");
const allcheckbox=document.querySelectorAll("input[type=checkbox]");
const symbols = '~!@#$%^&*()_+=-{}[]:;<>,.?/';

//initailly_______
let password="";
let passwordLength=10;
let checkCount=0;

handleSlider();
//set strength circle to grey

//set pwd length
function handleSlider(){
    //handleSlider UI may display ka kaam karega
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
}

function setIndicator(color){
    indicator.style.backgroundColor=color;
    //shadow
}

//to get a random integer in range
function getRndInteger(min,max){
   return Math.floor(Math.random()*(max-min)) +min;
}

//to get random no. between 0-9
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

//checked true/false.
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
    copyMsg.innerText="copied";//copied display hoga
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

function shufflePassword(array){
        //fisher yates method
        for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        }

        let str = "";
        array.forEach((el) => (str += el));
        return str;
    }

function handleCheckboxChange() {
    checkCount=0;
    allcheckbox.forEach((checkbox)=>{
        if(checkbox.checked)
            checkCount++;   //count krlia ki kitne checked hai
    });

    //special condition// agaar password ki length kam hai checked count se toh,password length ko = checked count ke
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}

allcheckbox.forEach((checkbox)=>{
checkbox.addEventListener('change',handleCheckboxChange)
})

//slider ka event
inputSlider.addEventListener('input',(e) => {//eventlistner
    passwordLength=e.target.value;
    handleSlider();
})

copybtn.addEventListener('click',()=>{//eventlistner
    if(passwordDisplay.value)
        copyContent();
})

//generate pwd
generatebtn.addEventListener('click',()=>{
    //none of the checkbox are selected
    if(checkCount==0) return;//koi bhi checkbox check nhi hai toh pwd generate nhi hoga

    if(passwordLength < checkCount){//pwd chota h checkbox click se
        passwordLength=checkCount;//toh same count ka pwd banadia
        handleSlider();
    }

    //new password journey
    console.log("Sarting the journey");
    //remove old pwd
    password="";

    //lets put the stuff mentioned by the checkboxes
    // if(uppercasecheck.checked){
    //     password+=generateupperCase();
    // }
    // if(lowercasecheck.checked){
    //     password+=generateLowerCase();
    // }
    // if(numberCheck.checked){
    //     password+=generateRandomNumber();
    // }
    // if(symbolsCheck.checked){
    //     password+=generateSymbol();
    // }
    let funcArr=[];
    
    if(uppercasecheck.checked)
        funcArr.push(generateupperCase);
    
    if(lowercasecheck.checked)
        funcArr.push(generateLowerCase);
    
    if(numberCheck.checked)
        funcArr.push(generateRandomNumber);
    
    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);
    
    //complsory addition
    for(let i=0;i<funcArr.length;i++)
        password+=funcArr[i]();
    
    console.log("complsory addition done");

    //remaining addtion
    for(let i=0; i<passwordLength-funcArr.length;i++){
        let randIndex=getRndInteger(0,funcArr.length);
        console.log("randRndex"+randIndex);
        password += funcArr[randIndex]();
    }
    console.log("remaining addition done");

    //shuffle the pwd...
    password=shufflePassword(Array.from(password));
    console.log("shuffling done");

    //show in ui..
    passwordDisplay.value=password;
    //calculate strength...
    calcstrength();

});