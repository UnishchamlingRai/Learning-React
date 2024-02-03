import styled from "styled-components";
import { useGetCurrentUser } from "../features/authentication/useGetCurrentUser";

import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const StyledSpinner = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, user, isAuthenticated } = useGetCurrentUser();
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) {
        navigate("/login");
      }
    },
    [isAuthenticated, isLoading, navigate]
  );

  if (isLoading) {
    return (
      <StyledSpinner>
        <Spinner />
      </StyledSpinner>
    );
  }
  if (isAuthenticated) {
    return children;
  }
}

export default ProtectedRoute;
//1) Load the autheticated user

//2. While loading, show spinner
// 3. if there is NO authenticated user, redirect,
// 4. if there is a user, render the appp
