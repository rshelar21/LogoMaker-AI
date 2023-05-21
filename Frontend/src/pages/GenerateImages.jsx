import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ImagesCard from "../components/ImagesCard";
import { useLocation } from "react-router-dom";
import Loader from "../components/Loader";




const GenerateImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    setImages(location?.state);
    setLoading(false);
  }, [location]);

  return (
    <>
          {loading && <Loader />}
      <Container>
        <Main>
          <h1>Select Word: Books</h1>
          <p>Genereated Images are here:-</p>
        </Main>
      </Container>

      <Result>
        <ResultBody>
          {images?.map((item, index) => {
            return <ImagesCard key={index} img={item} />;
          })}
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
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  height: 300px;
  margin-top: 20px;
`;

const ResultBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default GenerateImages;
