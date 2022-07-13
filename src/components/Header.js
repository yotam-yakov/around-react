import aroundLogoPath from "../images/around-logo.svg";

export default function Header() {
  return (
    <header className="header">
      <img src={aroundLogoPath} alt="Around the us logo" className="logo" />
    </header>
  );
}
