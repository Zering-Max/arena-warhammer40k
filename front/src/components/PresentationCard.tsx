import React from "react";
import { colors } from "../styles/colors";
import { BloodBox } from "../styles/styledComponents";

function PresentationCard() {
  return (
    <BloodBox>
      <div style={{ width: 200 }}>
        <img
          src="https://img-9gag-fun.9cache.com/photo/ax1rv9p_460s.jpg"
          alt="drukhari"
          style={{ width: "100%", height: "100%", borderRadius: 8 }}
        />
      </div>
      <p
        style={{
          fontStyle: "italic",

          fontSize: "0.9rem",
          marginLeft: "1rem",
          fontFamily: "Charm, cursive",
        }}
      >
        Bienvenue à l'arène de Commoragh, la meilleure et la plus connue de
        l'ensemble des galaxies réuni depuis ses 20 000 dernières années...
        Admirez le spectacle extatique et le sang versé pour notre plus grand
        divertissement. Futurs gladiateurs, je suis Akaban le gérant de cette
        arène et j'en suis responsable depuis des siècles, alors pas de manières
        et que le sang coule...
      </p>
    </BloodBox>
  );
}

export default PresentationCard;
