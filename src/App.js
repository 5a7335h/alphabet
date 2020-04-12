import "./App.css";
import "./styles/App.css";
import Header from "./components/Header/Header.js";
import Cards from "./components/Cards/Cards.js";
import React from "react";
import { useEffect } from 'react';
import {getIdForLetter} from './helpers/utils.js'
import { useDispatch } from "react-redux";
import { SetFlipStatus } from "./actions";
import * as Sides from './data/sides.js'

const App = () => {

  const dispatch = useDispatch();

  function downHandler({ key }){
    let idOfTheKeyPressed = getIdForLetter(key);
    if(idOfTheKeyPressed === null){
      console.log("invalid key pressed!");
    }
    else{
      dispatch(SetFlipStatus({ id: idOfTheKeyPressed, side: Sides.imageSide }));
    }
  }

  useEffect(()=> {
    window.addEventListener('keydown', downHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, [])

  return (
    <div>
      <Header/>
      <Cards/>
    </div>
  );

};

export default App;

