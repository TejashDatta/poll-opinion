import React from "react";

function Liker({ votes, handler, active, icon }) {
  return (
    <button className={`foot-btn ${active ? "active" : ""}`} onClick={handler}>
      {votes}
      <i className="material-icons right">{icon}</i>
    </button>
  );
}

export default Liker;
