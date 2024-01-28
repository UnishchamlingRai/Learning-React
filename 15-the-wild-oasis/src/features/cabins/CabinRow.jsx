import styled from "styled-components";

import CreateCabinForm from "./CreateCabinForm";
import { useState } from "react";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  /* transform: scale(1.66666) translateX(-2px); */
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const [isShowEdit, setIsShowEdit] = useState(false);
  const {
    id: cabinId,
    image,
    name,
    regularPrice,
    discount,
    maxCapacity,
  } = cabin;
  const { isDeleting, deleteCabin } = useDeleteCabin();

  const { isCreating: isDublicating, createNewCabin } = useCreateCabin();

  function handelDublicate() {
    createNewCabin({
      name: `Copy of ${name}`,
      image,
      regularPrice,
      discount,
      maxCapacity,
    });
  }
  return (
    <>
      <TableRow>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>{maxCapacity}</div>
        <Price>{regularPrice}</Price>
        {discount ? <Discount>{discount}</Discount> : <span> &mdash;</span>}
        <div>
          {" "}
          <button onClick={() => deleteCabin(cabinId)} disabled={isDeleting}>
            <HiTrash />
          </button>
          <button onClick={() => setIsShowEdit((show) => !show)}>
            <HiPencil />
          </button>
          <button onClick={handelDublicate} disabled={isDublicating}>
            <HiSquare2Stack />
          </button>
        </div>
      </TableRow>
      {isShowEdit && (
        <CreateCabinForm
          cabinToEdit={cabin}
          onCloseModel={() => setIsShowEdit((is) => !is)}
        />
      )}
    </>
  );
}

export default CabinRow;
