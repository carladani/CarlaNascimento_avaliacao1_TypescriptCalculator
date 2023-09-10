class Calculator {
    static previousValue: string;
    static operator: string | null = null;
    static waitingForSecondOperand: boolean = false;
    static decimalEntered: boolean = false;

    static buttons = document.querySelectorAll(".tecla");
    static display = document.getElementById("display") as HTMLSpanElement;

    static displayValue: string = "0";

    static updateDisplay = () => {
        this.display.textContent = this.displayValue;
    };

    static inputDisplay = (digit: string) => {
        if (this.displayValue.length >= 8) {
            return; // Limite máximo de 8 dígitos
        }

        if (!Number.isNaN(parseInt(digit))) {

            if (this.displayValue === "0")
                this.displayValue = "";
            this.displayValue += digit;

            this.updateDisplay();
        }
        else {
            if (this.operator == null) {
                console.log(this.operator)
                this.operator = digit;
                this.previousValue = this.displayValue;
                this.displayValue = "";
            }
            else this.performOperation(digit);
        }
    };

    static start = () => {
        this.buttons.forEach((button) => {
            button.addEventListener("click", () => {
                const buttonText = button.getAttribute("id");

                this.inputDisplay(buttonText!);
            });
        });
    };

    static performOperation = (nextOperator: string) => {
        var result= null
        const inputValue = parseFloat(this.displayValue);

        switch (this.operator) {
            case "mais":
                result= parseFloat(this.previousValue)+inputValue
               this.displayValue=result.toString()
               this.updateDisplay();
                break; 
            case "menos":
                 result= parseFloat(this.previousValue)-inputValue
               this.displayValue=result.toString()
               this.updateDisplay();
                break;
            case "por":
                result= parseFloat(this.previousValue)*inputValue
               this.displayValue=result.toString()
               this.updateDisplay();
                break;
            case "dividido":
                if(inputValue!=0){
                result= parseFloat(this.previousValue)/inputValue
               this.displayValue=result.toString()
               this.updateDisplay();}
               else {
                this.displayValue= "ERROR"
                this.updateDisplay();}
               
            default:
                break;
        };
    };
};
Calculator.start();