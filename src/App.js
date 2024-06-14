import { useState } from "react";
import { CiLight } from "react-icons/ci";
import { MdOutlineDarkMode } from "react-icons/md";
import "./App.css";

function App() {
  const [darkTheme, setDarkTheme] = useState(false);

  const changeTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const bgColor = darkTheme ? "dark-bg" : "light-bg";
  const websiteImage = darkTheme
    ? "https://res.cloudinary.com/dlefoxknm/image/upload/v1718387557/dark-website-logo_ez47g9.png"
    : "https://res.cloudinary.com/dlefoxknm/image/upload/v1718382826/know-weather-website-logo.png";

  return (
    <div className={`app-main-container ${bgColor}`}>
      <header className="header-container">
        <div>
          <img src={websiteImage} alt="website logo" className="website-logo" />
          <h1 className="website-name">Know Weather</h1>
        </div>
        <div>
          <button
            onClick={changeTheme}
            className={`theme-button ${darkTheme ? "dark" : "light"}`}
          >
            {darkTheme ? (
              <MdOutlineDarkMode size={35} color="#00abee" />
            ) : (
              <CiLight size={35} color="#fffb1c" />
            )}
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
