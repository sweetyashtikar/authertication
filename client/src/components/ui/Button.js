import React from "react";
import '../style/button.css';
const Button = ({ onClick, type, children }) => {
  return (
    <div>
      <button className="ui-button" onClick={onClick} type={type}>
        {children}
      </button>
    </div>
  );
};

export default Button;
