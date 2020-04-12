import alphabetArray from '../data/alphabet.js'

export const getIdForLetter = (inputKey) => {

    let result;
    let inputKeyStr = String(inputKey);

    if(!isLetter(inputKeyStr)){
        result = null;
    }

    const ele = alphabetArray.find(alphabet => alphabet.letter === inputKeyStr.toUpperCase());

    if(ele === undefined){
        result = null;
    }
    else {
        result = ele.id;
    }

    return result;
}

function isLetter(str) {
    return str.match(/[a-z]/i);
  }