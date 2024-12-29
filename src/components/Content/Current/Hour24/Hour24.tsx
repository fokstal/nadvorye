import { FC, useEffect, useRef, useState } from "react";
import WeatherShortModel from "../../../../models/WeatherShortModel";
import Language from "../../../../const/Language";
import { convertTimeFrom_ISO8601 } from "../../../../helpers/dateConverter";
import angleSvgPath from "../../../../assets/icons/angle.svg";
import "./Hour24.scss";

interface IHour24 {
    weatherIn24Hour: WeatherShortModel[];
    currentLang: Language;
}

const Hour24: FC<IHour24> = ({ weatherIn24Hour, currentLang }) => {
    if (weatherIn24Hour.length != 24) throw new Error("weatherIn24Hour array length is not 24!");

    const [isContentVisible, setIsContentVisible] = useState(true);

    const contentElRef = useRef<HTMLDivElement | null>(null);
    const titleArrowElRef = useRef<HTMLImageElement | null>(null);

    const contentEl = contentElRef.current;
    const titleArrowEl = titleArrowElRef.current;

    const handleContentVisible = () => {
        if (contentEl && titleArrowEl) {
            if (isContentVisible) {
                contentEl.style.height = `${contentEl.scrollHeight + 20}px`;
                contentEl.style.opacity = "1";
                contentEl.style.visibility = "visible";

                titleArrowEl.style.transform = "rotate(180deg)";
            } else {
                contentEl.style.height = "0";
                contentEl.style.opacity = "0";
                contentEl.style.visibility = "hidden";

                titleArrowEl.style.transform = "rotate(0)";
            }
        }
    };

    useEffect(() => {
        handleContentVisible();
    }, [isContentVisible, handleContentVisible]);

    return (
        <>
            <div className="hour-24 current-content-block" id="sectionHour24">
                <h2
                    className="hour-24__title current-content-block__title"
                    onClick={() => setIsContentVisible(!isContentVisible)}
                >
                    ⏰ 24 часовой прогноз
                    <img className="current-content-block__title-arrow" src={angleSvgPath} ref={titleArrowElRef} />
                </h2>
                <div className="hour-24__content current-content-block__content" ref={contentElRef}>
                    <ul className="hour-24__content-list">
                        {weatherIn24Hour &&
                            weatherIn24Hour.map((weatherInHour) => {
                                return (
                                    <li className="hour-24__content-list-item" key={weatherInHour.time}>
                                        <span className="hour-24__content-list-item-temp">
                                            {weatherInHour.temp_c}&deg;C
                                        </span>
                                        <img
                                            src={weatherInHour.condition.icon}
                                            alt=""
                                            className="hour-24__content-list-item-icon"
                                        />
                                        <span className="hour-24__content-list-item-wind-speed">
                                            {weatherInHour.wind_kph} км/ч
                                        </span>
                                        <span className="hour-24__content-list-item-time">
                                            {convertTimeFrom_ISO8601(weatherInHour.time, currentLang)}
                                        </span>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Hour24;
