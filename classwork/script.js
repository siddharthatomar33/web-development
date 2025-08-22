const countvalue=document.querySelector('#counter');

const increment= () => {
    //get the value from the UI
    let value= parseInt(countvalue.innerText);
    //update the value
    value=value+1;
    //set the value back to UI
    countvalue.innerText=value;
};

const decrement= () => {
    let value= parseInt(countvalue.innerText);
    //update the value
    value=value-1;
    //set the value back to UI
    countvalue.innerText=value;
};