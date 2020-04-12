import React, { useState, useEffect } from "react";
import "./CardLatest.css";
import * as sides from "../../data/sides";
import { nameMap } from "../../data/names";
import alphabetArray from "../../data/alphabet.js"

const Card = props => {

  let [state, setState] = useState({ side: sides.alphabetSide });
  let letter = alphabetArray.find(x => x.id === props.id).letter;

  const handleClick = () => {
    try {
      if (isAlphabetSide) {
        // var msg = new SpeechSynthesisUtterance(nameMap.get(props.text));
        // msg.rate = 0.5;
        // window.speechSynthesis.speak(msg);
        window.responsiveVoice.speak(nameMap.get(props.text));
      }
    } catch (err) {
      console.log(err);
    }
    setState({
      side:
        state.side === sides.alphabetSide ? sides.imageSide : sides.alphabetSide
    });
  };

  useEffect(() => {
    if (props.side === sides.imageSide) {
      setState({ side: sides.imageSide });
      try {
        window.responsiveVoice.speak(nameMap.get(props.text));
      } catch (err) {
        console.log(err);
      }
    }
  }, [props.side]);

  const isAlphabetSide = state.side === sides.alphabetSide;

  return (
    <div
      className={isAlphabetSide ? "card" : "card-flipped"}
      onClick={handleClick}
    >
      {isAlphabetSide ? (
        props.text
      ) : (
        <img
          alt="issue"
          style={{ height: "100%", width: "100%" }}
          src={require(`../../data/images/${letter}.jpg`)}
        />
      )}
    </div>
  );
};


export default Card;
