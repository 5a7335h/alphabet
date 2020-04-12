import Card from "../Card/Card.js";
import { useSelector } from 'react-redux'
import React from 'react';

const Cards = () =>
{
    const alphabetArray = useSelector(state => state.alphabet);

    return <div>
        {
            alphabetArray.map(x => (
                <Card key={x.id} id={x.id} text={x.letter} side={x.side} />
            ))
        }
      </div>;
}

export default Cards;