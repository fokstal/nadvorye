import { FC, useState } from "react";
import useAppContext from "@components/app/AppContext";
import AngleSVG from "@components/svg/angleSVG";
import Compass from "@components/compass/compass";
import RainSVG from "@components/svg/rainSVG";
import SpeedSVG from "@components/svg/speedSVG";
import ConditionSVG from "@components/svg/conditionSVG";
import translationsRecord from "@const/translationsRecord";
import getWindType from "@helpers/getWindType";
import { convertDateFrom_ISO8601 } from "@helpers/dateConverter";
import { convertWindDirToText } from "@helpers/getWindDirectionInfo";
import getTempForLocale from "@helpers/getTempForLocale";
import { getIconByWmoCode } from "@helpers/WMOWorker";
import WeatherDailyModel from "@models/WeatherDayModel";
import "./daily.scss";

interface IDaily {
    weatherDailyList: WeatherDailyModel[];
    isWeatherDataLoaded: boolean;
}

const Daily: FC<IDaily> = ({ weatherDailyList, isWeatherDataLoaded }) => {
    const { language, theme } = useAppContext();

    const [isVisible, setIsVisible] = useState(true);

    return !isWeatherDataLoaded && weatherDailyList.length === 0 ? (
        <div className="daily-null content-block" id="sectionDaily">
            <h2 className="daily-null__title content-block__header">
                <span>🗓️</span>
                <span>
                    {translationsRecord.dailyNavbarTitle[language]}
                    &nbsp;
                    <strong>{translationsRecord.notAvailable[language]}</strong>
                </span>
                &nbsp;
            </h2>
        </div>
    ) : (
        <div className={`daily content-block ${isVisible ? "daily--visible" : ""}`} id="sectionDaily">
            <h2 className="daily__title content-block__header" onClick={() => setIsVisible((prev) => !prev)}>
                <span>🗓️</span>
                {weatherDailyList.length === 0
                    ? translationsRecord.dailyNavbarTitle[language]
                    : translationsRecord.dailyFirstPartTitle[language] +
                      " " +
                      weatherDailyList.length +
                      " " +
                      translationsRecord.dailyLastPartTitle[language]}
                <AngleSVG className="daily__title-arrow content-block__header-arrow" stroke={theme} />
            </h2>
            <div className="daily__content content-block__body">
                {isWeatherDataLoaded ? (
                    <div className="daily__content-loader"></div>
                ) : (
                    <ul className="daily__content-list">
                        {weatherDailyList.map((weatherDaily) => {
                            const windDirAngle = Math.round(weatherDaily.wind_dir);
                            const windSpeed = Math.round(weatherDaily.wind_kph_max);

                            return (
                                <li className="daily__content-list-item" key={weatherDaily.date}>
                                    <h3
                                        className="daily__content-list-item-title"
                                        style={{ borderBottom: `0.1px ${theme + 30} solid` }}
                                    >
                                        {convertDateFrom_ISO8601(weatherDaily.date, language)}
                                    </h3>
                                    <div className="daily__content-list-item-body">
                                        <div className="daily__content-list-item-body-main">
                                            <img
                                                className="daily__content-list-item-body-main-icon"
                                                src={`src/assets/icons/weatherIcons/${getIconByWmoCode(
                                                    weatherDaily.weather_code
                                                )}.webp`}
                                                alt=""
                                                title=""
                                            />
                                            <span className="daily__content-list-item-body-main-value">
                                                <div>
                                                    <small>{translationsRecord.max[language]}:</small>
                                                    {getTempForLocale(Math.round(weatherDaily.temp_c_max), language)}
                                                </div>
                                                <div>
                                                    <small>{translationsRecord.min[language]}:</small>
                                                    {getTempForLocale(Math.round(weatherDaily.temp_c_min), language)}
                                                </div>
                                            </span>
                                        </div>
                                        <div className="daily__content-list-item-body-second">
                                            <span className="daily__content-list-item-body-second-block daily__content-list-item-body-second-block--direction">
                                                <Compass scale={1} angle={windDirAngle} />
                                                <div className="daily__content-list-item-body-second-block-value">
                                                    {convertWindDirToText(windDirAngle, language)}{" "}
                                                    <small>({windDirAngle}&deg;)</small>
                                                </div>
                                            </span>
                                            <span className="daily__content-list-item-body-second-block">
                                                <div className="daily__content-list-item-body-second-block-label">
                                                    <SpeedSVG stroke={theme} />
                                                    {translationsRecord.windSpeedText[language]}:
                                                </div>
                                                <div className="daily__content-list-item-body-second-block-value">
                                                    {windSpeed} <small>{translationsRecord.kph[language]}</small>
                                                </div>
                                            </span>
                                            <span className="daily__content-list-item-body-second-block">
                                                <div className="daily__content-list-item-body-second-block-label">
                                                    <ConditionSVG stroke={theme} />
                                                    {translationsRecord.windTypeText[language]}:
                                                </div>
                                                <div className="daily__content-list-item-body-second-block-value">
                                                    {getWindType(windSpeed, language)}
                                                </div>
                                            </span>
                                            <span className="daily__content-list-item-body-second-block">
                                                <div className="daily__content-list-item-body-second-block-label">
                                                    <RainSVG stroke={theme} />
                                                    {translationsRecord.detailsPrecipText[language]}:
                                                </div>
                                                <div className="daily__content-list-item-body-second-block-value">
                                                    {Math.round(weatherDaily.precip_mm)}{" "}
                                                    <small>{translationsRecord.mm[language]}</small>
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

export default Daily;
