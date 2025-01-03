import { FC, useState, useEffect, useRef } from "react";
import { WeatherApiConfig } from "@src/app.config";
import Home from "@components/Content/Current/Home/Home";
import Hour24 from "@components/Content/Current/Hour24/Hour24";
import Wind from "@components/Content/Current/Wind/Wind";
import Another from "@components/Content/Current/Another/Another";
import Language from "@const/Language";
import weatherJSONClear from "@const/weatherJSONClear";
import getUserCoordinates from "@helpers/getUserCoordinates";
import WeatherModel from "@models/WeatherModel";
import WeatherShortModel from "@models/WeatherShortModel";
import WeatherApi from "@service/WeatherApi";
import "./App.scss";

const App: FC = () => {
    const [weather, setWeather] = useState<WeatherModel>();
    const [weatherIn24Hour, setWeatherIn24Hour] = useState<WeatherShortModel[]>([]);
    const [currentCity, setCurrentCity] = useState("Минск");
    const [currentLang, setCurrentLang] = useState(Language.RU);
    const [isUseApi, setIsUseApi] = useState(!false);
    const [isUserCoordinatesSet, setIsUserCoordinatesSet] = useState(false);

    const weatherApi = new WeatherApi(WeatherApiConfig.KEY, WeatherApiConfig.HOST, currentLang);

    const searchCityInputRef = useRef<HTMLInputElement | null>(null);

    const setCurrentCityByUserCoordinates = async () => {
        const userCoordinates = await getUserCoordinates();

        if (userCoordinates) {
            setCurrentCity(`${userCoordinates.latitude}, ${userCoordinates.longitude}`);
            setIsUserCoordinatesSet(true);
        }
    };

    const fetchCurrentWeather = async (city: string = currentCity) => {
        const cityToFetch = city === currentCity ? currentCity : city;

        const weatherFromSessionStorage = sessionStorage.getItem("weather");

        const searchCityInput = searchCityInputRef.current;
        let weatherFromResp: any = weatherJSONClear;

        if (weatherFromSessionStorage) weatherFromResp = JSON.parse(weatherFromSessionStorage);
        if (isUseApi) weatherFromResp = await weatherApi.getForecast(cityToFetch);

        sessionStorage.setItem("weather", JSON.stringify(weatherFromResp));

        setWeather(WeatherApi.convertJSONToWeatherModel(weatherFromResp));
        setWeatherIn24Hour(WeatherApi.convertJSONToWeatherShortModelList(weatherFromResp));

        if (searchCityInput) searchCityInput.value = "";
    };

    useEffect(() => {
        if (!isUserCoordinatesSet) {
            setCurrentCityByUserCoordinates();
        }

        fetchCurrentWeather();
    }, [isUserCoordinatesSet]);

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
                                currentLang={currentLang}
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
