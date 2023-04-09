import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "../axios";
import { useLocation } from "react-router-dom";
import WordsCard from "../components/WordsCard";

const Search = () => {
  const [resultData, setResultData] = useState([]);
  const location = useLocation();
  useEffect(() => {
    setResultData(location?.state);
  }, [location]);

  const handlerSelectWord = async(e) => {
    console.log(e.target.innerText);
    await axios.post('/generate-images' , {
      word : e.target.innerText
    }).then((res) => console.log(res)).catch((err) => console.log(err))
  }

  return (
    <>
      <Container>
        <Main>
          <h1>Select Any Word to Generate Image </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint,
            voluptatum.
          </p>
        </Main>
      </Container>

      <Result>
        <ResultBody>
          {
            resultData?.map((item, index) => {
              return <WordsCard key={index} word={item} handlerSelectWord={handlerSelectWord} />
            })
          }
        </ResultBody>
      </Result>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 400px;
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
  p {
    color: #bbd3f9;
  }
`;

const Result = styled.div`
  /* background-color: rgba(0, 0, 0, 0.05); */
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  height: 300px;
  margin-top: 20px;
  /* padding-bottom: 30px; */
`;

const ResultBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default Search;
