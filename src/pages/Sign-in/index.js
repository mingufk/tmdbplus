import React from 'react';
import styled from 'styled-components';

const SignInPage = () => {
  return (
    <Container>
      <Content>
        <Center>
          <FullLogo src="/images/full-logo.svg" alt="full-logo" />
          <SignUpLink>Sign Up Now</SignUpLink>
          <Description>Stream all your favorites and more.</Description>
          <LongLogo src="/images/long-logo.svg" alt="long-logo" />
        </Center>
        <BgImg />
      </Content>
    </Container>
  );
};

export default SignInPage;

const BgImg = styled.div`
  height: 100%;
  background-position: top;
  background-image: url('/images/home-bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: -1;
  opacity: 0.2;
`;

const Container = styled.section`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh;
`;

const Content = styled.div`
  margin-bottom: 10vw;
  width: 100%;
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 80px 40px;
  height: 100%;
`;

const Center = styled.div`
  max-width: 650px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const FullLogo = styled.img`
  margin-bottom: 2rem;
  max-width: 600px;
  min-height: 1px;
  display: block;
  width: 100%;
`;

const LongLogo = styled.img`
  max-width: 600px;
  margin-top: 2rem;
  display: inline-block;
  width: 100%;
`;

const SignUpLink = styled.a`
  font-weight: bold;
  color: #fff;
  background: linear-gradient(
    90deg,
    rgba(13, 37, 63, 1) 0%,
    rgba(1, 180, 228, 1) 35%,
    rgba(144, 206, 161, 1) 100%
  );
  margin-bottom: 1rem;
  width: 90%;
  letter-spacing: 1.5px;
  font-size: 2rem;
  padding: 2.3rem 0;
  border-radius: 60px;
  text-transform: uppercase;
  transition: all 0.3s ease 0s;
  cursor: pointer;

  &:hover {
    background: linear-gradient(
      90deg,
      rgba(144, 206, 161, 1) 0%,
      rgba(1, 180, 228, 1) 35%,
      rgba(13, 37, 63, 1) 100%
    );
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  margin: 0 0 1rem;
  letter-spacing: 1.5px;
`;
