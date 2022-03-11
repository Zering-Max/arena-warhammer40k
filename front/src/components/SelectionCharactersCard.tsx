import axios from "axios";
import { useState, useEffect, SetStateAction } from "react";
import { colors } from "../styles/colors";
import { Character } from "../interfaces/index";
import { seedCharacters } from "../utils/index";
import {
  BloodBox,
  BloodButton,
  BlueBox,
  Overflow,
} from "../styles/styledComponents";
import InputText from "./InputText";
import InputNumber from "./InputNumber";
import CharacterProfileCard from "./CharacterProfileCard";

function SelectionCharactersCard(props: {
  selectedToFight: Character[];
  changeSelectedToFight: (c: Character[]) => SetStateAction<Character[]> | void;
}) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [chosen, setChosen] = useState<number>(0);
  const [create, setCreate] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [attaque, setAttaque] = useState<number>(0);
  const [pv, setPv] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("characters");

      if (data.length === 0) {
        await axios.post("characters/mass", seedCharacters);
        const { data } = await axios.get("characters");
        setCharacters(data);
        props.changeSelectedToFight([data[0], data[1]]);
      } else {
        setCharacters(data);
      }
    })();
  }, []);

  const isButtonCanceled = (id: number) => {
    if (props.selectedToFight.length > 1) {
      if (props.selectedToFight.some((s: Character) => s.id === id)) {
        return false;
      }
      return true;
    }
    return false;
  };

  const submitCharacter = async () => {
    try {
      const { data } = await axios.post("characters", {
        name,
        attaque,
        pv,
        image,
      });

      setCharacters([...characters, data]);
      setCreate(false);
      setName("");
      setImage("");
      setAttaque(0);
      setPv(0);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCharacter = async (id: number) => {
    try {
      await axios.delete(`characters/${id}`);
      setCharacters(characters.filter((c: Character) => c.id !== id));
      setChosen(0);
    } catch (error) {
      console.log(error);
    }
  };

  const renderProfile = (id: number) => {
    if (id !== 0) {
      let character = characters.filter(c => c.id === id);

      return (
        <BlueBox spaceBetween width={60}>
          <CharacterProfileCard character={character[0]} />
          <BloodButton onClick={() => deleteCharacter(id)}>
            Supprimer le personnage
          </BloodButton>

          <button
            disabled={isButtonCanceled(id)}
            type="submit"
            onClick={() => {
              if (props.selectedToFight.some((s: Character) => s.id === id)) {
                let filtered = props.selectedToFight.filter(
                  (s: Character) => s.id !== id
                );
                props.changeSelectedToFight(filtered);
              } else {
                props.changeSelectedToFight([
                  ...props.selectedToFight,
                  character[0],
                ]);
              }
            }}
            style={{
              textAlign: "center",
              cursor: isButtonCanceled(id) ? "not-allowed" : "pointer",
              borderRadius: 8,
              border: isButtonCanceled(id)
                ? "1px solid lightgrey"
                : "1px solid gold",
              backgroundColor: isButtonCanceled(id)
                ? colors.darkgrey
                : colors.blood,
              padding: "4px 0 4px 0",
              color: isButtonCanceled(id) ? "black" : "white",
            }}
          >
            {props.selectedToFight.some((s: Character) => s.id === id)
              ? "Je ne veux plus combattre ! "
              : "Prêt à combattre !"}
          </button>
        </BlueBox>
      );
    }
  };

  return (
    <BloodBox medium>
      <BlueBox spaceBetween width={40}>
        <Overflow>
          <ul>
            {characters.map(c => (
              <li onClick={() => setChosen(c.id)} key={c.id}>
                {c.name}
              </li>
            ))}
          </ul>
        </Overflow>

        <BloodButton onClick={() => setCreate(!create)}>
          {" "}
          {create ? "Annuler le personnage" : "Créer un personnage"}
        </BloodButton>
      </BlueBox>
      {create ? (
        <BlueBox spaceBetween width={60}>
          <div>
            <InputText
              name="Nom"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <InputText
              name="Image Url"
              value={image}
              onChange={e => setImage(e.target.value)}
            />
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <InputNumber
                name="Attaque"
                value={attaque}
                setValue={value => setAttaque(value)}
                max="20"
                min="10"
              />
              <InputNumber
                name="Pts de Vie"
                value={pv}
                setValue={value => setPv(value)}
                max="40"
                min="20"
              />
            </div>
          </div>

          <BloodButton onClick={submitCharacter}>Valider</BloodButton>
        </BlueBox>
      ) : (
        renderProfile(chosen)
      )}
    </BloodBox>
  );
}

export default SelectionCharactersCard;
