let zeroComprobation, returnNum1, returnNum2, decimal, dividers = [10, 7, 5, 3, 2]
const regexNegativeSign = /\-/

const divisibleBy = (num) => {
    if(returnNum1 % num === 0 && returnNum2 % num === 0){
        return true
    }else{
        return false
    }
}

const divideBy = (num) => {
    returnNum1 /= num
    returnNum2 /= num
}

const reduce = () => {
    for(let value of dividers){
        if(divisibleBy(value)){
            divideBy(value)
            return true
        }
    }

    return false
}

const reduceLoop = () => {
    if(reduce()){
        reduceLoop()
    }
}

const isThereAZero = (num1, num2) => {
    switch(eval(num1 / num2)){
        case 0:
            return `Zero divided by something is zero`
        break;
        case Infinity:
            return `undefined`
        break;
        default:
            return false
        break;
    }
}

const negTest = (num) => {
    if(regexNegativeSign.test(num)){
        return true
    }

    return false
}

const negPop = () => {
    returnNum1 = String(returnNum1).replace(regexNegativeSign, "")
    returnNum2 = String(returnNum2).replace(regexNegativeSign, "")
}

const loseNegativeSign = () => {
    if(negTest(returnNum1) && negTest(returnNum2)){
        negPop()
    }
}

const getDecimal = () => {
    decimal = Math.round(eval(returnNum1 / returnNum2) * 100)
    decimal /= 100
}

const nonZero = (num1, num2) => {
    returnNum1 = num1
    returnNum2 = num2
    reduceLoop()
    loseNegativeSign()
    getDecimal()
}

const countDecimals = (param) => {
    let flag
    flag = /\./i.test(param)
    if(flag){
        let arr = param.split(".");
        if( arr[1].length >= 4 ){
            return true
        }
    }

    return false
}

const countingDecimals = () => {
    let flag = countDecimals( String(returnNum1) )
    let flag2 = countDecimals( String(returnNum2) )

    if( flag || flag2 ){
        return true
    }

    return false
}

const reduceToMinimum = (num1, num2) => {
    zeroComprobation = isThereAZero(num1, num2)

    if(zeroComprobation){
        return zeroComprobation
    }else{
        nonZero(num1, num2)
        if( countingDecimals() ){
            return decimal;
        }else{
            return `<div class="results-fraction"><p>${returnNum1}</p><hr /><p>${returnNum2}</p></div> <span>or</span> ${decimal}`
        }
    }
}

export default reduceToMinimum