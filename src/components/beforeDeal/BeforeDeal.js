import React from "react";
import DefaultBtn from "../buttons/DefaultBtn";
import "./BeforeDeal.css";

export default function BeforeDeal(props) {
  return (
    <div>
      <DefaultBtn
        callBackParent={props.dealParent}
        txtParent={'Deal'}
      />
      <h2>Waiting for the Player to Press Deal...</h2>
      <p>
        If the deal button is not working press the shuffle button. Sends a
        request to the server to reset the deck.
      </p>
      <DefaultBtn
        callBackParent={props.shuffleDeckParent}
        txtParent={'Shuffle Deck'}
      />
    </div>
  );
}
