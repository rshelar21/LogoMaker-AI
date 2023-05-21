import React from "react";
import styled from "styled-components";
import { Blocks } from "react-loader-spinner";

const Loader = () => {
  return (
    <>
      <LoadingBar>
        <Blocks
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{
          }}
          wrapperClass="blocks-wrapper"
        />
      </LoadingBar>
    </>
  );
};

const LoadingBar = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  right: 0;
`;

export default Loader;
