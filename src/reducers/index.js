import * as Constants from "../constants.js"
import alphabetArray from "../data/alphabet.js"
import {combineReducers} from 'redux';

const initialState = alphabetArray;

export function alphabetEventReducer( state = initialState, action){
    switch(action.type){
        case Constants.SetFlipStatusActionType:
            return mergeFlipArray(state, action.payload);
        default:
            return state;
    }
}

function mergeFlipArray(state, flipUpdate){
    const updatedAlphabetArray = state.map( alphabet => alphabet.id === flipUpdate.id ? {...alphabet, side: flipUpdate.side} : alphabet );
    return updatedAlphabetArray;
}

export const rootReducer = combineReducers({
    alphabet : alphabetEventReducer
}); 
