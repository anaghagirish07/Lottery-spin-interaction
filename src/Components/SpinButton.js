const SpinButton = ({ spinning, disableSpin, onSpin }) => {
  return (
    <button
      className="spin-btn"
      onClick={onSpin}
      disabled={spinning || disableSpin}
    >
      {spinning ? "SPINNING..." : "SPIN"}
    </button>
  );
};

export default SpinButton;
