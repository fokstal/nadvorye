import { FC } from "react";
import WeatherShortModel from "../../../../models/WeatherShortModel";

import Language from "../../../../const/Language";
import "./Hour24.scss";
import { convertTimeFrom_ISO8601 } from "../../../../helpers/convertFrom_ISO8601";

interface IHour24 {
    weatherIn24Hour: WeatherShortModel[];
    currentLang: Language;
}

const Hour24: FC<IHour24> = ({ weatherIn24Hour, currentLang }) => {
    return (
        <>
            <div className="hour-24">
                <h2 className="hour-24__title">⏰ 24-hour forecast</h2>
                <ul className="hour-24__list">
                    {weatherIn24Hour &&
                        weatherIn24Hour.map((weatherInHour) => {
                            return (
                                <li className="hour-24__list-item" key={weatherInHour.time}>
                                    <span className="hour-24__list-item-temp">{weatherInHour.temp}&deg;C</span>
                                    <img src={weatherInHour.iconPath} alt="" className="hour-24__list-item-icon" />
                                    <span className="hour-24__list-item-wind-speed">
                                        {weatherInHour.windSpeed} km/h
                                    </span>
                                    <span className="hour-24__list-item-time">
                                        {convertTimeFrom_ISO8601(weatherInHour.time, currentLang)}
                                    </span>
                                </li>
                            );
                        })}
                </ul>
            </div>
        </>
    );
};

export default Hour24;
