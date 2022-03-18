import { useContext } from "react";
import CharacterFightCard from "./CharacterFightCard";
import { BloodBox, BlueBox } from "../styles/styledComponents";
import { ArenaContext } from "../context/index";
import BattleField from "./BattleField";

function ArenaCard() {
  const { state } = useContext(ArenaContext);

  return (
    <BloodBox large>
      <BlueBox spaceBetween alignItems width={25}>
        {state.selectedToFight[0] ? (
          <CharacterFightCard character={state.selectedToFight[0]} />
        ) : (
          <span>Aucun combattant</span>
        )}
      </BlueBox>

      <BlueBox alignItems width={50}>
        <BattleField />
      </BlueBox>
      <BlueBox alignItems spaceBetween width={25}>
        {state.selectedToFight[1] ? (
          <CharacterFightCard character={state.selectedToFight[1]} />
        ) : (
          <span>Aucun combattant</span>
        )}
      </BlueBox>
    </BloodBox>
  );
}

export default ArenaCard;
