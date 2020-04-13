import * as Constants from "../constants"

export const SetFlipStatus = (flipStatus) => ({type: Constants.SetFlipStatusActionType, payload: flipStatus});

export const ChangeAutoPlay = (autoPlayStatus) => ({type: Constants.AutoPlayChangedActionType, payload: autoPlayStatus});

export const ChangeCategory = (category) => ({type: Constants.ChangeCategoryActionType, payload: category});