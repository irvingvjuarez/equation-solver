import { sides, regexVars } from "./doMath"

const regexSlashes = /[\+\-]\s*\d+\s*[a-z]?\s*\/\s*\d+[a-z]?/;
const regexSlashesG = /[\+\-]\s*\d+\s*[a-z]?\s*\/\s*\d+[a-z]?/g;

const withSign = (str) => {
    let flag3 = /[\+\-]/.test( str )

    if( !flag3 ){
        str = `+ ${str}`
    }

    return str
}

const solveMatch = (match) => {
    let flag2 = regexVars.test( match )

    if( flag2 ){
        let tempContainer = [...match.match(regexVars)]
        match = match.replaceAll( tempContainer[0], "" )
        match = eval( String(match) )
        match = withSign(match)
        return `${ match }${tempContainer[0]}`
    }else{
        match = eval( String(match) )
        match = withSign(match)
        return match;
    }
}

const gettingRidOfSlashes = (side) => {
    let flag = regexSlashes.test(sides[side])

    if(flag){
        let matches = [...sides[side].matchAll(regexSlashesG)]
        for(let match of matches){
            sides[side] = sides[side].replace( match[0], solveMatch(match[0]) )
        }
    }

    return sides[side]
}

export default gettingRidOfSlashes;