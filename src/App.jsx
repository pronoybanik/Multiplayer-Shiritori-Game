import "./App.css";
import Scoreboard from "./components/Scoreboard";
import WordInput from "./components/WordInput";
import History from "./components/History";
import Controls from "./components/Controls";
import  useShiritoriGame  from "./hooks/useShiritoriGame";

function App() {
  const {
    players,
    setPlayerName,
    currentPlayer,
    history,
    error,
    isLoading,
    submitWord,
    secondsLeft,
    requiredStart,
    isRunning,
    setIsRunning,
    resetGame,
    minLength,
  } = useShiritoriGame({ initialTimer: 15, minLength: 4 });

  return (
    <div className="container">
      <header>
        <h1>Multiplayer Shiritori</h1>
        <p className="subtitle">
          Two players. Valid words only. Don’t run out of time.
        </p>
      </header>

      <section className="players">
        <div className="player-inputs">
          {players.map((p, idx) => (
            <div key={p.id} className="player-name-edit">
              <label>Name for {`Player ${idx + 1}`}:</label>
              <input
                type="text"
                defaultValue={p.name}
                onBlur={(e) => setPlayerName(idx, e.target.value)}
                placeholder={`Player ${idx + 1}`}
              />
            </div>
          ))}
        </div>
        <Scoreboard players={players} currentPlayer={currentPlayer} />
      </section>

      <section className="game-area">
        <Controls
          secondsLeft={secondsLeft}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          onReset={resetGame}
        />

        <WordInput
          onSubmit={submitWord}
          requiredStart={requiredStart}
          minLength={minLength}
          disabled={!isRunning}
          isLoading={isLoading}
        />

        {error && <div className="error">{error}</div>}

        <History words={history} />
      </section>

      <footer>
        <p>
          Dictionary powered by{" "}
          <a href="https://dictionaryapi.dev" target="_blank" rel="noreferrer">
            Free Dictionary API
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
