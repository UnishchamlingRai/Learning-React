import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { Uploader } from "../data/Uploader";
import { useGetCurrentUser } from "../features/authentication/useGetCurrentUser";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function Sidebar() {
  // const {} = use;
  const { user } = useGetCurrentUser();
  const { fullName } = user.user_metadata;

  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
      {fullName === "Unish Rai" ? <Uploader /> : ""}
    </StyledSidebar>
  );
}

export default Sidebar;
