import { FC, useState, useEffect, useRef } from "react";
import { WeatherApiConfig } from "@src/app.config";
import Home from "@root/src/components/Content/Home/Home";
import Hour24 from "@root/src/components/Content/Hour24/Hour24";
import Wind from "@root/src/components/Content/Wind/Wind";
import Another from "@root/src/components/Content/Another/Another";
import Daily16 from "../Content/Daily16/Daily16";
import Language from "@const/Language";
import weatherJSONClear from "@const/weatherJSONClear";
import getUserCoordinates from "@helpers/getUserCoordinates";
import WeatherModel from "@models/WeatherModel";
import WeatherShortModel from "@models/WeatherShortModel";
import WeatherDailyModel from "@root/src/models/WeatherDailyModel";
import WeatherApi from "@service/WeatherApi";
import translationsRecord from "@root/src/const/translationsRecord";
import "./App.scss";

const App: FC = () => {
    const [weather, setWeather] = useState<WeatherModel>(WeatherApi.convertJSONToWeatherModel(weatherJSONClear));
    const [weatherIn24Hour, setWeatherIn24Hour] = useState<WeatherShortModel[]>([]);
    const [weatherDailyList, setWeatherDaily] = useState<WeatherDailyModel[]>([]);

    const [currentCity, setCurrentCity] = useState("Минск");
    const [currentLang, setCurrentLang] = useState(Language.RU);
    const [isUseApi, setIsUseApi] = useState(false);
    const [isUserCoordinatesSet, setIsUserCoordinatesSet] = useState(false);
    const [isWeatherDailyLoaded, setIsWeatherDailyLoaded] = useState(false);
    const [mainColor, setMainColor] = useState("white");

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
        let weatherJSON: any = weatherJSONClear;

        if (weatherFromSessionStorage) weatherJSON = JSON.parse(weatherFromSessionStorage);

        if (isUseApi) {
            weatherJSON = await weatherApi.getForecast(cityToFetch);
        }

        sessionStorage.setItem("weather", JSON.stringify(weatherJSON));

        setWeather(WeatherApi.convertJSONToWeatherModel(weatherJSON));
        setWeatherIn24Hour(WeatherApi.convertJSONToWeatherShortModelList(weatherJSON));

        if (searchCityInput) searchCityInput.value = "";
    };

    const fetchFutureWeather = async (city: string = currentCity) => {
        const weatherDailyFromSessionStorage = sessionStorage.getItem("weatherDaily");
        let weatherDailyJSON: any = [];

        if (weatherDailyFromSessionStorage) weatherDailyJSON = JSON.parse(weatherDailyFromSessionStorage);

        if (isUseApi) {
            try {
                setIsWeatherDailyLoaded(true);
                weatherDailyJSON = await weatherApi.getFuture(city, 16);
            } catch (err) {
                console.log("Fetch 'weatherDaily' with error: ", err);
                weatherDailyJSON = "[]";
            }
        }

        setIsWeatherDailyLoaded(false);

        sessionStorage.setItem("weatherDaily", JSON.stringify(weatherDailyJSON));

        setWeatherDaily(WeatherApi.convertJSONToWeatherDailyModelList(weatherDailyJSON));
    };

    const fetchWeather = async (city: string = currentCity) => {
        await fetchCurrentWeather(city);

        setWeatherDaily([]);

        await fetchFutureWeather(city);
    };

    useEffect(() => {
        if (!isUserCoordinatesSet) {
            setCurrentCityByUserCoordinates();
        }

        fetchWeather();
    }, [isUserCoordinatesSet]);

    useEffect(() => {
        document.title = translationsRecord.headerTitle[currentLang];
    }, [currentLang]);

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
                                fetchCurrentWeather={fetchWeather}
                                mainColor={mainColor}
                                setMainColor={setMainColor}
                            />
                            <Hour24
                                currentLang={currentLang}
                                last_updated={weather.current.last_updated}
                                weatherIn24Hour={weatherIn24Hour}
                                mainColor={mainColor}
                            />
                            <Wind
                                currentLang={currentLang}
                                weatherWind={{ wind_kph: weather.current.wind_kph, wind_dir: weather.current.wind_dir }}
                                mainColor={mainColor}
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
                                mainColor={mainColor}
                            />
                            <Daily16
                                currentLang={currentLang}
                                mainColor={mainColor}
                                weatherDailyList={weatherDailyList}
                                isWeatherDailyLoaded={isWeatherDailyLoaded}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default App;
