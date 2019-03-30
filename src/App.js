import React, { Component } from "react";
import "./App.css";
import Card from "./components/card/card";
import alphabetArray from "./data/alphabet";

class App extends Component {
  render() {
    return (
      <div>
        {alphabetArray.map(x => (
          <Card key={x} text={x} />
        ))}
      </div>
    );
  }
}

export default App;
