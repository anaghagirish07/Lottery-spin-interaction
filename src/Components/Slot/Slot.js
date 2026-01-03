import Digit from "./Shared/Digit";

const Slot = ({ key, position, index, spinning, digits, slotHeight }) => {
  return (
    <div className="slot" key={key}>
      <div
        className="slot-inner"
        style={{
          transform: `translateY(-${position * slotHeight}px)`,
          transition: spinning
            ? `transform ${1.2 + index * 0.4}s cubic-bezier(0.1, 0.6, 0.2, 1)`
            : "none",
        }}
      >
        {digits.map((num, i) => (
          <Digit key={i} value={num} />
        ))}
      </div>
    </div>
  );
};

export default Slot;
