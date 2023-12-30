// import { useState } from 'react'

import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [friendList, setFriendList] = useState(initialFriends);
  const [select, setselect] = useState(null);
  const [selectedFriendInfo, setSelectedFriendInfo] = useState({});
  // console.log("selectedFriendInfo:", selectedFriendInfo);
  return (
    <>
      <div className="app">
        <FriendList
          friendList={friendList}
          onSetFriendList={setFriendList}
          select={select}
          onSetselect={setselect}
          onSetSelectedFriendInfo={setSelectedFriendInfo}
        />
        {select ? (
          <SplitBill
            selectedFriendInfo={selectedFriendInfo}
            onSetFriendList={setFriendList}
            onSetselect={setselect}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
}

function FriendList({
  select,
  onSetselect,
  onSetSelectedFriendInfo,
  friendList,
  onSetFriendList,
}) {
  const [isopen, setIsOpen] = useState(false);
  return (
    <div className="sidebar">
      {friendList.map((friend, index) => (
        <Friend
          friend={friend}
          key={index}
          select={select}
          onSetselect={onSetselect}
          onSetSelectedFriendInfo={onSetSelectedFriendInfo}
        />
      ))}
      {isopen ? (
        <AddFriend onSetFriendList={onSetFriendList} onSetIsOpen={setIsOpen} />
      ) : (
        ""
      )}

      <button className="button" onClick={() => setIsOpen((is) => !is)}>
        {isopen ? "Close" : "Add Friend"}
      </button>
    </div>
  );
}

function Friend({ friend, select, onSetselect, onSetSelectedFriendInfo }) {
  // const [selectedFriendInfo, setSelectedFriendInfo] = useState({});
  function handelSelect() {
    onSetselect((selectedId) => (selectedId === friend.id ? null : friend.id));
    onSetSelectedFriendInfo(friend);
  }
  return (
    <ul>
      <li>
        <img src={friend.image} alt={`${friend.name} image`} />
        <h3>{friend.name}</h3>
        {/* <p>{`friend.balance===0?"You and Antony are even"?friend.balance>0?"You Give":""`}</p> */}
        <p
          className={
            friend.balance === 0 ? "" : friend.balance > 0 ? "red" : "green"
          }
        >
          {friend.balance === 0
            ? `You and ${friend.name} are even`
            : friend.balance > 0
            ? `You Give ${friend.name} Rs.${friend.balance}`
            : `${friend.name} Give you Rs.${friend.balance}`}
        </p>
        <button className="button" onClick={handelSelect}>
          {select === friend.id ? "Close" : "Select"}
        </button>
      </li>
    </ul>
  );
}

function AddFriend({ onSetFriendList, onSetIsOpen }) {
  const [friendName, setFriendName] = useState("");
  const image = `https://i.pravatar.cc/48?u=${
    118837 + Math.floor(Math.random() * 100) + 1
  }`;
  function handelAddFriendInfo(e) {
    e.preventDefault();
    onSetFriendList((friends) => [
      ...friends,
      {
        image: image,
        name: friendName,
        balance: 0,
        id: Date.now(),
      },
    ]);
    onSetIsOpen((is) => !is);
  }

  return (
    <form className="form form-add-friend" onSubmit={handelAddFriendInfo}>
      <label htmlFor="FriendName">Friend Name</label>
      <input
        type="text"
        id="FriendName"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
      />

      <label htmlFor="image" value={image}>
        Image URL
      </label>
      <input value={image} type="text" id="image" readOnly />
      <button className="button">Add</button>
    </form>
  );
}

function SplitBill({ selectedFriendInfo, onSetFriendList, onSetselect }) {
  const [billValue, setBillValue] = useState("");
  const [yourExpense, setYourExpense] = useState(0);
  const [payer, setPayer] = useState("you");

  let friendExpenses = billValue - yourExpense;
  function splitBillHandler(e) {
    e.preventDefault();
    // console.log({ billValue, yourExpense, payer, friendExpenses });
    onSetFriendList((friends) => {
      return friends.map((friend) => {
        if (selectedFriendInfo.id === friend.id) {
          return {
            ...friend,
            balance: payer === "you" ? -friendExpenses : friendExpenses,
          };
        } else {
          return friend;
        }
      });
    });
    onSetselect(false);
  }
  return (
    <form className="form form-split-bill" onSubmit={splitBillHandler}>
      <label htmlFor="billValue">Bill Value</label>
      <input
        type="text"
        id="billValue"
        value={billValue}
        onChange={(e) => setBillValue(Number(e.target.value))}
      />

      <label htmlFor="expense">Your Expense:</label>
      <input
        type="number"
        id="expense"
        value={yourExpense}
        onChange={(e) => setYourExpense(Number(e.target.value))}
      />

      <label htmlFor="freindEx">{`${selectedFriendInfo.name} Expense:`}</label>
      <input type="number" id="freindEx" readOnly value={friendExpenses} />

      <label htmlFor="who">Who is paying the bill?</label>
      <select id="who" value={payer} onChange={(e) => setPayer(e.target.value)}>
        <option value="you">You</option>
        <option value="friend">{selectedFriendInfo.name}</option>
      </select>
      <button className="button">Split Bill</button>
    </form>
  );
}

export default App;
