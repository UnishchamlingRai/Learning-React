import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  return (
    <LoginLayout>
      <h1>Login with this user </h1>
      <p>email: test@gmail.com</p>
      <p>password: teast1234</p>
      <Logo />
      <Heading as="h4">Login in you account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
