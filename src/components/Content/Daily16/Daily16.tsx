import { FC, useEffect, useRef, useState } from "react";
import AngleSVG from "@components/icons/AngleSVG";
import Compass from "@components/Compass/Compass";
import RainSVG from "@components/icons/RainSVG";
import SpeedSVG from "@components/icons/SpeedSVG";
import ConditionSVG from "@components/icons/ConditionSVG";
import Language from "@const/Language";
import translationsRecord from "@const/translationsRecord";
import getWindType from "@helpers/getWindType";
import { convertDateFrom_ISO8601 } from "@helpers/dateConverter";
import { convertWindDirToText } from "@helpers/getWindDirectionInfo";
import getTempForLocale from "@helpers/getTempForLocale";
import WeatherDailyModel from "@models/WeatherDailyModel";
import "./Daily16.scss";
import getIconByWmoCode from "@root/src/helpers/WMOWorker";

interface IDaily16 {
    currentLang: Language;
    mainColor: string;
    weatherDailyList: WeatherDailyModel[];
    isWeatherDailyLoaded: boolean;
}

const Daily16: FC<IDaily16> = ({ currentLang, mainColor, weatherDailyList, isWeatherDailyLoaded }) => {
    const [isContentVisible, setIsContentVisible] = useState(true);
    const daily16Ref = useRef<HTMLDivElement | null>(null);

    const daily16El = daily16Ref.current;

    const handleComponentVisible = () => {
        if (daily16El) {
            isContentVisible
                ? daily16El.classList.add("daily-16--visible")
                : daily16El.classList.remove("daily-16--visible");
        }
    };

    useEffect(() => {
        handleComponentVisible();
    }, [isContentVisible]);

    return (
        <div id="sectionDaily16" className="daily-16 daily-16--visible current-content-block" ref={daily16Ref}>
            <h2
                className="daily-16__title current-content-block__title"
                onClick={() => setIsContentVisible(!isContentVisible)}
            >
                🗓️ {translationsRecord.daily16Title[currentLang]}
                <AngleSVG className="daily-16__title-arrow current-content-block__title-arrow" stroke={mainColor} />
            </h2>
            <div
                className="daily-16__content current-content-block__content"
                style={{ height: isWeatherDailyLoaded ? "auto" : "" }}
            >
                {isWeatherDailyLoaded ? (
                    <div className="daily-16__content-loader"></div>
                ) : (
                    <ul className="daily-16__content-list">
                        {weatherDailyList.map((weatherDaily) => {
                            const windDirAngle = Math.round(weatherDaily.wind_dir);
                            const windSpeed = Math.round(weatherDaily.wind_kph_max);

                            return (
                                <li className="daily-16__content-list-item" key={weatherDaily.date}>
                                    <h3
                                        className="daily-16__content-list-item-title"
                                        style={{ borderBottom: `0.1px ${mainColor + 30} solid` }}
                                    >
                                        {convertDateFrom_ISO8601(weatherDaily.date, currentLang)}
                                    </h3>
                                    <div className="daily-16__content-list-item-body">
                                        <div className="daily-16__content-list-item-body-main">
                                            <img
                                                className="daily-16__content-list-item-body-main-icon"
                                                src={`src/assets/icons/weatherIcons/${getIconByWmoCode(
                                                    weatherDaily.weather_code
                                                )}.webp`}
                                                alt=""
                                                title=""
                                            />
                                            <span className="daily-16__content-list-item-body-main-value">
                                                <div>
                                                    <small>{translationsRecord.max[currentLang]}:</small>
                                                    {getTempForLocale(Math.round(weatherDaily.temp_c_max), currentLang)}
                                                </div>
                                                <div>
                                                    <small>{translationsRecord.min[currentLang]}:</small>
                                                    {getTempForLocale(Math.round(weatherDaily.temp_c_min), currentLang)}
                                                </div>
                                            </span>
                                        </div>
                                        <div className="daily-16__content-list-item-body-second">
                                            <span className="daily-16__content-list-item-body-second-block daily-16__content-list-item-body-second-block--direction">
                                                <Compass scale={0.5} angle={windDirAngle} />
                                                <div className="daily-16__content-list-item-body-second-block-value">
                                                    {convertWindDirToText(windDirAngle, currentLang)}{" "}
                                                    <small>({windDirAngle}&deg;)</small>
                                                </div>
                                            </span>
                                            <span className="daily-16__content-list-item-body-second-block">
                                                <div className="daily-16__content-list-item-body-second-block-label">
                                                    <SpeedSVG stroke={mainColor} />
                                                    {translationsRecord.windSpeedText[currentLang]}:
                                                </div>
                                                <div className="daily-16__content-list-item-body-second-block-value">
                                                    {windSpeed} <small>{translationsRecord.kph[currentLang]}</small>
                                                </div>
                                            </span>
                                            <span className="daily-16__content-list-item-body-second-block">
                                                <div className="daily-16__content-list-item-body-second-block-label">
                                                    <ConditionSVG stroke={mainColor} />
                                                    {translationsRecord.windTypeText[currentLang]}:
                                                </div>
                                                <div className="daily-16__content-list-item-body-second-block-value">
                                                    {getWindType(windSpeed, currentLang)}
                                                </div>
                                            </span>
                                            <span className="daily-16__content-list-item-body-second-block">
                                                <div className="daily-16__content-list-item-body-second-block-label">
                                                    <RainSVG stroke={mainColor} />
                                                    {translationsRecord.anotherPrecipText[currentLang]}:
                                                </div>
                                                <div className="daily-16__content-list-item-body-second-block-value">
                                                    {Math.round(weatherDaily.precip_mm)}{" "}
                                                    <small>{translationsRecord.mm[currentLang]}</small>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Daily16;
