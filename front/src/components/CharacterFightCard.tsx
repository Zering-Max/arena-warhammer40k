import React, { useContext, useEffect } from "react";
import { Character } from "../interfaces/index";
import { colors } from "../styles/colors";
import { FlexBox } from "../styles/styledComponents";
import SelectStuff from "./SelectStuff";
import { BattleContext } from "../context/battle";

function CharacterFightCard(props: { character: Character }) {
  const [stuff, setStuff] = React.useState<string>("default");

  useEffect(() => {
    setStuff("default");
  }, [props.character]);

  const buffCharacter = (key: string, stat: number) => {
    if (stuff === "epee" && key === "attaque") {
      stat += 3;
    } else if (stuff === "bolter") {
      if (key === "attaque") {
        stat += 8;
      } else {
        stat -= 6;
      }
    } else if (stuff === "armure") {
      if (key === "attaque") {
        stat -= 2;
      } else {
        stat += 8;
      }
    }
    return stat;
  };

  return (
    <FlexBox height={100}>
      <FlexBox height={80}>
        <img
          src={props.character?.image}
          alt={props.character?.name}
          style={{ width: 100, height: 100, borderRadius: 8 }}
        />
        <span>{props.character?.name}</span>

        <span
          style={{
            color: stuff !== "default" ? "gold" : "white",
          }}
        >
          Attaque : {buffCharacter("attaque", props.character.attaque)}
        </span>
        <span
          style={{
            color: stuff === "armure" || stuff === "bolter" ? "gold" : "white",
          }}
        >
          Pts de Vie : {buffCharacter("pv", props.character.pv)}
        </span>
        <span>Choisis ton équipement : </span>
      </FlexBox>
      <SelectStuff
        characterId={props.character.id}
        stuff={stuff}
        onChange={e => setStuff(e.target.value)}
      />
      {props.character?.pv <= 0 ? (
        <span style={{ color: colors.darkred }}>
          {props.character.name} doit se reposer
        </span>
      ) : null}
    </FlexBox>
  );
}

export default CharacterFightCard;
