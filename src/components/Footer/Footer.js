import React from "react";
import styled from "styled-components";

const Footer = () => {
  // function to get current year
  const getCurrentYear = (d) => {
    const year = d.getFullYear();
    return year;
  };
  return (
    <div>
      <FooterContainer>
        <Copywrite>
          &copy; Ubani U. Friday {getCurrentYear(new Date())} 👌
        </Copywrite>
      </FooterContainer>
    </div>
  );
};

export default Footer;

// styled components
const FooterContainer = styled.div`
  background-color: #003366;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 100vw;
  padding-top: 10px;
  padding-bottom: 10px;
  bottom: 0;
`;
const Copywrite = styled.div`
  color: white;
  font-size: 12px;
`;
