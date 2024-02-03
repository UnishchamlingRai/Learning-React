import {
  createContext,
  useState,
  useContext,
  cloneElement,
  useEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutSideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;
const modalContext = createContext();
function Modal({ children }) {
  const [isOpenName, setIsOpenName] = useState("");
  const close = () => setIsOpenName("");
  const open = setIsOpenName;
  return (
    <modalContext.Provider value={{ isOpenName, close, open }}>
      <span>{children}</span>
    </modalContext.Provider>
  );
}

function Window({ children, opensName }) {
  const { close, isOpenName } = useContext(modalContext);
  const ref = useOutsideClick(close);

  if (isOpenName !== opensName) return null; // Return null if modal is not open

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModel: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

function Open({ children, opensName }) {
  const { open, close, isOpenName } = useContext(modalContext);
  function handelClick() {
    isOpenName === "" || isOpenName !== opensName ? open(opensName) : close();
  }
  // return <span onClick={() => setIsOpen((is) => !is)}>{children}</span>;
  return cloneElement(children, { onClick: handelClick });
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
