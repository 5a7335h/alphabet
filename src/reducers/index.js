import * as Constants from "../constants.js"
import alphabetArray from "../data/alphabet.js"
import {combineReducers} from 'redux';

const initialState = {
    alphabetArray,
    category: 'random'
};

export function alphabetEventReducer( state = initialState, action){
    switch(action.type){
        case Constants.SetFlipStatusActionType:
            return mergeFlipArray(state, action.payload);
        case Constants.ChangeCategoryActionType:
            return {...state, category: action.payload};
        default:
            return state;
    }
}

function mergeFlipArray(state, flipUpdate){
    const updatedAlphabetArray = state.map( alphabet => alphabet.id === flipUpdate.id ? {...alphabet, side: flipUpdate.side} : alphabet );
    return updatedAlphabetArray;
}

export const rootReducer = combineReducers({
    alphabetState : alphabetEventReducer
}); 
