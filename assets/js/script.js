class Calculator{
    constructor(prevOpTextElement, currOpTextElement){
        this.prevOpTextElement = prevOpTextElement
        this.currOpTextElement = currOpTextElement

        this.clear() //clr all inputs and set all to default 
    }

    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNum(number){
        if(number==='.' && this.currentOperand.includes('.')) return
        //this.currentOperand += number

        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(inputOperation){
        //to stop continuing even if the curr operand is empty 
        if(this.currentOperand==='') return

        //if a previous operand exists compute it
        if(this.previousOperand!== ''){
            this.compute()
        }


       this.operation = inputOperation
       this.previousOperand = this.currentOperand
       this.currentOperand = ''
    }

    compute(){
        let result
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)

        //if user doesn't enter anything and click equal, do nothing
        if(isNaN(prev) || isNaN(current)) return

        switch(this.operation){
            case '+':
                result = prev + current
                break

            case '-':
                result = prev - current
                break

            case '*':
                result = prev * current
                break

            case '/':
                result = prev / current
                break

            default: 
                return
        }

        this.currentOperand = result
        this.operation = undefined
        this.previousOperand = ''
    }

    updateDisplay(){
        this.currOpTextElement.innerText = this.currentOperand

        if(this.operation != null){
            this.prevOpTextElement.innerText = `${this.previousOperand} ${this.operation}`
        } else{
            this.prevOpTextElement.innerText = ''
        }
       
    }

}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const delButton = document.querySelector('[data-delete]')
const allClrButton = document.querySelector('[data-all-clear]')
const  prevOpTextElement= document.querySelector('[data-prev-op]')
const  currOpTextElement= document.querySelector('[data-curr-op]')

const calculator = new Calculator(prevOpTextElement,currOpTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText)
        calculator.updateDisplay()
    })
})


operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClrButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

delButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})