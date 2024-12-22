import { FC, useState, useEffect, useRef } from "react";
import WeatherModel from "../../models/WeatherModel";
import { weatherData_Minsk } from "../../assets/weatherData";
import WeatherApi from "../../service/WeatherApi";
import { WeatherApiConfig } from "../../app.config";
import "./App.scss";
import getDominantColorInHex from "../../helpers/getDominantColor";
import Language from "../../const/Language";
import convertDateFrom_ISO8601 from "../../helpers/convertDateFrom_ISO8601";
import background from "../../assets/images/louise_lake_mountains.jpg";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

const App: FC = () => {
    const [weather, setWeather] = useState<WeatherModel>();
    const [currentCity, setCurrentCity] = useState("Minsk");
    const [currentLang, setCurrentLang] = useState(Language.EN);
    const [dominantColor, setDominantColor] = useState("transparent");
    const [isUseApi, setIsUseApi] = useState(false);

    const weatherApi = new WeatherApi(WeatherApiConfig.KEY, WeatherApiConfig.HOST, currentLang);

    const imgBackgroundRef = useRef<HTMLImageElement | null>(null);
    const searchCityInputRef = useRef<HTMLInputElement | null>(null);

    const fetchCurrentWeather = async () => {
        const searchCityInput = searchCityInputRef.current;

        if (isUseApi) {
            setWeather(await weatherApi.getCurrent(currentCity));
            return;
        }

        setWeather(WeatherApi.convertJSONToWeatherModel(weatherData_Minsk.currentAt_211224));

        if (searchCityInput) searchCityInput.value = "";
    };

    useEffect(() => {
        fetchCurrentWeather();

        const imgBackground = imgBackgroundRef.current;

        if (imgBackground) {
            imgBackground.onload = () => {
                setDominantColor(getDominantColorInHex(imgBackground));
            };
        }
    }, []);

    return (
        <>
            <input
                type="checkbox"
                name=""
                id=""
                checked={isUseApi}
                onChange={() => setIsUseApi((prevChecked) => !prevChecked)}
            />
            <div className="weather">
                <img className="weather__background" src={background} ref={imgBackgroundRef} />
                {weather && (
                    <div className="weather__body">
                        <div className="weather__body-content">
                            <h1 className="weather__body-content-title">Nadvorye</h1>
                            <div className="weather__body-content-info">
                                <span className="weather__body-content-info-temp">{weather.current.temp_c}&deg;C</span>
                                <div className="weather__body-content-info-add">
                                    <span className="weather__body-content-info-add-city">{weather.location.name}</span>
                                    <span className="weather__body-content-info-add-date">
                                        {convertDateFrom_ISO8601(weather.current.last_updated, currentLang)}
                                    </span>
                                </div>
                                <img className="weather__body-content-info-icon" src={weather.current.condition.icon} />
                            </div>
                        </div>
                        <BurgerMenu
                            dominantColor={dominantColor}
                            currentLang={currentLang}
                            searchCityInputRef={searchCityInputRef}
                            setCurrentLang={setCurrentLang}
                            setCurrentCity={setCurrentCity}
                            fetchCurrentWeather={fetchCurrentWeather}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default App;
