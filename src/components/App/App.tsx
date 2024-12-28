import { FC, useState, useEffect, useRef } from "react";
import WeatherModel from "../../models/WeatherModel";
import { weatherData_Minsk } from "../../assets/weatherData";
import WeatherApi from "../../service/WeatherApi";
import { WeatherApiConfig } from "../../app.config";
import Language from "../../const/Language";
import Home from "../Content/Current/Home/Home";
import Hour24 from "../Content/Current/Hour24/Hour24";
import Wind from "../Content/Current/Wind/Wind";
import Another from "../Content/Current/Another/Another";
import "./App.scss";

const App: FC = () => {
    const [weather, setWeather] = useState<WeatherModel>();
    const [currentCity, setCurrentCity] = useState("Минск");
    const [currentLang, setCurrentLang] = useState(Language.RU);
    const [isUseApi, setIsUseApi] = useState(false);

    const weatherApi = new WeatherApi(WeatherApiConfig.KEY, WeatherApiConfig.HOST, currentLang);
    const weatherIn24Hour = [];

    const searchCityInputRef = useRef<HTMLInputElement | null>(null);

    const fetchCurrentWeather = async () => {
        const searchCityInput = searchCityInputRef.current;

        if (isUseApi) {
            setWeather(await weatherApi.getCurrent(currentCity));

            return;
        }

        setWeather(WeatherApi.convertJSONToWeatherModel(weatherData_Minsk.currentAt_281224));

        if (searchCityInput) searchCityInput.value = "";
    };

    useEffect(() => {
        fetchCurrentWeather();
    }, []);

    if (weather) {
        for (let i = 0; i < 24; i++) {
            weatherIn24Hour.push({
                temp: weather.current.temp_c,
                iconPath: weather.current.condition.icon,
                time: weather.current.last_updated,
                windSpeed: weather.current.wind_kph,
            });
        }
    }

    return (
        <>
            <div className="weather">
                {weather && (
                    <div className="weather__body">
                        <div className="weather__body-content">
                            <Home
                                isUseApi={isUseApi}
                                setIsUseApi={setIsUseApi}
                                weather={weather}
                                currentLang={currentLang}
                                searchCityInputRef={searchCityInputRef}
                                setCurrentLang={setCurrentLang}
                                setCurrentCity={setCurrentCity}
                                fetchCurrentWeather={fetchCurrentWeather}
                            />
                            <Hour24 weatherIn24Hour={weatherIn24Hour} currentLang={currentLang} />
                            <Wind />
                            <Another />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default App;
