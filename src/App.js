import { useState } from "react";
import "./App.css";

const DIGITS = Array.from({ length: 40 }, (_, i) => i % 10);
const SLOT_HEIGHT = 120;
const TOTAL_SLOTS = 6;
const FULL_ROUNDS = 3;

export default function App() {
  const [spinning, setSpinning] = useState(false);
  const [positions, setPositions] = useState(Array(TOTAL_SLOTS).fill(0));
  const [showPrize, setShowPrize] = useState(false);
  const [disableSpin, setDisableSpin] = useState(false);

  const getRandomDigit = () => Math.floor(Math.random() * 10);

  const spin = () => {
    if (spinning) return;

    setSpinning(true);
    setShowPrize(false);

    const finalNumbers = Array.from({ length: TOTAL_SLOTS }, getRandomDigit);

    finalNumbers.forEach((finalDigit, index) => {
      const totalSteps = FULL_ROUNDS * 10 + finalDigit;

      const duration = 1200 + index * 400;

      setTimeout(() => {
        setPositions((prev) => {
          const updated = [...prev];
          updated[index] = totalSteps;
          return updated;
        });

        if (index === TOTAL_SLOTS - 1) {
          setTimeout(() => {
            setSpinning(false);
            setShowPrize(true);
            setDisableSpin(true);
          }, duration);
        }
      }, index * 300);
    });
  };

  return (
    <div className="screen">
      {showPrize && <h1 className="title">CONGRATULATIONS</h1>}
      {showPrize && <h2 className="prize-text">1st Prize</h2>}

      <div className="slot-container">
        {positions.map((pos, index) => (
          <div className="slot" key={index}>
            <div
              className="slot-inner"
              style={{
                transform: `translateY(-${pos * SLOT_HEIGHT}px)`,
                transition: spinning
                  ? `transform ${
                      1.2 + index * 0.4
                    }s cubic-bezier(0.1, 0.6, 0.2, 1)`
                  : "none",
              }}
            >
              {DIGITS.map((num, i) => (
                <div className="digit" key={i}>
                  {num}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        className="spin-btn"
        onClick={spin}
        disabled={spinning || disableSpin}
      >
        {spinning ? "SPINNING..." : "SPIN"}
      </button>
    </div>
  );
}
