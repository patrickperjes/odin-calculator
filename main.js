preValue = '';
curValue = '';
operator = '';

document.addEventListener('DOMContentLoaded', () => {
    const numbers = document.querySelectorAll('.number');
    const operators = document.querySelectorAll('.operator');

    const clearBtn = document.querySelector('#clear');
    const decimal = document.querySelector('.decimal');
    const equal = document.querySelector('.equal');

    const prevText = document.querySelector('.previous');
    const currText = document.querySelector('.current');

    numbers.forEach((number) => {
        number.addEventListener('click', (e) => {

            numberHandler(e.target.textContent);
            currText.textContent = curValue;
        })
    });

    operators.forEach((op) => {
        op.addEventListener('click', (e) => {
            operatorHandler(e.target.textContent);
            prevText.textContent = preValue + " " + operator;
            currText.textContent = curValue;
        });
    });

    equal.addEventListener('click', () => {
       if (curValue !== '' && preValue !== ''){
        calculate();

        prevText.textContent = '';
        if (curValue.length <= 9){
            currText.textContent = preValue;
            curValue = preValue;
        } else {
            currText.textContent = preValue.slice(0,9) + '...';
        }
       }
    });

    clearBtn.addEventListener('click', () => {
        clearScreen();
        currText.textContent = '';
        prevText.textContent = '';

    });

    decimal.addEventListener('click', () => {
        addDecimal();
    })
    

})

function numberHandler(num){
    if (curValue.length <= 9){
        curValue += num;
    }
}

function operatorHandler(op){
    operator = op;
    preValue = curValue;
    curValue = '';
}

function calculate(){
    preValue = Number(preValue);
    curValue = Number(curValue);
    
    if (operator === '+') {
        preValue += curValue;
    } else if (operator === '-') {
        preValue -= curValue;
    } else if (operator === 'x') {
        preValue *= curValue;
    } else {
        preValue /= curValue;
    }

    preValue = round(preValue);
    preValue = preValue.toString();
    curValue = curValue.toString();
}

function round(num){
    return Math.round(num * 1000) / 1000;
}

function clearScreen() {
    curValue = '';
    preValue = '';
}

function addDecimal(){
    if (!curValue.includes('.')){
        curValue += '.';
    }
}