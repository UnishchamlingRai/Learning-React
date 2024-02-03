import { createContext, useContext } from "react";
import styled from "styled-components";

export const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  /* background-color: red;
  padding: 100px; */

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
  text-align: center;
  z-index: 1;
`;

const CommonRow = styled.header`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const tableContext = createContext();

export default function Table({ children, columns }) {
  return (
    <tableContext.Provider value={{ columns }}>
      <StyledTable>{children}</StyledTable>;
    </tableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(tableContext);
  return (
    <StyledHeader columns={columns} as="header">
      {children}
    </StyledHeader>
  );
}

function Row({ children }) {
  const { columns } = useContext(tableContext);
  return <StyledRow columns={columns}>{children}</StyledRow>;
}

function TableBody({ data, render }) {
  if (!data?.length) return <Empty>No data is found yet.</Empty>;
  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.TableBody = TableBody;
Table.Footer = Footer;
