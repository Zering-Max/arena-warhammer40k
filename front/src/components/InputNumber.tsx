import { Dispatch } from "react";

function InputNumber(props: {
  name: string;
  max: string;
  min: string;
  value: number;
  setValue: (value: number) => Dispatch<number> | void;
}) {
  const limitValue = (type: string, val: number) => {
    if (type === "Attaque") {
      if (val < 10) {
        props.setValue(10);
      } else if (val > 20) {
        props.setValue(20);
      }
    } else {
      if (val < 20) {
        props.setValue(20);
      } else if (val > 40) {
        props.setValue(40);
      }
    }
    return val;
  };

  return (
    <div>
      <label style={{ marginRight: 8 }} htmlFor={props.name}>
        {props.name}
      </label>
      <input
        value={limitValue(props.name, props.value).toString()}
        onChange={e => props.setValue(parseInt(e.target.value, 10))}
        style={{ width: 50 }}
        name={props.name}
        id={props.name}
        type="number"
        max={props.max}
        min={props.min}
      />
    </div>
  );
}

export default InputNumber;
