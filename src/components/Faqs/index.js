import classes from "./Faqs.module.css";
import { Arrowdown, Arrowup } from "../UI/svgs/svgs";
import React, { useState } from "react";

const FAQs = (props) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleAnswer = () => {
    setShowAnswer((prevState) => !prevState);
  };
  return (
    <div className={classes.faqs}>
      <div className="d-flex justify-content-between">
        <h5>{props.question}</h5>
        <i onClick={toggleAnswer}>{showAnswer ? Arrowup : Arrowdown}</i>
      </div>
      {showAnswer && <p>{props.answer}</p>}
    </div>
  );
};

export default FAQs;
