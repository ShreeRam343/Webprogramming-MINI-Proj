import React from "react";

const Content = ({ items, handleCheck, handleDelete }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => handleCheck(item.id)}
          />
          <span style={{ textDecoration: item.checked ? "line-through" : "none" }}>
            {item.item}
          </span>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default Content;