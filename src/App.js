import React, { useState, useEffect } from "react";
import "./App.css";
import alphabetArray from "./data/alphabet";
import * as sides from "./data/sides";
import "./styles/App.css";
import Header from "./components/Header/Header.js";
import Cards from "./components/Cards/Cards.js";


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
      <Header/>
      <Cards/>
    </div>
  );

};

export default App;
