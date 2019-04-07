import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/card/card";
import alphabetArray from "./data/alphabet";
import * as sides from "./data/sides";
import "./styles/App.css";

const App = () => {
  const [state, setState] = useState([...alphabetArray]);
  const [autoPlay, setAutoPlay] = useState(false);
  const [autoIndex, setAutoIndex] = useState(1);
  const doAutoAction = () => {
    let prevAutoIndex = null;
    setAutoIndex(prevIndex => {
      prevAutoIndex = prevIndex;
      return prevIndex + 1;
    });
    console.log(`starting action: ${prevAutoIndex}`);
    if (prevAutoIndex === 26) {
      setAutoPlay(false);
    }
    setState(prevstate => {
      let newArray = prevstate.map(x =>
        x.id === prevAutoIndex ? { ...x, side: sides.imageSide } : x
      );
      return newArray;
    });
  };

  const handleAutoplayChk = () => {
    setAutoPlay(!autoPlay);
  };
  useEffect(() => {
    let interval = null;
    if (autoPlay) {
      interval = setInterval(doAutoAction, 3000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [autoPlay]);
  return (
    <div>
      <div>
        <input
          type="checkbox"
          style={{ width: "30px", height: "30px" }}
          className="form-control"
          onClick={handleAutoplayChk}
        />
        <label>Autoplay</label>
      </div>
      <div>
        {state.map(x => (
          <Card key={x.id} text={x.letter} side={x.side} />
        ))}
      </div>
    </div>
  );
};

export default App;
