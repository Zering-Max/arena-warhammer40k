import React from "react";

function InputText(props: {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div style={{ display: "flex", marginBottom: 8 }}>
      <label style={{ width: "20%" }} htmlFor={props.name}>
        {props.name}
      </label>
      <input
        value={props.value}
        onChange={props.onChange}
        style={{ width: "80%" }}
        name={props.name}
        id={props.name}
        type="text"
      />
    </div>
  );
}

export default InputText;
