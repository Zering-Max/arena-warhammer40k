import "./App.css";
import ArenaCard from "./components/ArenaCard";
import Header from "./components/Header";
import PresentationCard from "./components/PresentationCard";
import SelectionCharactersCard from "./components/SelectionCharactersCard";
import { ArenaProvider } from "./context";
import { BattleProvider } from "./context/battle";
import { MainPageContainer } from "./styles/styledComponents";

function App() {
  console.log("rendered App");
  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <MainPageContainer>
        <PresentationCard />
        <ArenaProvider>
          <SelectionCharactersCard />
          <BattleProvider>
            <ArenaCard />
          </BattleProvider>
        </ArenaProvider>
      </MainPageContainer>
    </div>
  );
}

export default App;
