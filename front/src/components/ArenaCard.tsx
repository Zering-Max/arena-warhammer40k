import { useState } from "react";
import { logObject } from "../interfaces";
import { colors } from "../styles/colors";
import CharacterFightCard from "./CharacterFightCard";
import { Character } from "../interfaces/index";
import { BlackArena, BloodBox, BlueBox } from "../styles/styledComponents";

function ArenaCard(props: { selectedToFight: Character[] }) {
  const [fightOn, setFigthOn] = useState<boolean>(false);
  const [fightLogs, setFightLogs] = useState<logObject | null>(null);

  const battle = (c1: Character, c2: Character) => {
    let log: string;
    let round: number = 0;
    let objectLog: logObject;
    let dice: number = Math.ceil(Math.random() * 6);
    //let tableLogs: logObject[] = [];
    let fight = setInterval(() => {
      if (dice < 4) {
        c2.pv -= c1.attaque;
        log = `${c1.name} vif comme l'eclair prend l'initiative et inflige ${c1.attaque} dégâts à ${c2.name} !`;
        round++;
        objectLog = { id: round, log };
        //tableLogs.push(objectLog);
        setFightLogs(objectLog);
      } else {
        c1.pv -= c2.attaque;
        log = `${c2.name} vif comme l'eclair prend l'initiative et inflige ${c2.attaque} dégâts à ${c1.name} !`;
        round++;
        objectLog = { id: round, log };
        //tableLogs.push(objectLog);
        setFightLogs(objectLog);
      }
      if (c1.pv <= 0) {
        log = `${c1.name} s'écroule et tombe raide mort.`;
        round++;
        objectLog = { id: round, log };
        //tableLogs.push(objectLog);
        setFightLogs(objectLog);

        clearInterval(fight);

        setTimeout(() => {
          setFigthOn(false);
          setFightLogs(null);
        }, 2000);
      } else if (c2.pv <= 0) {
        log = `${c2.name} s'écroule et tombe raide mort.`;
        round++;
        objectLog = { id: round, log };
        //tableLogs.push(objectLog);
        setFightLogs(objectLog);
        clearInterval(fight);

        setTimeout(() => {
          setFigthOn(false);
          setFightLogs(null);
        }, 2000);
      }
    }, 2000);
  };

  return (
    <BloodBox large>
      <BlueBox spaceBetween alignItems width={25}>
        {props.selectedToFight[0] ? (
          <CharacterFightCard character={props.selectedToFight[0]} />
        ) : (
          <span>Aucun combattant</span>
        )}
      </BlueBox>

      <BlueBox alignItems width={50}>
        <h4 style={{ marginTop: 0 }}>Arène de Commoragh</h4>
        <BlackArena>
          {fightOn && fightLogs && (
            <span style={{ padding: "0 1rem 0 1rem" }}>
              Round {fightLogs.id} : {fightLogs.log}
            </span>
          )}
          {fightOn === false ? (
            <button
              onClick={() => {
                setFigthOn(true);
                battle(props.selectedToFight[0], props.selectedToFight[1]);
              }}
              disabled={props.selectedToFight.length !== 2 ? true : false}
              style={{
                textAlign: "center",
                cursor:
                  props.selectedToFight.length !== 2
                    ? "not-allowed"
                    : "pointer",
                borderRadius: 8,
                border:
                  props.selectedToFight.length !== 2
                    ? "1px solid lightgrey"
                    : "1px solid gold",
                backgroundColor:
                  props.selectedToFight.length !== 2
                    ? colors.darkgrey
                    : colors.blood,
                padding: "4px 0 4px 0",
                width: 200,
                color: props.selectedToFight.length !== 2 ? "black" : "white",
              }}
            >
              Démarrer le combat
            </button>
          ) : null}
        </BlackArena>
      </BlueBox>
      <BlueBox alignItems spaceBetween width={25}>
        {props.selectedToFight[1] ? (
          <CharacterFightCard character={props.selectedToFight[1]} />
        ) : (
          <span>Aucun combattant</span>
        )}
      </BlueBox>
    </BloodBox>
  );
}

export default ArenaCard;
