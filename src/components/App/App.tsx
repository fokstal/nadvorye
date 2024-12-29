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
import WeatherShortModel from "../../models/WeatherShortModel";
import getUserCoordinates from "../../helpers/getUserCoordinates";

const App: FC = () => {
    const [weather, setWeather] = useState<WeatherModel>();
    const [weatherIn24Hour, setWeatherIn24Hour] = useState<WeatherShortModel[]>([]);
    const [currentCity, setCurrentCity] = useState("Minsk");
    const [currentLang, setCurrentLang] = useState(Language.RU);
    const [isUseApi, setIsUseApi] = useState(false);

    const weatherApi = new WeatherApi(WeatherApiConfig.KEY, WeatherApiConfig.HOST, currentLang);

    const searchCityInputRef = useRef<HTMLInputElement | null>(null);

    const fetchCurrentWeather = async () => {
        const userCoordinates = await getUserCoordinates();
        const weatherFromSessionStorage = sessionStorage.getItem("weather");

        if (userCoordinates) setCurrentCity(`${userCoordinates.latitude}, ${userCoordinates.longitude}`);

        const searchCityInput = searchCityInputRef.current;
        let weatherFromResp: any = weatherData_Minsk.currentAt_291224_0915;

        if (weatherFromSessionStorage) weatherFromResp = JSON.parse(weatherFromSessionStorage);
        if (isUseApi) weatherFromResp = await weatherApi.getForecast(currentCity);

        sessionStorage.setItem("weather", JSON.stringify(weatherFromResp));

        setWeather(WeatherApi.convertJSONToWeatherModel(weatherFromResp));
        setWeatherIn24Hour(WeatherApi.convertJSONToWeatherShortModelList(weatherFromResp));

        if (searchCityInput) searchCityInput.value = "";
    };

    useEffect(() => {
        fetchCurrentWeather();
    }, []);

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
                            <Hour24
                                currentLang={currentLang}
                                last_updated={weather.current.last_updated}
                                weatherIn24Hour={weatherIn24Hour}
                            />
                            <Wind
                                weatherWind={{ wind_kph: weather.current.wind_kph, wind_dir: weather.current.wind_dir }}
                            />
                            <Another
                                currentLang={currentLang}
                                weatherAnother={{
                                    sunrise: weather.forecastday.astro.sunrise,
                                    sunset: weather.forecastday.astro.sunset,
                                    humidity: weather.current.humidity,
                                    cloud: weather.current.cloud,
                                    pressure_mb: weather.current.pressure_mb,
                                    precip_mm: weather.current.precip_mm,
                                }}
                                temp_c={weather.current.temp_c}
                                wind_kph={weather.current.wind_kph}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default App;
