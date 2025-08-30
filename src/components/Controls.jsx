const Controls = ({ secondsLeft, isRunning, setIsRunning, onReset }) => {
  return (
    <div className="controls">
      <div className={`timer ${secondsLeft <= 3 ? "warning" : ""}`}>
        ⏳ {secondsLeft}s
      </div>
      <div className="buttons">
        <button onClick={() => setIsRunning((v) => !v)}>
          {isRunning ? "Pause" : "Resume"}
        </button>
        <button onClick={onReset} className="secondary">
          Reset
        </button>
      </div>
    </div>
  );
};


export default Controls;