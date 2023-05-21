import React from "react";
import styled from "styled-components";


const WordsCard = ({handlerSelectWord, word}) => {
    console.log(word)
  return (
    <>
      <Card onClick={handlerSelectWord}>
        {word}
      </Card>
    </>
  );
};

const Card = styled.div`
  width: 300px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  color : rgba(0,0,0,0.3);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  background: #fff;
  border: 1px solid rgba(0,0,0,0.3);
  transition: all 0.2s ease;
  margin-top: 20px;
  font-size: 22px;
  cursor: pointer;
    margin-bottom: 30px;

  &:hover {
    filter: brightness(1);
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
    scale: 1.01;
    border : 1px solid rgb(80, 90, 188);
  }


`;

export default WordsCard;
