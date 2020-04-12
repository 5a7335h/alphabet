import * as Constants from '../constants.js';
import * as Actions from '../actions/index.js';
import {take, put, all, takeLatest} from 'redux-saga/effects'
import * as Sides from '../data/sides.js'
import {eventChannel, buffers, END} from 'redux-saga'

export default function* rootSaga()
{   
    yield all([autoPlayStatusWatcher()]);
}

function* autoPlayStatusWatcher(){
    yield takeLatest(Constants.AutoPlayChangedActionType, handleAutoplayChange)
}

function* handleAutoplayChange(action){
    let channel = generateFlipCardsEventsStream();
    while(true)
    {
        const indexOfCardToFlip = yield take(channel);
        yield put(Actions.SetFlipStatus({ id: indexOfCardToFlip, side: Sides.imageSide }))
    }
}

function generateFlipCardsEventsStream() {

    let flipIndex = 0;
    const autoPlayIntervalInSeconds = 3;

    return eventChannel(
        emitter => {
          const iv = setInterval(() => {
            flipIndex += 1

          if (flipIndex <= Constants.AlphabetCount) {
            emitter(flipIndex)
          } else {
            emitter(END)
          }

        }, autoPlayIntervalInSeconds*1000);
        return () => {
          clearInterval(iv)
        }
      }, buffers.fixed(Constants.AlphabetCount)
    )
  }