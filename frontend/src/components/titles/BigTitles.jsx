import React from "react";

const BigTitles = ({firstText, secondText, backSpace}) => {
  return (
    <h1 className="carreer-title">
      {firstText } 
      {!backSpace ? "" :  (<br/>)}
      <span> {secondText}</span>
    </h1>
  );
}


export default BigTitles;