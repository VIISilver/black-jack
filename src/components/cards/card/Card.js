import React, { Fragment } from "react";
import CardBack from "../../../assets/CardBack.jpg";
import "./Card.css";

export default function Card(props) {
  const { flippedCards, imgSrcCards } = props;

  return (
    <Fragment>
      <img
        className="individual-card"
        alt="Playing Cards"
        src={flippedCards ? imgSrcCards : CardBack}
      />
    </Fragment>
  );
}
