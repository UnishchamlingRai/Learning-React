import styled from "styled-components";

import CreateCabinForm from "./CreateCabinForm";

import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { formatCurrency } from "../../utils/helpers";
// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;
//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

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
    <Table.Row role="row">
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>{maxCapacity}</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span> &mdash;</span>
      )}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggles id={cabinId} />
            <Menus.List id={cabinId}>
              <Menus.Button onClick={handelDublicate} icon={<HiSquare2Stack />}>
                Dublicate
              </Menus.Button>

              <Modal.Open opensName="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opensName="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window opensName="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window opensName="delete">
              <ConfirmDelete
                resource={"Cabin"}
                onConfirm={() => deleteCabin(cabinId)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>

        {/* <Modal>
          <Modal.Open>
            <button>
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window>
            <ConfirmDelete
              resource={"Cabin"}
              onConfirm={() => deleteCabin(cabinId)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal> */}

        {/* <button onClick={handelDublicate} disabled={isDublicating}>
          <HiSquare2Stack />
        </button> */}
      </div>
    </Table.Row>
  );
}

export default CabinRow;
