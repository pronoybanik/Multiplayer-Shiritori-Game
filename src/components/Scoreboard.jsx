const Scoreboard =({ players, currentPlayer }) => {
  return (
    <div className="scoreboard">
      {players.map((p, idx) => (
        <div
          key={p.id}
          className={`player ${idx === currentPlayer ? "active" : ""}`}
        >
          <div className="name-row">
            <span className="name">{p.name}</span>
            {idx === currentPlayer && <span className="badge">Your turn</span>}
          </div>
          <div className="score">Score: {p.score}</div>
        </div>
      ))}
    </div>
  );
}

export default Scoreboard;
