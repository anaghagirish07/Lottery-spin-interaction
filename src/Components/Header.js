const Header = ({ showPrize }) => {
  if (!showPrize) return null;

  return (
    <>
      <h1 className="title">CONGRATULATIONS</h1>
      <h2 className="prize-text">1st Prize</h2>
    </>
  );
};

export default Header;
