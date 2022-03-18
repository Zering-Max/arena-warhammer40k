import { logObject } from "../interfaces";
import { colors } from "../styles/colors";
import { BloodButton } from "../styles/styledComponents";

function LogModal(props: { recapLogs: logObject[]; close: () => void }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "45%",
        right: "25%",
        backgroundColor: colors.darkblue,
        borderRadius: 8,
        border: "1px solid gold",
        padding: 8,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h4 style={{ textAlign: "center" }}>Recapitulatif Combat</h4>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "1rem",
        }}
      >
        {props.recapLogs.map(log => (
          <span style={{ marginBottom: 8 }} key={log.id}>
            Round {log.id} : {log.log}
          </span>
        ))}
      </div>
      <BloodButton onClick={props.close}>Fermer</BloodButton>
    </div>
  );
}

export default LogModal;
