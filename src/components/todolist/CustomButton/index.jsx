import React from "react";

// Define your new component
function Button({ itemId, itemText, onClick, title, typeButtonColor }) {
  return (
    <button
      className={typeButtonColor + `-button`}
      onClick={() => onClick(itemId, itemText) && onClick()}
    >
      {title}
    </button>
  );
}

export default Button;
