import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Character, CreateCharacter } from "../interfaces/index";
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
import { ArenaContext } from "../context/index";

function SelectionCharactersCard() {
  //const [characters, setCharacters] = useState<Character[]>([]);
  const [chosen, setChosen] = useState<number>(0);
  const [create, setCreate] = useState<boolean>(false);
  const [createCharacter, setCreateCharacter] = useState<CreateCharacter>({
    name: "",
    image: "",
    attaque: 10,
    pv: 20,
  });
  const { state, dispatch } = useContext(ArenaContext);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("characters");
      if (data.length === 0) {
        await axios.post("characters/mass", seedCharacters);
        const { data } = await axios.get("characters");
        //setCharacters(data);
        dispatch({
          type: "SET_CHARACTERS",
          payload: data,
        });

        dispatch({
          type: "SET_SELECTEDTOFIGHT",
          payload: [data[0], data[1]],
        });
      } else {
        dispatch({
          type: "SET_CHARACTERS",
          payload: data,
        });
        //setCharacters(data);
      }
    })();
  }, []);

  const submitCharacter = async () => {
    try {
      const { data } = await axios.post("characters", {
        name: createCharacter.name,
        attaque: createCharacter.attaque,
        pv: createCharacter.pv,
        image: createCharacter.image,
      });
      dispatch({
        type: "SET_CHARACTERS",
        payload: [...state.characters, data],
      });
      setCreate(false);
      setCreateCharacter({
        name: "",
        image: "",
        attaque: 10,
        pv: 20,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BloodBox medium>
      <BlueBox spaceBetween width={40}>
        <Overflow>
          <ul>
            {state.characters.map(c => (
              <li
                onClick={() => {
                  if (create) {
                    setChosen(c.id);
                    setCreate(!create);
                  } else {
                    setChosen(c.id);
                  }
                }}
                key={c.id}
              >
                {c.name}
              </li>
            ))}
          </ul>
        </Overflow>

        <BloodButton
          onClick={() => {
            if (chosen !== 0) {
              setCreate(!create);
              setChosen(0);
            } else {
              setCreate(!create);
            }
          }}
        >
          {" "}
          {create ? "Annuler le personnage" : "Créer un personnage"}
        </BloodButton>
      </BlueBox>
      {create ? (
        <BlueBox spaceBetween width={60}>
          <div>
            <InputText
              name="Nom"
              value={createCharacter.name}
              onChange={e =>
                setCreateCharacter({
                  name: e.target.value,
                  image: createCharacter.image,
                  pv: createCharacter.pv,
                  attaque: createCharacter.attaque,
                })
              }
            />
            <InputText
              name="Image Url"
              value={createCharacter.image}
              onChange={e =>
                setCreateCharacter({
                  name: createCharacter.name,
                  image: e.target.value,
                  pv: createCharacter.pv,
                  attaque: createCharacter.attaque,
                })
              }
            />
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <InputNumber
                name="Attaque"
                value={createCharacter.attaque}
                setValue={value =>
                  setCreateCharacter({
                    name: createCharacter.name,
                    image: createCharacter.image,
                    pv: createCharacter.pv,
                    attaque: value,
                  })
                }
                max="20"
                min="10"
              />
              <InputNumber
                name="Pts de Vie"
                value={createCharacter.pv}
                setValue={value =>
                  setCreateCharacter({
                    name: createCharacter.name,
                    image: createCharacter.image,
                    pv: value,
                    attaque: createCharacter.attaque,
                  })
                }
                max="40"
                min="20"
              />
            </div>
          </div>

          <BloodButton onClick={submitCharacter}>Valider</BloodButton>
        </BlueBox>
      ) : chosen !== 0 ? (
        <CharacterProfileCard id={chosen} resetChosen={() => setChosen(0)} />
      ) : null}
    </BloodBox>
  );
}

export default SelectionCharactersCard;
