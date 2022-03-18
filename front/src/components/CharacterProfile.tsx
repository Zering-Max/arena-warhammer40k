import React from "react";
import { Character } from "../interfaces/index";

function CharacterProfile(props: { character: Character }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: 8,
      }}
    >
      <img
        src={props.character?.image}
        style={{ width: 150, height: 150, borderRadius: 8 }}
        alt={props.character?.name}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>Nom : {props.character?.name}</span>
        <span>Attaque : {props.character?.attaque}</span>
        <span>Pts de Vie : {props.character?.pv}</span>
      </div>
    </div>
  );
}

export default CharacterProfile;
