import { sides, regexVars } from "./doMath"

const regexParentheses = /[\+\-]?\s*\d*\(.+\)/;
const regexVariables = /(\d+[A-z]{1,1}|\s*\s?[a-z])/ig;
const regexMultiVars = /\d+[A-z]{1,1}/;
const regexNonvariables = /(^\s*\d+|[\+\-]\s*\d+)[^a-z]/;
const regexNonvariables2 = /(^\s*\d+|[\+\-]\s*\d+)/ig;
const regexAvoidBlankSpaces = /\d+\s+[a-z]/ig;
const regexMultipliedBySign = /^[\+\-]?\s*$/;
let result, variables, nonVariables, multiplication

const solveRegex = (regExp, str) => {
    if(regexMultiVars.test(str)){
        str = "(" + str;
    }
    return [...str.match(regExp)]
}

const pullApart = (betweenParentheses) => {
    variables = solveRegex(regexVariables, betweenParentheses)
    nonVariables = (regexNonvariables.test(betweenParentheses)) ? nonVariables = solveRegex(regexNonvariables2, betweenParentheses) : [];

    // console.log(variables)
    // console.log(nonVariables)
    // console.log("__________")
}

const resolveMultiVars = (item, multiplier) => {
    let usedVar = item.match(regexVars)
    item = item.replace(regexVars, "")
    result = result + "+ " + eval(`${multiplier} * ${item}`) + `${usedVar}`;
}

const concatenation = (multiplier, array, marker) => {
    array = array.map(item => {
        if(marker && regexMultiVars.test(item)){
            resolveMultiVars(item, multiplier)
        }else if(marker){
            result = `${result}${multiplier}${item}`
        }else{
            multiplication = eval(`${multiplier} * ${item}`)
            if(!/[\-\+]/.test(multiplication)){
                multiplication = `+ ${multiplication}`
            }

            result = `${result} ${multiplication}`
        }
    })
}

const replaceBlanks = () => {
    let matches = [...result.match(regexAvoidBlankSpaces)]
    
    matches.map(match => {
        result = result.replace(match, () => {
            return match.replace(" ", "")
        })
    })
}

const avoidBlanks = () => {
    if(regexAvoidBlankSpaces.test(result)){
        replaceBlanks()
    }
}

const obtainResult = (multiplier) => {
    concatenation(multiplier, variables, true)
    concatenation(multiplier, nonVariables, false)

    avoidBlanks()
}

const solveSide = (side) => {
    let splitter = side.split("(")
    let multiplier = regexMultipliedBySign.test(splitter[0]) ? splitter[0].replace(/$/, "1") : splitter[0]
    let multiplied = splitter[1]

    pullApart(multiplied)
    obtainResult(multiplier)
}

const loseParentheses = (side) => {
    if(regexParentheses.test(sides[side])){
        return sides[side].replace(regexParentheses, e => {
            result = ""
            solveSide(e)
            return result
        })
    }

    return sides[side]
}

export default loseParentheses