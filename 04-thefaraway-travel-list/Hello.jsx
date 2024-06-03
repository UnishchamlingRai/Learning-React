import { useState } from "react";

/* eslint-disable */
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];
function Hello() {
  const [items, setItems] = useState(initialItems);
  return (
    <div className="app">
      <Header />
      <Form onSetItems={setItems} />
      <List items={items} onSetItems={setItems} />
      <Footer items={items} />
    </div>
  );
}

function Header() {
  return <h1>FAR AWAY</h1>;
}
function Form({ onSetItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  function submitHandler(e) {
    e.preventDefault();
    const newItem = {
      quantity,
      description,
      packed: false,
      id: Date.now(),
    };
    onSetItems((items) => [...items, newItem]);
  }
  return (
    <form className="add-form" onSubmit={submitHandler}>
      <p>What do you need for Your Trip</p>
      <select
        name=""
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      >
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => {
          return (
            <option value={num} key={num}>
              {num}
            </option>
          );
        })}
      </select>
      <input
        type="text"
        placeholder="Add Items"
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function Items({ item, onSetItems }) {
  function handelDelete() {
    onSetItems((items) => items.filter((el) => el.id !== item.id));
  }
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onClick={() =>
          onSetItems((items) =>
            items.map((i) =>
              i.id === item.id ? { ...i, packed: !i.packed } : i
            )
          )
        }
      />
      <p style={{ textDecoration: item.packed ? "line-through" : "" }}>
        {item.quantity} {item.description}
      </p>
      <button onClick={handelDelete}>X</button>
    </li>
  );
}
function List({ items, onSetItems }) {
  return (
    <ul className="list">
      {items.map((item, index) => (
        <Items item={item} key={index} onSetItems={onSetItems} />
      ))}
    </ul>
  );
}

function Footer({ items }) {
  return (
    <div className="stats">
      <h3>
        {/* {percentage === 100
      ? `You got Everything. Ready to Go`
      : `you have ${totalItems} items on your list and you already packed ${totalPackedItems}(${percentage}%)`} */}
        you have 10 items on your list and you already packed 2 20%
      </h3>
    </div>
  );
}

export default Hello;
