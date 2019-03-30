import React from "react";
import "./card.css";

const Card = props => (
  <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">{props.text}</div>
      <div class="flip-card-back">{props.text.toLowerCase()}</div>
    </div>
  </div>
);
export default Card;
