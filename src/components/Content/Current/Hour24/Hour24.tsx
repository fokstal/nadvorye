import { FC, useEffect, useRef, useState } from "react";
import angleSvgPath from "@assets/icons/angle.svg";
import Language from "@const/Language";
import translationsRecord from "@const/translationsRecord";
import { convertTimeFrom_ISO8601 } from "@helpers/dateConverter";
import getTempForLocale from "@helpers/getTempForLocale";
import WeatherShortModel from "@models/WeatherShortModel";
import "./Hour24.scss";

interface IHour24 {
    currentLang: Language;
    last_updated: string;
    weatherIn24Hour: WeatherShortModel[];
}

const Hour24: FC<IHour24> = ({ currentLang, last_updated, weatherIn24Hour }) => {
    const currentTime = convertTimeFrom_ISO8601(last_updated, currentLang, true);
    const currentTimeListItemStyle = {
        filter: "drop-shadow(0 0 1em gold)",
    };

    const [isContentVisible, setIsContentVisible] = useState(true);
    const hour24Ref = useRef<HTMLDivElement | null>(null);
    const currentTimeItemRef = useRef<HTMLLIElement | null>(null);

    const hour24El = hour24Ref.current;

    const handleComponentVisible = () => {
        if (hour24El) {
            isContentVisible
                ? hour24El.classList.add("hour-24--visible")
                : hour24El.classList.remove("hour-24--visible");
        }
    };

    useEffect(() => {
        handleComponentVisible();
    }, [isContentVisible]);

    return (
        <>
            <div className="hour-24 hour-24--visible current-content-block" id="sectionHour24" ref={hour24Ref}>
                <h2
                    className="hour-24__title current-content-block__title"
                    onClick={() => setIsContentVisible(!isContentVisible)}
                >
                    ⏰ {translationsRecord.hour24Title[currentLang]}
                    <img className="hour-24__title-arrow current-content-block__title-arrow" src={angleSvgPath} />
                </h2>
                <div className="hour-24__content current-content-block__content">
                    <ul className="hour-24__content-list">
                        {weatherIn24Hour.map((weatherInHour) => {
                            const weatherInHourTime = convertTimeFrom_ISO8601(weatherInHour.time, currentLang);
                            const isCurrentTime = weatherInHourTime === currentTime;

                            return (
                                <div className="hour-24__content-list-block" key={weatherInHourTime}>
                                    <li
                                        className="hour-24__content-list-item"
                                        ref={isCurrentTime ? currentTimeItemRef : null}
                                        style={isCurrentTime ? currentTimeListItemStyle : {}}
                                    >
                                        <span className="hour-24__content-list-item-temp">
                                            {getTempForLocale(weatherInHour.temp_c, currentLang)}
                                        </span>
                                        <img
                                            src={weatherInHour.condition.icon}
                                            alt=""
                                            className="hour-24__content-list-item-icon"
                                        />
                                        <span className="hour-24__content-list-item-wind-speed">
                                            {weatherInHour.wind_kph} {translationsRecord.kph[currentLang]}
                                        </span>
                                        <span className="hour-24__content-list-item-time">{weatherInHourTime}</span>
                                    </li>
                                    {isCurrentTime && <span>&bull;</span>}
                                </div>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Hour24;
