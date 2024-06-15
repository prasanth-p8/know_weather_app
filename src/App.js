import { useState, useEffect } from "react";
import { format } from "date-fns";
import { MagnifyingGlass } from "react-loader-spinner";
import { CiLight } from "react-icons/ci";
import { MdOutlineDarkMode } from "react-icons/md";
import { FaXTwitter, FaLinkedin, FaGithub } from "react-icons/fa6";
import { FaSearchLocation } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import "./App.css";

// api constants variable used to render different views
const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

// application is build using functional component
function App() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [date, setDate] = useState(new Date());
  const [emptySearch, setEmptySearch] = useState(true);
  const [showError, setShowError] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [apiStatus, setApiStatus] = useState({
    status: apiConstants.initial,
    locationData: null,
    error: null,
  });

  // function to collect the user input text from input element
  const changeInput = (event) => {
    setShowError(false);
    setSearchInput(event.target.value);
  };

  // function used to toggle application theme
  const changeTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const bgColor = darkTheme ? "dark-bg" : "light-bg";
  const socialLinks = darkTheme ? "dark-icons" : "light-icons";

  const websiteImage = darkTheme
    ? "https://res.cloudinary.com/dlefoxknm/image/upload/v1718387557/dark-website-logo_ez47g9.png"
    : "https://res.cloudinary.com/dlefoxknm/image/upload/v1718382826/know-weather-website-logo.png";

  // funciton triggered on a successful request from the api call
  const onSuccess = (data) => {
    // formatting data from api request to necessary format
    const formattedData = {
      cityName: data.name,
      feelsLike: data.main.feels_like,
      countryCode: data.sys.country,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      weatherDescription: data.weather[0].description,
    };
    setApiStatus({
      status: apiConstants.success,
      locationData: formattedData,
      error: null,
    });
  };

  // funciton triggered on a failure request from the api call
  const onFailure = (data) => {
    if (data.cod === "404") {
      setApiStatus({
        status: apiConstants.failure,
        locationData: null,
        error: data.message,
      });
    }
  };

  // funciton executed when user press "ENTER" key
  const searchWeather = (event) => {
    if (event.key === "Enter") {
      if (searchInput !== "") {
        getLocation();
      } else {
        setShowError(true);
      }
    }
  };

  // funciton executed when user clicks the search button
  const getLocationDetails = () => {
    if (searchInput !== "") {
      getLocation();
    } else {
      setShowError(true);
    }
  };

  // function using fetch method to get data from open weather api with "GET" method and API Key
  const getLocation = async () => {
    setEmptySearch(false);
    setApiStatus({
      status: apiConstants.inProgress,
      locationData: null,
      error: null,
    });
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=48549d1ec6a27f80687f72b92ba7dd76&units=metric`;

    const response = await fetch(url);
    const responseData = await response.json();

    if (response.ok) {
      onSuccess(responseData);
    } else {
      onFailure(responseData);
    }
  };

  // while fetching the data renderLoadingView function will be executed until getting data
  const renderLoadingView = () => (
    <div className="displaying-container">
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="magnifying-glass-loading"
        wrapperClass="magnifying-glass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
    </div>
  );

  // useEffect Hook is used to calculate current date and time for each second.
  useEffect(() => {
    const timerId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
      console.log("removed time");
    };
  }, []);

  // on successful request renderSuccessView function will be executed
  const renderSuccessView = () => {
    const { locationData } = apiStatus;
    const {
      cityName,
      feelsLike,
      countryCode,
      temperature,
      humidity,
      windSpeed,
      weatherDescription,
    } = locationData;

    // current date is formatted using format function import from "date-fns"
    const currentDate = format(date.toLocaleDateString(), "do MMM yyyy");
    const currentTime = date.toLocaleTimeString();
    const darkTemp = darkTheme ? "dark-temp-heading" : "";
    const darkExtraInfoBg = darkTheme ? "dark-extra-info-bg" : "";

    return (
      <div className="success-view-container">
        <div className="top-container">
          <h1 className={`temperature-heading ${darkTemp}`}>{temperature}°C</h1>
          <p className="weather-description">{weatherDescription}</p>
        </div>
        <div className="center-container">
          <p className="current-date">{currentDate}</p>
          <h1 className="city-heading">
            {cityName}, <span className="country-code">{countryCode}</span>
          </h1>
          <p className="current-time">{currentTime}</p>
        </div>
        <div className="bottom-container">
          <ul className={`extra-info-list ${darkExtraInfoBg}`}>
            <li className="extra-info-item">
              <p>Feels Like</p>
              <p>{feelsLike}°C</p>
            </li>
            <li className="extra-info-item">
              <p>Humidity</p>
              <p>{humidity}</p>
            </li>
            <li className="extra-info-item">
              <p>Wind Speed</p>
              <p>{windSpeed}</p>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  // on request failure renderFailureView function will be executed
  const renderFailureView = () => {
    const { error } = apiStatus;
    return (
      <div className="displaying-container">
        <img
          src="https://res.cloudinary.com/dlefoxknm/image/upload/v1718443294/detective-woman-concept-illustration_u9qmq8.png"
          alt="city not found"
          className="city-not-found-image"
        />
        <h1 className="error-heading">{error}</h1>
        <p className="failure-view-description">
          Try &nbsp; with &nbsp; valid &nbsp; city &nbsp; name
        </p>
      </div>
    );
  };

  // renderWeatherDetails using switch case to display differenet views with the help of api status
  const renderWeatherDetails = () => {
    const { status } = apiStatus;

    switch (status) {
      case apiConstants.inProgress:
        return renderLoadingView();
      case apiConstants.success:
        return renderSuccessView();
      case apiConstants.failure:
        return renderFailureView();
      default:
        return null;
    }
  };

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
            className={`theme-button-md ${darkTheme ? "dark" : "light"}`}
          >
            {darkTheme ? (
              <MdOutlineDarkMode size={35} color="#00abee" />
            ) : (
              <CiLight size={35} color="#fffb1c" />
            )}
          </button>
          <button
            onClick={changeTheme}
            className={`theme-button-lg ${darkTheme ? "dark" : "light"}`}
          >
            {darkTheme ? "Dark Theme" : "Light Theme"}
          </button>
        </div>
      </header>
      <div className="search-bar-main-container">
        <div className="seach-bar-container">
          <input
            type="search"
            placeholder="Enter the City Name"
            className="search-input"
            value={searchInput}
            onKeyDown={searchWeather}
            onChange={changeInput}
          />
          <button className="search-button" onClick={getLocationDetails}>
            <FaSearchLocation size={20} color="#616161" />
          </button>
        </div>
        {showError && (
          <p className="error-msg">*Enter a city name to search.</p>
        )}
      </div>
      <div>{renderWeatherDetails()}</div>
      {emptySearch && (
        <div className="displaying-container">
          <img
            src="https://res.cloudinary.com/dlefoxknm/image/upload/v1718439934/search_image_fy14oq.png"
            alt="start search"
            className="start-search-image"
          />
          <h1 className="start-search-heading">
            Search for a city weather details
          </h1>
        </div>
      )}
      <footer className="footer-container">
        <p>Follow Us</p>
        <ul className="foooter-icons-list">
          <li>
            <a
              href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=prasanthberlin@gmail.com"
              className={socialLinks}
            >
              <SiGmail />
            </a>
          </li>
          <li>
            <a href="https://x.com/prasanth0821" className={socialLinks}>
              <FaXTwitter />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/p-prasanth/"
              className={socialLinks}
            >
              <FaLinkedin />
            </a>
          </li>
          <li>
            <a href="https://github.com/prasanth-p8" className={socialLinks}>
              <FaGithub />
            </a>
          </li>
        </ul>
        <p>Copyright © 2024 Know Weather, Inc.</p>
      </footer>
    </div>
  );
}

export default App;
