import React, { useState } from "react";
import styled from "styled-components";
import axios from "../axios";
import {useNavigate} from "react-router-dom";
import Loader from "../components/Loader";

const Home = () => {
  const [serachText, setSearchText] = useState("");
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post("/predict", {
        word: serachText,
      })
      .then((data) => {
        setLoading(false);
        setResultData(data.data);
        navigate("/search", {state: data.data});
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
    {
      loading && <Loader />
    }
      <Container>
        <Main>
          <h1>Business Name Generator</h1>
          <h3>
            generate a short, brandable business name using artificial
            intelligence
          </h3>

          <InputField>
            <input
              type="text"
              placeholder="Enter your business name"
              value={serachText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button onClick={handlerSubmit}>Generate</Button>
          </InputField>
        </Main>
      </Container>

      <About>
        <Description>
          <h1>Why a branded name?</h1>
          <p>
            For new businesses, naming options can seem quite limited. Short
            domains are very expensive, yet longer multi-word names don’t
            inspire confidence.
          </p>
          <p>
            In 2023 many startups are choosing a short, branded name - a name
            that’s unique, memorable and affordable.
          </p>
        </Description>
      </About>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url("/assets/background.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: #505abc;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.div`
  color: #fff;
  text-align: center;
  h1 {
    font-size: 45px;
  }
  h3 {
    color: #bbd3f9;
    font-size: 20px;
  }
`;

const InputField = styled.div`
  margin: 0 auto;
  margin-top: 25px;
  padding: 10px;

  input {
    border: none;
    width: 400px;
    padding: 15px 20px;
    border-radius: 10px;
    outline: none;
    border: 1px solid #000;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.5);

    &::placeholder {
      font-size: 18px;
    }
  }
`;

const Button = styled.button`
  background-color: #363a8e;
  outline: none;
  border: none;
  color: #fff;
  padding: 15px 20px;
  border-radius: 10px;
  margin-left: 10px;
  width: 130px;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 1px;

  &:active {
    scale: 1.05;
  }
`;

const About = styled.div`
  width: 100%;
  background-image: url("/assets/background2.svg");
  height: 400px;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #d1e1ed;
  background-size: cover;
`;

const Description = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 50px;
  max-width: 400px;
  margin: 0 auto;

  h1 {
    color: #5874db;
    font-size: 40px;
  }
  p {
    color: #687689;
    font-size: 18px;
  }
`;

export default Home;
