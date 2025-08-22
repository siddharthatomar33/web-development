const countvalue=document.querySelector('#counter');

const increment=()=>{
    //get the value from the UI
    let value= parseInt(countvalue.innertext);
    value=value+1;
    countvalue.innertext=value;
};
const decrement=()=>{

}