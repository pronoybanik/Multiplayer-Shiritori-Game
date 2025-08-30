import { useEffect, useRef, useState } from "react";

const WordInput = ({
  onSubmit,
  requiredStart,
  minLength,
  disabled,
  isLoading,
}) => {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

//   console.log("p1", value);

  

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [requiredStart, disabled]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    const res = await onSubmit(value.trim());
    if (res?.success) setValue("");
  };

  return (
    <form className="word-input" onSubmit={handleSubmit}>
      <label>
        Enter a word {requiredStart ? `(starts with '${requiredStart}')` : ""}
      </label>
      <div className="input-row">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          minLength={minLength}
          disabled={disabled || isLoading}
          placeholder={
            requiredStart ? `e.g. ${requiredStart}...` : "Start the game"
          }
        />
        <button type="submit" disabled={disabled || isLoading}>
          {isLoading ? "Checking..." : "Submit"}
        </button>
      </div>
      <small>
        Words must be at least {minLength} letters and valid English words.
      </small>
    </form>
  );
};


export default WordInput;