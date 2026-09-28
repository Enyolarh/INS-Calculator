// =========================================
// ENIK'S BAKES SCIENTIFIC CALCULATOR
// Developed by Latifah Abdulghaffar
// =========================================

// Display
const display = document.getElementById("display");
const expression = document.getElementById("expression");

// History
const historyPanel = document.getElementById("historyPanel");
const historyList = document.getElementById("historyList");

// Buttons
const historyBtn = document.getElementById("historyBtn");
const copyBtn = document.getElementById("copyBtn");
const themeBtn = document.getElementById("themeBtn");

// Calculator Variables
let memory = 0;
let angleMode = "DEG";
let history = JSON.parse(localStorage.getItem("history")) || [];

// ==============================
// DISPLAY FUNCTIONS
// ==============================

function appendValue(value){
    display.value += value;
}

function clearDisplay(){
    display.value = "";
    expression.innerHTML = "";
}

function deleteLast(){
    display.value = display.value.slice(0,-1);
}

// ==============================
// CALCULATE
// ==============================


function calculate(){

try{

let exp = display.value;

exp = exp.replace(/π/g,Math.PI);

exp = exp.replace(/e/g,Math.E);

let result = eval(exp);

if(result===Infinity){

throw "Error";

}

expression.innerHTML=display.value;

display.value=result;

addHistory(exp,result);

}

catch{

display.value="Invalid Expression";

}

}
// ==============================
// HISTORY
// ==============================

function addHistory(exp,result){

    history.unshift(exp + " = " + result);

    if(history.length > 20){

        history.pop();

    }

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );

    showHistory();

}

function showHistory(){

    historyList.innerHTML = "";

    history.forEach(item=>{

        const li = document.createElement("li");

        li.innerHTML = item;

        li.onclick=function(){

            display.value=item.split("=")[1].trim();

        }

        historyList.appendChild(li);

    });

}

showHistory();

historyBtn.onclick=function(){

    if(historyPanel.style.display==="block"){

        historyPanel.style.display="none";

    }

    else{

        historyPanel.style.display="block";

    }

}

function clearHistory(){

    history=[];

    localStorage.removeItem("history");

    showHistory();

}
// ==============================
// SCIENTIFIC FUNCTIONS
// ==============================

// Angle mode toggle
const angleModeText = document.getElementById("angleMode");

function toggleAngleMode(){

    if(angleMode === "DEG"){

        angleMode = "RAD";

    }else{

        angleMode = "DEG";

    }

    angleModeText.innerHTML = angleMode;

}

// Convert degree to radian

function toRadians(value){

    if(angleMode === "DEG"){

        return value * (Math.PI / 180);

    }

    return value;

}

// sin

function sin(){

    display.value = Math.sin(
        toRadians(Number(display.value))
    );

}

// cos

function cos(){

    display.value = Math.cos(
        toRadians(Number(display.value))
    );

}

// tan

function tan(){

    display.value = Math.tan(
        toRadians(Number(display.value))
    );

}

// Square Root

function squareRoot(){

    display.value = Math.sqrt(
        Number(display.value)
    );

}

// Square

function square(){

    let num = Number(display.value);

    display.value = num * num;

}

// Cube

function cube(){

    let num = Number(display.value);

    display.value = num * num * num;

}

// Log Base 10

function log10(){

    display.value = Math.log10(
        Number(display.value)
    );

}

// Natural Log

function naturalLog(){

    display.value = Math.log(
        Number(display.value)
    );

}

// Factorial

function factorial(){

    let n = Number(display.value);

    if(n < 0){

        display.value = "Error";

        return;

    }

    let answer = 1;

    for(let i = 2; i <= n; i++){

        answer *= i;

    }

    display.value = answer;

}
// ==============================
// MEMORY FUNCTIONS
// ==============================

const memoryIndicator =
document.getElementById("memoryIndicator");

// Store

function memoryStore(){

    memory = Number(display.value);

    memoryIndicator.style.visibility = "visible";

}

// Recall

function memoryRecall(){

    display.value = memory;

}

// Clear

function memoryClear(){

    memory = 0;

    memoryIndicator.style.visibility = "hidden";

}

// Add

function memoryAdd(){

    memory += Number(display.value);

}

// Subtract

function memorySubtract(){

    memory -= Number(display.value);

}
// ==============================
// COPY RESULT
// ==============================

copyBtn.onclick = function(){

    navigator.clipboard.writeText(display.value);

    alert("Result copied!");

}
// ==============================
// THEME
// ==============================

themeBtn.onclick = function(){

    document.body.classList.toggle("dark");

}
// ==============================
// KEYBOARD
// ==============================

document.addEventListener("keydown", function(e){

    if(!isNaN(e.key) || "+-*/().".includes(e.key)){

        appendValue(e.key);

    }

    if(e.key === "Enter"){

        e.preventDefault();

        calculate();

    }

    if(e.key === "Backspace"){

        deleteLast();

    }

    if(e.key === "Escape"){

        clearDisplay();

    }

});
const clickSound = new Audio("assets/click.mp3");

document.querySelectorAll("button").forEach(button=>{

button.addEventListener("click",()=>{

clickSound.currentTime=0;

clickSound.play();

});

});

window.onload=function(){

setTimeout(()=>{

document.getElementById("splash").style.display="none";

},2500);

}
let secret="";

document.addEventListener("keydown",function(e){

secret+=e.key;

if(secret.includes("cake")){

alert("🧁 Thank you for supporting Enik's Bakes!");

secret="";

}

});