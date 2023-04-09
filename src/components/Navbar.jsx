import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY >= 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        });

        return () => {
            window.removeEventListener("scroll", () => {});
        };
    }, [])


  return (
    <>
      <Container scrolled={scrolled}>
        <Left >
          <Link to="/">LogoMaker AI</Link>
        </Left>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 999;
  position: fixed;
  padding: 10px 50px;
  background-color: ${(props) => (props.scrolled ? "#505ABC" : "transparent")};
  transition: all 0.5s ease;
`;

const Left = styled.div`
  a {
    color: #fff;
    font-size: 30px;
    font-weight: 600;
  }
`;

export default Navbar;
