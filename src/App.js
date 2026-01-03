import { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import Slot from "./Components/Slot/Slot";
import SpinButton from "./Components/SpinButton";

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
      <Header showPrize={showPrize} />

      <div className="slot-container">
        {positions.map((pos, index) => (
          <Slot
            key={index}
            position={pos}
            index={index}
            spinning={spinning}
            digits={DIGITS}
            slotHeight={SLOT_HEIGHT}
          />
        ))}
      </div>

      <SpinButton spinning={spinning} disableSpin={disableSpin} onSpin={spin} />
    </div>
  );
}
