import { useContext } from "react";
import { Character } from "../interfaces/index";
import CharacterProfile from "./CharacterProfile";
import { BlueBox, BloodButton } from "../styles/styledComponents";
import axios from "axios";
import { ArenaContext } from "../context/index";
import { colors } from "../styles/colors";

function CharacterProfileCard(props: { id: number; resetChosen: () => void }) {
  const { state, dispatch } = useContext(ArenaContext);

  const isButtonCanceled = (id: number) => {
    if (state.selectedToFight.length > 1) {
      if (state.selectedToFight.some((s: Character) => s.id === id)) {
        return false;
      }
      return true;
    }
    return false;
  };

  const deleteCharacter = async (id: number) => {
    try {
      await axios.delete(`characters/${id}`);
      dispatch({
        type: "SET_CHARACTERS",
        payload: state.characters.filter((c: Character) => c.id !== id),
      });
      props.resetChosen();
    } catch (error) {
      console.log(error);
    }
  };

  let character = state.characters.filter(c => c.id === props.id);

  return (
    <BlueBox spaceBetween width={60}>
      <CharacterProfile character={character[0]} />
      <BloodButton onClick={() => deleteCharacter(props.id)}>
        Supprimer le personnage
      </BloodButton>

      <button
        disabled={isButtonCanceled(props.id)}
        type="submit"
        onClick={() => {
          if (state.selectedToFight.some((s: Character) => s.id === props.id)) {
            let filtered = state.selectedToFight.filter(
              (s: Character) => s.id !== props.id
            );
            dispatch({
              type: "SET_SELECTEDTOFIGHT",
              payload: filtered,
            });
          } else {
            dispatch({
              type: "SET_SELECTEDTOFIGHT",
              payload: [...state.selectedToFight, character[0]],
            });
          }
        }}
        style={{
          textAlign: "center",
          cursor: isButtonCanceled(props.id) ? "not-allowed" : "pointer",
          borderRadius: 8,
          border: isButtonCanceled(props.id)
            ? "1px solid lightgrey"
            : "1px solid gold",
          backgroundColor: isButtonCanceled(props.id)
            ? colors.darkgrey
            : colors.blood,
          padding: "4px 0 4px 0",
          color: isButtonCanceled(props.id) ? "black" : "white",
        }}
      >
        {state.selectedToFight.some((s: Character) => s.id === props.id)
          ? "Je ne veux plus combattre ! "
          : "Prêt à combattre !"}
      </button>
    </BlueBox>
  );
}

export default CharacterProfileCard;
