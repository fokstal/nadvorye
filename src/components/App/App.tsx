import { FC, useEffect, useRef, useState } from "react";
import WeatherModel from "../../models/WeatherModel";
import { weatherData_Minsk } from "../../assets/weatherData";
import WeatherApi from "../../service/WeatherApi";
import { WeatherApiConfig } from "../../app.config";
import "./App.scss";
import background from "../../assets/images/road_asphalt_rain.jpg";
import getDominantColor from "../../helpers/getDominantColor";
import Language, { LanguageFlags } from "../../const/Language";
import convertDateFrom_ISO8601 from "../../helpers/convertDateFrom_ISO8601";

const App: FC = () => {
    const [weather, setWeather] = useState<WeatherModel>();
    const [currentCity, setCurrentCity] = useState("Minsk");
    const [currentLang, setCurrentLang] = useState(Language.EN);
    const [dominantColor, setDominantColor] = useState("transparent");
    const [isUseApi, setIsUseApi] = useState(false);

    const weatherApi = new WeatherApi(WeatherApiConfig.KEY, WeatherApiConfig.HOST, currentLang);
    const languagesArray = Object.values(Language);

    const imgBackgroundRef = useRef<HTMLImageElement | null>(null);
    const searchInputRef = useRef<HTMLInputElement | null>(null);

    const fetchCurrentWeather = async () => {
        if (isUseApi) {
            setWeather(await weatherApi.getCurrent(currentCity));
            return;
        }

        setWeather(WeatherApi.convertJSONToWeatherModel(weatherData_Minsk.currentAt_211224));
    };

    const nextLanguage = () => {
        const currentIndex = languagesArray.indexOf(currentLang);
        const nextIndex = (currentIndex + 1) % languagesArray.length;
        setCurrentLang(languagesArray[nextIndex]);
    };

    useEffect(() => {
        fetchCurrentWeather();

        const imgBackground = imgBackgroundRef.current;
        const searchInput = searchInputRef.current;

        if (imgBackground) {
            imgBackground.onload = () => {
                setDominantColor(getDominantColor(imgBackground));
            };
        }

        if (searchInput)
            searchInput.value = "";

    }, [])

    return (
        <>
            <input type="checkbox" name="" id="" checked={isUseApi} onChange={() => setIsUseApi(prevChecked => !prevChecked)} />
            <div className="weather-widget">
                <img className="weather-widget__background" src={background} ref={imgBackgroundRef} />
                {
                    weather &&
                    <div className="weather-widget__body">
                        <div className="weather-widget__body-content">
                            <h1 className="weather-widget__body-content-title">
                                Nadvorye
                            </h1>
                            <div className="weather-widget__body-content-info">
                                <span className="weather-widget__body-content-info-temp">
                                    {weather.current.temp_c}&deg;C
                                </span>
                                <div className="weather-widget__body-content-info-add">
                                    <span className="weather-widget__body-content-info-add-city">
                                        {/* {weather.location.name} */}
                                        {currentCity}
                                    </span>
                                    <span className="weather-widget__body-content-info-add-date">
                                        {convertDateFrom_ISO8601(weather.current.last_updated, currentLang)}
                                    </span>
                                </div>
                                <img className="weather-widget__body-content-info-icon" src={weather.current.condition.icon} />
                            </div>
                        </div>
                        <div className="weather-widget__body-menu">
                            <form className="weather-widget__body-menu-search">
                                <input className="weather-widget__body-menu-search-input" type="text" name="" id="searchTextBox" ref={searchInputRef} onChange={(e) => setCurrentCity(e.target.value)} />
                                <button className="weather-widget__body-menu-search-btn" type="button" style={{ background: dominantColor }} onClick={() => fetchCurrentWeather()}>
                                    🔍
                                </button>
                            </form>
                            <div className="weather-widget__body-menu-details">
                                <ul className="weather-widget__body-menu-details-list">
                                    <li className="weather-widget__body-menu-details-list-item">
                                        Feels like: {weather.current.feelslike_c}&deg;C
                                    </li>
                                    <li className="weather-widget__body-menu-details-list-item">
                                        Wind: {weather.current.wind_kph} kph
                                    </li>
                                    <li className="weather-widget__body-menu-details-list-item">
                                        Humidity: {weather.current.humidity}
                                    </li>
                                    <li className="weather-widget__body-menu-details-list-item">
                                        Cloud: {weather.current.cloud}
                                    </li>
                                    <li className="weather-widget__body-menu-details-list-item">
                                        Condition text: {weather.current.condition.text}
                                    </li>
                                </ul>
                            </div>
                            <div className="weather-widget__body-menu-control">
                                <div className="weather-widget__body-menu-control-lang" onClick={() => nextLanguage()}>
                                    {LanguageFlags[currentLang]}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    );
}

export default App;
