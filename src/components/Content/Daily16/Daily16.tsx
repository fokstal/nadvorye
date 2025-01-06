import { FC } from "react";
import WeatherDailyModel from "@root/src/models/WeatherDailyModel";

interface IDaily16 {
    weatherDailyList: WeatherDailyModel[];
}

const Daily16: FC<IDaily16> = ({ weatherDailyList }) => {
    return (
        <ul className="daily-16">
            {weatherDailyList.length}
            {weatherDailyList.map((weatherDaily) => {
                return (
                    <li className="daily-16__item" key={weatherDaily.date}>
                        {weatherDaily.date} <br />
                        {weatherDaily.weather_code} <br />
                        {weatherDaily.temp_c_max} <br />
                        {weatherDaily.temp_c_min} <br />
                        {weatherDaily.precip_mm} <br />
                        {weatherDaily.wind_kph_max} <br />
                        {weatherDaily.wind_dir} <br />
                        <br />
                    </li>
                );
            })}
        </ul>
    );
};

export default Daily16;
