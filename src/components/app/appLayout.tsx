import { FC, useState, useEffect, useRef } from "react";
import Home from "@components/home/home";
import Hourly from "@components/hourly/hourly";
import Wind from "@components/wind/wind";
import Another from "@components/details/details";
import Daily from "@components/daily/daily";
import WeatherTodayModel from "@models/WeatherTodayModel";
import WeatherHourModel from "@models/WeatherHourModel";
import WeatherDailyModel from "@models/WeatherDayModel";
import JSONConverter from "@service/JSONConverter";
import translationsRecord from "@const/translationsRecord";
import weatherJSONClear from "@const/weatherJSONClear";
import useAppContext from "./AppContext";
import AppHandler from "./AppHandler";

const AppLayout: FC = () => {
    const { city, language } = useAppContext();

    const [weatherToday, setWeatherToday] = useState<WeatherTodayModel>(
        JSONConverter.toWeatherTodayModel(weatherJSONClear)
    );
    const [weatherIn24Hour, setWeatherIn24Hour] = useState<WeatherHourModel[]>([]);
    const [weatherIn16Day, setWeatherIn16Day] = useState<WeatherDailyModel[]>([]);
    const [isUserCoordinatesSet, setIsUserCoordinatesSet] = useState(true);
    const [isWeatherIn16DayLoaded, setIsWeatherIn16DayLoaded] = useState(false);

    const appHandler = useRef(new AppHandler());

    const getWeather = async () => {
        const { todayData, in24HourData } = await appHandler.current.getCurrentWeather();

        setIsWeatherIn16DayLoaded(true);

        setWeatherToday(todayData);
        setWeatherIn24Hour(in24HourData);

        setWeatherIn16Day(
            await appHandler.current.getWeatherIn16Day().then((data) => {
                setIsWeatherIn16DayLoaded(false);

                return data;
            })
        );
    };

    const getWeatherByUserCoordinates = async () => {
        if (!isUserCoordinatesSet) {
            setIsUserCoordinatesSet(await appHandler.current.setCityByUserCoordinates());
        }

        await getWeather();
    };

    useEffect(() => {
        getWeatherByUserCoordinates();
    }, [isUserCoordinatesSet]);

    useEffect(() => {
        document.title = translationsRecord.headerTitle[language];
    }, [language]);

    useEffect(() => {
        getWeather();
    }, [city]);

    return (
        <div className="weather">
            {weatherToday && (
                <div className="weather__body">
                    <Home weather={weatherToday} />
                    <Hourly last_updated={weatherToday.current.last_updated} weatherHourlyList={weatherIn24Hour} />
                    <Wind
                        weatherWind={{
                            wind_kph: weatherToday.current.wind_kph,
                            wind_dir: weatherToday.current.wind_dir,
                        }}
                    />
                    <Another
                        weatherDetails={{
                            sunrise: weatherToday.forecastday.astro.sunrise,
                            sunset: weatherToday.forecastday.astro.sunset,
                            humidity: weatherToday.current.humidity,
                            cloud: weatherToday.current.cloud,
                            pressure_mb: weatherToday.current.pressure_mb,
                            precip_mm: weatherToday.current.precip_mm,
                        }}
                        temp_c={weatherToday.current.temp_c}
                        wind_kph={weatherToday.current.wind_kph}
                    />
                    <Daily weatherDailyList={weatherIn16Day} isWeatherDataLoaded={isWeatherIn16DayLoaded} />
                </div>
            )}
        </div>
    );
};

export default AppLayout;
