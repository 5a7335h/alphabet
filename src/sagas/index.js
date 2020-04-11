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
    yield takeLatest(Actions.ChangeAutoPlay, handleAutoplayChange)
}

function* handleAutoplayChange(action){
    let channel = generateFlipCardsEventsStream();
    while(true)
    {
        const indexOfCardToFlip = yield take(channel);
        yield put(Actions.SetFlipStatus({ index: indexOfCardToFlip, side: Sides.imageSide }))
    }
}

function generateFlipCardsEventsStream() {

    let remainingCardsToBeFlipped = Constants.AlphabetCount;

    return eventChannel(
        emitter => {
          const iv = setInterval(() => {
          remainingCardsToBeFlipped -= 1
          if (remainingCardsToBeFlipped > 0) {
            emitter(remainingCardsToBeFlipped) //not consuming remainingCardsToBeFlipped for now in the calling function
          } else {
            emitter(END)
          }
        }, 1000);
        return () => {
          clearInterval(iv)
        }
      }, buffers.fixed(Constants.AlphabetCount)
    )
  }