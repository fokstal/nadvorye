import { FC, useState } from "react";
import WeatherModel from "../../models/WeatherModel";
import { weatherData_Minsk } from "../../assets/weatherData";
import WeatherApi from "../../service/WeatherApi";
import { WeatherApiConfig } from "../../app.config";

const App: FC = () => {
    const [weather, setWeather] = useState<WeatherModel>();
    const [currentCity, setCurrentCity] = useState("Minsk");
    const weatherApi = new WeatherApi(WeatherApiConfig.KEY, WeatherApiConfig.HOST);

    const fetchCurrentWeather = async () => {
        // setWeather(await weatherApi.getCurrent(currentCity));
        setWeather(WeatherApi.convertJSONToWeatherModel(weatherData_Minsk.currentAt_211224));
    };

    return (
        <>
            <div className="weather-widget">
                <button onClick={() => fetchCurrentWeather()} className="weather-widget__update-btn">
                    Update weather
                </button>
                {weather && (
                    <div className="weather-widget__content">
                        <h2 className="weather-widget__content-title">Weather Data for {weather.location.name}:</h2>
                        <div className="weather-widget__content-text">
                            {weather.current.temp_c} *C <br />
                            {weather.current.feelslike_c} *C <br />
                        </div>
                        <img className="weather-widget__content-img" src={weather.current.condition.icon} />
                    </div>
                )}
            </div>
        </>
    );
}

export default App;
