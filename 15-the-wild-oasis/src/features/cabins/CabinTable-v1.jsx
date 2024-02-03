import { useState } from "react";

import { useFetchCabins } from "../../pages/useFetchCabins";

import styled from "styled-components";
import { StyledTable } from "../../ui/Table";
import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";

// v1
const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;
function CabinTable() {
  const { cabins, isLoading } = useFetchCabins();
  if (isLoading) return <Spinner />;
  return (
    <>
      <StyledTable>
        <TableHeader>
          <div>Image</div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </TableHeader>
        {cabins.map((cabin, index) => (
          <CabinRow cabin={cabin} key={index} />
        ))}
      </StyledTable>
    </>
  );
}

export default CabinTable;
