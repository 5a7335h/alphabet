import React, { useState, useEffect } from "react";
import "./CardLatest.css";
import * as sides from "../../data/sides";
import { useSelector } from "react-redux";
import { getWordForLetterAndCategory } from "../../helpers/utils";

const Card = props => {

  let [state, setState] = useState({ side: sides.alphabetSide });
  const category = useSelector(state => state.alphabetState.category);

  const handleClick = () => {
    try {
      if (isAlphabetSide) {
        // var msg = new SpeechSynthesisUtterance(nameMap.get(props.text));
        // msg.rate = 0.5;
        // window.speechSynthesis.speak(msg);
        window.responsiveVoice.speak(getWordForLetterAndCategory(props.text, category));
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
        window.responsiveVoice.speak(getWordForLetterAndCategory(props.text, category));
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
          src={require(`../../data/images/${category}/${props.text}.jpg`)}
        />
      )}
    </div>
  );
};


export default Card;
