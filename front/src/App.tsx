import { useState, useEffect, SyntheticEvent } from "react";
import "./App.css";
import ArenaCard from "./components/ArenaCard";
import Header from "./components/Header";
import PresentationCard from "./components/PresentationCard";
import SelectionCharactersCard from "./components/SelectionCharactersCard";
import { Character } from "./interfaces/index";
import { MainPageContainer } from "./styles/styledComponents";

function App() {
  const [selectedToFight, setSelectedToFight] = useState<Character[]>([]);

  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <MainPageContainer>
        <PresentationCard />
        <SelectionCharactersCard
          selectedToFight={selectedToFight}
          changeSelectedToFight={(c: Character[]) => setSelectedToFight(c)}
        />
        <ArenaCard selectedToFight={selectedToFight} />
      </MainPageContainer>
    </div>
  );
}

export default App;
