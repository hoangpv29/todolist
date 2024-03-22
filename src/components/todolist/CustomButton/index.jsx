import React from "react";

// Define your new component
function Button({ itemId, itemText, onClick, title, styleButton }) {
  return (
    <button
      className={styleButton + `-button`}
      onClick={() => onClick(itemId, itemText) && onClick()}
    >
      {title}
    </button>
  );
}

export default Button;
