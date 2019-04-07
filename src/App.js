import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/card/card";
import alphabetArray from "./data/alphabet";
import * as sides from "./data/sides";

const App = () => {
  const [state, setState] = useState([...alphabetArray]);
  let autoIndex = 1;
  let interval = null;
  const doAutoAction = () => {
    console.log(`starting action: ${autoIndex}`);
    setState(prevstate => {
      if (autoIndex === 26) {
        clearInterval(interval);
      }
      let newArray = prevstate.map(x =>
        x.id === autoIndex ? { ...x, side: sides.imageSide } : x
      );
      autoIndex++;
      return newArray;
    });
  };
  console.log("executing body");
  useEffect(() => {
    interval = setInterval(doAutoAction, 3000);
  }, []);
  return (
    <div>
      <div>
        {state.map(x => (
          <Card key={x.id} text={x.letter} side={x.side} />
        ))}
      </div>
    </div>
  );
};

export default App;
