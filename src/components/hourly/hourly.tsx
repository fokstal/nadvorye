import { FC, useRef, useState } from "react";
import AngleSVG from "@root/src/components/svg/angleSVG";
import useAppContext from "@root/src/components/app/AppContext";
import translationsRecord from "@const/translationsRecord";
import { convertTimeFrom_ISO8601 } from "@helpers/dateConverter";
import getTempForLocale from "@helpers/getTempForLocale";
import { getIconByCode } from "@helpers/WMOWorker";
import WeatherHourModel from "@models/WeatherHourModel";
import "./hourly.scss";

interface IHourly {
    last_updated: string;
    weatherHourlyList: WeatherHourModel[];
}

const Hourly: FC<IHourly> = ({ last_updated, weatherHourlyList }) => {
    const { language, theme } = useAppContext();

    const currentTime = convertTimeFrom_ISO8601(last_updated, language, true);
    const goldShadowStyle = {
        filter: "drop-shadow(0 0 1em gold)",
    };

    const [isVisible, setIsVisible] = useState(true);
    const currentTimeItemRef = useRef<HTMLLIElement | null>(null);

    return (
        <div className={`hourly content-block ${isVisible ? "hourly--visible" : ""}`} id="sectionHourly">
            <h2 className="hourly__title content-block__header" onClick={() => setIsVisible((prev) => !prev)}>
                <span>⏰</span> {weatherHourlyList.length + " " + translationsRecord.hourlyTitle[language]}
                <AngleSVG className="hourly__title-arrow content-block__header-arrow" stroke={theme} />
            </h2>
            <div className="hourly__content content-block__body">
                <ul className="hourly__content-list">
                    {weatherHourlyList.map((weatherInHour) => {
                        const weatherInHourlyTime = convertTimeFrom_ISO8601(weatherInHour.time, language);
                        const isCurrentTime = weatherInHourlyTime === currentTime;

                        return (
                            <div className="hourly__content-list-block" key={weatherInHourlyTime}>
                                <li
                                    className="hourly__content-list-item"
                                    ref={isCurrentTime ? currentTimeItemRef : null}
                                    style={isCurrentTime ? goldShadowStyle : {}}
                                >
                                    <span className="hourly__content-list-item-temp">
                                        {getTempForLocale(weatherInHour.temp_c, language)}
                                    </span>
                                    <img
                                        src={`src/assets/icons/weatherIcons/${getIconByCode(
                                            weatherInHour.condition.code
                                        )}.webp`}
                                        alt={weatherInHour.condition.text}
                                        className="hourly__content-list-item-icon"
                                    />
                                    <span className="hourly__content-list-item-wind-speed">
                                        {weatherInHour.wind_kph} {translationsRecord.kph[language]}
                                    </span>
                                    <span className="hourly__content-list-item-time">{weatherInHourlyTime}</span>
                                </li>
                                {isCurrentTime && <span>&bull;</span>}
                            </div>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Hourly;
