import React from "react";

function SelectStuff(props: {
  stuff: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div style={{ height: "20%" }}>
      <select
        value={props.stuff}
        onChange={props.onChange}
        name="stuff"
        id="stuff"
      >
        <option value="default">Arme de base</option>
        <option value="epee">Epée Tronçonneuse</option>
        <option value="bolter">Bolter Lourd</option>
        <option value="armure">Armure electrobionique</option>
      </select>
    </div>
  );
}

export default SelectStuff;
