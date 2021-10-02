// Code for the calculator

const result = document.getElementById("result")
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