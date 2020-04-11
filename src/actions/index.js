import * as Constants from "../constants"

export const SetFlipStatus = (flipStatus) => ({type: Constants.SetFlipStatus, payload: flipStatus});

export const ChangeAutoPlay = (autoPlayStatus) => ({type: Constants.AutoPlayChanged, payload: autoPlayStatus});