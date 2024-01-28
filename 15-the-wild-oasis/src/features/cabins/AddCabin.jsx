// import Button from 'ui/Button';
// import Modal from 'ui/Modal';
// import CreateCabinForm from './CreateCabinForm';

import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  const [isOpenModel, setIsOpenModel] = useState(false);
  return (
    // <Modal>
    //   <Modal.Toggle opens='new-cabin'>
    //     <Button>Add new cabin</Button>
    //   </Modal.Toggle>
    //   <Modal.Window name='new-cabin'>
    //     <CreateCabinForm />
    //   </Modal.Window>
    // </Modal>
    // {isOpen && <CreateCabinForm />}
    <div>
      <Button onClick={() => setIsOpenModel((isOpen) => !isOpen)}>
        Create New Cabin
      </Button>
      {isOpenModel && (
        <Modal onCloseModel={() => setIsOpenModel((isOpen) => !isOpen)}>
          <CreateCabinForm
            onCloseModel={() => setIsOpenModel((isOpen) => !isOpen)}
          />
        </Modal>
      )}
    </div>
  );
}

export default AddCabin;
