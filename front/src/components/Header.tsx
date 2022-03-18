import { colors } from "../styles/colors";

function Header() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-around",

        backgroundColor: colors.darkblue,
        alignItems: "center",
        paddingTop: 4,
        height: 65,
        borderBottom: "1px solid gold",
      }}
    >
      <h1>Nexus Arena</h1>
      <span style={{ fontStyle: "italic" }}>
        Crée un personnage, prends une arme et viens te battre !
      </span>
    </header>
  );
}

export default Header;
