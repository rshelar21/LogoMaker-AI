import React from "react";
import styled from "styled-components";

const ImagesCard = ({ img }) => {
  return (
    <>
      <Card>
        <img src={img} alt="logo" />
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
  color: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: #fff;
  transition: all 0.2s ease;
  margin-top: 20px;
  cursor: pointer;
  margin-bottom: 30px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
    border-radius: 15px;
  }
`;

export default ImagesCard;
