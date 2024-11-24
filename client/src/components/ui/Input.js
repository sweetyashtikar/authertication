import React from "react";
import "../style/input.css";

const Input = ({ type, placeholder, required, onChange, value }) => {
  return (
    <div>
      <input
        type={type}
        onChange={onChange} // Corrected the case of 'onChange'
        value={value}
        placeholder={placeholder}
        required={required} // Corrected spelling of 'required'
        className="ui-input"
      />
    </div>
  );
};

export default Input;
