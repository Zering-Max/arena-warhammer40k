import React, { useContext, useEffect } from "react";
import { BattleContext } from "../context/battle";
import { Character } from "../interfaces/index";
import { ArenaContext } from "../context/index";

function SelectStuff(props: {
  stuff: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  characterId: number;
}) {
  const { state, dispatch } = useContext(BattleContext);
  const { state: resetState } = useContext(ArenaContext);

  let character = state.charactersInBattle.filter(
    (c: Character) => c.id === props.characterId
  );

  useEffect(() => {
    let filtered = state.charactersInBattle.filter(
      (c: Character) => c.id !== props.characterId
    );
    if (props.stuff === "epee") {
      dispatch({
        type: "SET_CHARACTERS_INBATTLE",
        payload: [
          ...filtered,
          {
            id: character[0].id,
            name: character[0].name,
            attaque: character[0].attaque + 3,
            pv: character[0].pv,
            image: character[0].image,
          },
        ],
      });
    } else if (props.stuff === "bolter") {
      dispatch({
        type: "SET_CHARACTERS_INBATTLE",
        payload: [
          ...filtered,
          {
            id: character[0].id,
            name: character[0].name,
            attaque: character[0].attaque + 8,
            pv: character[0].pv - 6,
            image: character[0].image,
          },
        ],
      });
    } else if (props.stuff === "armure") {
      dispatch({
        type: "SET_CHARACTERS_INBATTLE",
        payload: [
          ...filtered,
          {
            id: character[0].id,
            name: character[0].name,
            attaque: character[0].attaque - 2,
            pv: character[0].pv + 8,
            image: character[0].image,
          },
        ],
      });
    } else if (props.stuff === "default") {
      let resetFiltered = resetState.selectedToFight.filter(
        (c: Character) => c.id === props.characterId
      );
      dispatch({
        type: "SET_CHARACTERS_INBATTLE",
        payload: [...filtered, ...resetFiltered],
      });
    }
  }, [props.stuff]);
  return (
    <div style={{ height: "20%" }}>
      <select
        style={{
          border: "1px solid gold",
          backgroundColor: "black",
          color: "white",
          borderRadius: 4,
        }}
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
