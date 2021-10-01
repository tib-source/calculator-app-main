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
    result.textContent = firstNumber + operator + secondNumber
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
            let text = result.textContent.split(""),
            deleted = text.pop()

            if(Object.values(operators).includes(deleted)){
                reset()
                updateResult()
            }
            result.textContent = text.join("")
            break
    }
}