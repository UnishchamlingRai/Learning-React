import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";

const H1 = styled.h1`
  color: red;
  background-color: blue";
`;

const Hello = styled.div`
color: red;
  background-color: var(--color-brand-50)";`;

function Test() {
  return (
    <div>
      <GlobalStyles />
      <H1>Hello </H1>
      <Hello>unish</Hello>
    </div>
  );
}

export default Test;
