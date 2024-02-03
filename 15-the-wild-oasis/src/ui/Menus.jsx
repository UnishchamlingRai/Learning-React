import { createContext, useContext, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutSideClick";
import { createPortal } from "react-dom";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;
  z-index: 20;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;
const menuContext = createContext();

function Menus({ children }) {
  const [position, setPosition] = useState(null);

  const [openId, setOpenId] = useState("");
  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <menuContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </menuContext.Provider>
  );
}

function Toggles({ id }) {
  const { openId, close, open, setPosition } = useContext(menuContext);

  function handelClick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handelClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

// function Menu() {}
function List({ children, id }) {
  const { openId, close, position } = useContext(menuContext);
  const ref = useOutsideClick(close, false);
  if (openId !== id) return null;
  return createPortal(
    <li>
      <StyledList position={position} ref={ref}>
        {children}
      </StyledList>
    </li>,
    document.body
  );
}
function Button({ children, onClick, icon }) {
  const { close } = useContext(menuContext);
  function handler() {
    console.log("hello");
    onClick?.();
    close();
  }
  return (
    <StyledButton onClick={handler}>
      {icon} {children}
    </StyledButton>
  );
}

Menus.Menu = StyledMenu;

Menus.Toggles = Toggles;

Menus.Button = Button;
Menus.List = List;
export default Menus;
