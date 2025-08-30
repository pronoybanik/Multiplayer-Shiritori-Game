const History =({ words }) => {
  if (!words.length)
    return (
      <div className="history empty">
        No words yet. The game starts when a valid word is entered.
      </div>
    );
  return (
    <div className="history">
      <h3>Word History</h3>
      <ul>
        {words.map((w, idx) => (
          <li key={idx}>
            <span className="chip">
              <span className="first">{w[0]}</span>
              <span className="word">{w.slice(1, -1)}</span>
              <span className="last">{w.slice(-1)}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
