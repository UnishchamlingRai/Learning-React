const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  function handelItems(item) {
    setItems((items) => [...items, item]);
  }
  console.log(items);
  return (
    <>
      <Logo />
      <Form onItems={handelItems} />
      <PackList items={items} />

      <Footer />
    </>
  );
}
function Logo() {
  return <h1>FAR AWAY</h1>;
}

function Form({ onItems }) {
  const [description, setDescription] = useState("h");
  const [quantity, setQuantity] = useState(5);

  // const [items,setItems]=useState)\()
  function submitHandler(e) {
    e.preventDefault();
    if (!description) return;
    const newItems = {
      id: Date.now(),
      description: description,
      quantity: quantity,
      packed: false,
    };
    onItems(newItems);
  }
  return (
    <form className="add-form" onSubmit={submitHandler}>
      <h3> What do you need for your trip?</h3>

      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="items..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackList({ items }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            quantity={item.quantity}
            description={item.description}
            key={item.id}
          />
        ))}
      </ul>
      <select name="" id="">
        <option value="">Sorted by input order</option>
        <option value="">Sorted by input order</option>
        <option value="">Sorted by input order</option>
      </select>
      <button>Clear list</button>
    </div>
  );
}

function Item({ quantity, description }) {
  return (
    <li>
      <input type="checkbox" />
      <span>{quantity}</span>
      <p>{description}</p>
      <span>X</span>
    </li>
  );
}

function Footer() {
  return (
    <div className="stats">
      <h3>you have 6 items on your list and you already paked 0(0%)</h3>
    </div>
  );
}
