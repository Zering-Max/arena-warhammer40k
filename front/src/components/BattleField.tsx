import { useContext, useEffect, useState } from "react";
import { Character, logObject } from "../interfaces";
import { BlackArena } from "../styles/styledComponents";
import { colors } from "../styles/colors";
import { ArenaContext } from "../context/index";
import { BattleContext } from "../context/battle";
import LogModal from "./LogModal";

function BattleField(props: {}) {
  const { state } = useContext(ArenaContext);
  const { state: stateBattle, dispatch } = useContext(BattleContext);
  const [fightOn, setFigthOn] = useState<string>("End");
  const [fightLog, setFightLog] = useState<logObject | null>(null);
  const [recapLogs, setRecapLogs] = useState<logObject[]>([]);

  const battle = (c1: Character, c2: Character) => {
    let log: string;
    let round: number = 0;
    let objectLog: logObject;

    let tableLogs: logObject[] = [];
    let fight = setInterval(() => {
      let dice: number = Math.ceil(Math.random() * 6);
      if (dice < 4 && c1.pv > 0 && c2.pv > 0) {
        c2.pv -= c1.attaque;
        log = `${c1.name} vif comme l'eclair prend l'initiative et inflige ${c1.attaque} dégâts à ${c2.name} !`;
        round++;
        objectLog = { id: round, log };
        tableLogs.push(objectLog);
        setFightLog(objectLog);
      } else if (dice >= 4 && c1.pv > 0 && c2.pv > 0) {
        c1.pv -= c2.attaque;
        log = `${c2.name} vif comme l'eclair prend l'initiative et inflige ${c2.attaque} dégâts à ${c1.name} !`;
        round++;
        objectLog = { id: round, log };
        tableLogs.push(objectLog);
        setFightLog(objectLog);
      }

      if (c1.pv <= 0 || c2.pv <= 0) {
        clearInterval(fight);
        setTimeout(() => {
          if (c1.pv <= 0) {
            log = `${c1.name} s'écroule, hors d'état de nuire.`;
            round++;
            objectLog = { id: round, log };
            tableLogs.push(objectLog);
            setFightLog(objectLog);
          } else {
            log = `${c2.name} s'écroule, hors d'état de nuire.`;
            round++;
            objectLog = { id: round, log };
            tableLogs.push(objectLog);
            setFightLog(objectLog);
          }
        }, 2000);
        setTimeout(() => {
          setFigthOn("Recap");
          setFightLog(null);
          setRecapLogs(tableLogs);
        }, 4000);
      }
    }, 2000);
  };

  useEffect(() => {
    dispatch({
      type: "SET_CHARACTERS_INBATTLE",
      payload: state.selectedToFight,
    });
  }, [state.selectedToFight]);

  return (
    <>
      <h4 style={{ marginTop: 0 }}>Arène de Commoragh</h4>
      <BlackArena>
        {fightOn === "Go" && fightLog && (
          <span style={{ padding: "0 1rem 0 1rem" }}>
            Round {fightLog.id} : {fightLog.log}
          </span>
        )}
        {fightOn === "End" || fightOn === "Recap" ? (
          <button
            onClick={() => {
              setFigthOn("Go");
              battle(
                stateBattle.charactersInBattle[0],
                stateBattle.charactersInBattle[1]
              );
            }}
            disabled={
              state.selectedToFight.length !== 2 ||
              stateBattle.charactersInBattle.some((c: Character) => c.pv <= 0)
                ? true
                : false
            }
            style={{
              textAlign: "center",
              cursor:
                state.selectedToFight.length !== 2 ||
                stateBattle.charactersInBattle.some((c: Character) => c.pv <= 0)
                  ? "not-allowed"
                  : "pointer",
              borderRadius: 8,
              border:
                state.selectedToFight.length !== 2 ||
                stateBattle.charactersInBattle.some((c: Character) => c.pv <= 0)
                  ? "1px solid lightgrey"
                  : "1px solid gold",
              backgroundColor:
                state.selectedToFight.length !== 2 ||
                stateBattle.charactersInBattle.some((c: Character) => c.pv <= 0)
                  ? colors.darkgrey
                  : colors.blood,
              padding: "4px 0 4px 0",
              width: "80%",
              color:
                state.selectedToFight?.length !== 2 ||
                stateBattle.charactersInBattle.some((c: Character) => c.pv <= 0)
                  ? "black"
                  : "white",
            }}
          >
            Démarrer le combat
          </button>
        ) : null}
        {fightOn === "Recap" ? (
          <LogModal close={() => setFigthOn("End")} recapLogs={recapLogs} />
        ) : null}
      </BlackArena>
    </>
  );
}

export default BattleField;
