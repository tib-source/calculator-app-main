// Code for the calculator

const result = document.querySelector(".result")
const buttons = document.querySelectorAll("button")
let operators = {"add":"+", "minus":"-", "divide":"/", "multiply":"*"}

let operatorUsed = false
let firstNumber = ""
let operator = ""
let secondNumber = ""

buttons.forEach((element,index)=>{
    element.addEventListener("click", ()=>{
        if(checkSpecial(element)){
            return evaluateSpecial(element)
        }else if(checkOperator(element)){
            if(operatorUsed){operator = ""}
            operator += operators[element.id]
            operatorUsed = true
            if(firstNumber==""){firstNumber="0"}
            return updateResult()
            
        }
        if(operatorUsed){
            secondNumber += element.innerText
            return updateResult()
            
        }else{
            firstNumber += element.innerText
            return updateResult()
        }
    })
})


function checkOperator(element){
    return Object.keys(operators).includes(element.id)
}


function checkDot(element){
    return element.id == "dot"
}


function updateResult(){
    result.textContent = firstNumber + " " +  operator + " " + secondNumber
    if (result.textContent.split("").length>11){
        result.style.font_size="1rem"
    }
}


function checkSpecial(element){
    let classes = ["weird", "two"]
    let count = 0
    classes.forEach(name=>{
        if (element.classList.contains(name)){
            count += 1
        }
    })
    return (!count == 0)
}

function reset(){
    operatorUsed = false
    firstNumber = ""
    operator = ""
    secondNumber = ""
}

function evaluateSpecial(element){
    let special = element.textContent
    switch(special){
        case "=":
            let final = eval(result.textContent)
            result.textContent = final
            reset()
            firstNumber = final
            updateResult()
            break
        case "RESET":
            reset()
            result.textContent = ""
            updateResult()

            break
        case "DEL":
            let text = result.textContent.split(" ").filter(Boolean)
            let deleted;
            console.log(text, "main")

            if(text.length==1){
                console.log(text)
                deleted = text[0].split("")
                console.log(deleted)
                deleted.pop()
                firstNumber = deleted.join("")
                updateResult()
            }else if(text.length==3){
                deleted = text[2].split("")
                console.log(deleted, 3)
                deleted.pop()
                secondNumber = deleted.join("")
                updateResult()
            }else if(text.length==2){
                console.log(deleted, 2)
                deleted = text[1].split("")
                let done = deleted.pop()
                if(Object.values(operators).includes(done)){
                    firstNumber.trim()
                    operator = ""
                    secondNumber = ""
                    updateResult()
                }
            }
            break
    }
}




// Changing themes
// const result = document.getElementById("result")
// const buttons = document.querySelectorAll("button")
let weird = document.querySelectorAll(".weird")
let special = document.querySelector("#equal")
let calculator = document.querySelector(".calculator")
let slider = document.querySelector(".slider")
let body = document.querySelector("body")
let numbers = document.querySelector(".numbers")


let previousTheme = ""


let radio = document.querySelectorAll("input[type=radio]")
updateTheme("theme1", true)
radio.forEach(toggle=>{
    toggle.addEventListener("click", ()=>{
        if(toggle.checked){
        let theme = "theme"
        theme += toggle.value
        updateTheme(theme)
        }
    })
})

function cleanClasses(){
    result.className = "result"
    buttons.forEach(button=> {
        let arr = button.classList
        if (arr.contains("opeator")){
            return button.classList = ["operator"]
        }else if (arr.contains("two")){
            button.classList.remove(...short(previousTheme, "equals"))
            return button.classList.remove(...short(previousTheme, "worded"))
        }else if(arr.contains("weird")){
            return button.classList = ["weird"]            
        }else{
            return button.classList = []
        }
    })
    calculator.className = "calculator"
    slider.className = "slider"
    body.className = ""
    numbers.className = "numbers"
}

function short(theme, text="none"){
    if(text == "none"){
        return `${theme}`
    }else{
        return [`${theme}`,`${theme}-${text}`]
    }
}


function updateTheme(curr, first=false){
    if (!first){
        cleanClasses()
    }
    body.classList.add(...short(curr,"main"))
    calculator.classList.add(...short(curr, "text"))
    numbers.classList.add(...short(curr, "toggle"))
    slider.classList.add(...short(curr, "toggle"))
    result.classList.add(...short(curr,"screen"))
    special.classList.add(...short(curr,"equals"))
    buttons.forEach(button=>{
        if(button.value == ""){
            button.classList.add(...short(curr, "key"))
        }else{
            console.log(button.classList.contains("hello"), "meow")
        }
    })
    weird.forEach(elem => elem.classList.add(...short(curr, "worded")))
    previousTheme = curr
}
