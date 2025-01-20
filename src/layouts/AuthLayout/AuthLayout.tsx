import { Outlet } from "react-router";
import { styled } from "styled-components";

export const AuthLayout = () => {
  return (
    <MainDiv>
      <Outlet />
    </MainDiv>
  );
};

const MainDiv = styled.div`
  height: 100%;
  min-height: 100vh;
  padding: 1.5em;
`;

export default AuthLayout;
