// import Button from 'ui/Button';
// import Modal from 'ui/Modal';
// import CreateCabinForm from './CreateCabinForm';

import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  return (
    <>
      <Modal>
        <Modal.Open opensName={"addCabin"}>
          <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window opensName={"addCabin"}>
          <CreateCabinForm />
        </Modal.Window>

        <Modal.Open opensName={"hi"}>
          <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window opensName={"hi"}>
          <h1>Hi</h1>
        </Modal.Window>
      </Modal>
    </>
  );
}

// function AddCabin() {
//   const [isOpenModel, setIsOpenModel] = useState(false);
//   return (

//     <div>
//       <Button onClick={() => setIsOpenModel((isOpen) => !isOpen)}>
//         Create New Cabin
//       </Button>
//       {isOpenModel && (
//         <Modal onCloseModel={() => setIsOpenModel((isOpen) => !isOpen)}>
//           <CreateCabinForm
//             onCloseModel={() => setIsOpenModel((isOpen) => !isOpen)}
//           />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
