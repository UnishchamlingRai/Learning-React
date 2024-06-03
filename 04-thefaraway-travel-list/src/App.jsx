// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
// ];
/* eslint-disable */
import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  function handelItems(item) {
    setItems((items) => [...items, item]);
  }

  function handelDeleteItems(id) {
    setItems((items) => {
      return items.filter((item) => item.id !== id);
    });
  }

  function handelIsPackedItems(id) {
    console.log("hello is packed");
    setItems((items) =>
      items.map((item) => {
        if (item.id == id) {
          console.log("item:", item);
          console.log("item spread:", { ...item });
          return { ...item, packed: !item.packed };
        }
        return item;
      })
    );
  }

  function handelClearAllItems() {
    let confirm = window.confirm(
      "Are you Sure You want to Clear All List Items."
    );
    if (confirm) {
      setItems([]);
    }
  }

  return (
    <>
      <Logo />
      <Form onItems={handelItems} />
      <PackList
        items={items}
        onDeleteItems={handelDeleteItems}
        onIsPackedItems={handelIsPackedItems}
        onClearAllItems={handelClearAllItems}
      />
      <Footer items={items} />
    </>
  );
}
function Logo() {
  return <h1>FAR AWAY</h1>;
}

function Form({ onItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

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

function PackList({ items, onDeleteItems, onIsPackedItems, onClearAllItems }) {
  const [sortOption, setSortOption] = useState("input");

  let sortedItems;
  if (sortOption === "input") sortedItems = items;
  if (sortOption === "Discription") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  if (sortOption === "Packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItems={onDeleteItems}
            onIsPackedItems={onIsPackedItems}
          />
        ))}
      </ul>
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value={"input"}>Sorted by input order</option>
        <option value={"Discription"}>Sorted by Discription</option>
        <option value={"Packed"}>Sorted by Packed Status</option>
      </select>
      <button onClick={onClearAllItems}>Clear list</button>
    </div>
  );
}

function Item({ item, onDeleteItems, onIsPackedItems }) {
  const { description, packed, quantity, id } = item;
  return (
    <li>
      <input
        type="checkbox"
        value={packed}
        onChange={() => onIsPackedItems(id)}
      />
      <span>{quantity}</span>
      <p style={packed ? { textDecoration: "line-through" } : {}}>
        {description}
      </p>
      <span onClick={() => onDeleteItems(id)}>X</span>
    </li>
  );
}

function Footer({ items }) {
  if (!items.length) {
    return <p className="stats">Start Add Some Items in your pack list.</p>;
  }
  const totalItems = items.length;
  const totalPackedItems = items.filter((item) => item.packed === true).length;
  console.log(totalPackedItems);
  const percentage = (totalPackedItems / totalItems) * 100;

  return (
    <div className="stats">
      <h3>
        {percentage === 100
          ? `You got Everything. Ready to Go`
          : `you have ${totalItems} items on your list and you already packed ${totalPackedItems}(${percentage}%)`}
      </h3>
    </div>
  );
}
//
