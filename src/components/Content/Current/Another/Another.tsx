import { FC, useEffect, useRef, useState } from "react";
import mercurySvgPath from "@assets/icons/mercury.svg";
import humiditySvgPath from "@assets/icons/humidity.svg";
import rainSvgPath from "@assets/icons/rain.svg";
import angleSvgPath from "@assets/icons/angle.svg";
import sunsetSvgPath from "@assets/icons/sunset.svg";
import sunriseSvgPath from "@assets/icons/sunrise.svg";
import cloudSvgPath from "@assets/icons/cloud.svg";
import Language from "@const/Language";
import translationsRecord from "@const/translationsRecord";
import calculateWeatherQualityIndex from "@helpers/calculateWeatherQualityIndex";
import { formatTimeForLocale } from "@helpers/dateConverter";
import WeatherAnotherModel from "@models/WeatherAnotherModel";
import "./Another.scss";

interface IAnother {
    currentLang: Language;
    weatherAnother: WeatherAnotherModel;
    temp_c: number;
    wind_kph: number;
}

const Another: FC<IAnother> = ({ currentLang, weatherAnother, temp_c, wind_kph }) => {
    const weatherQualityIndex = calculateWeatherQualityIndex(
        temp_c,
        weatherAnother.humidity,
        wind_kph,
        weatherAnother.pressure_mb,
        weatherAnother.cloud
    );

    const [isContentVisible, setIsContentVisible] = useState(true);

    const anotherRef = useRef<HTMLDivElement | null>(null);

    const anotherEl = anotherRef.current;

    const handleComponentVisible = () => {
        if (anotherEl) {
            isContentVisible ? anotherEl.classList.add("another--visible") : anotherEl.classList.remove("another--visible");
        }
    };

    useEffect(() => {
        handleComponentVisible();
    }, [isContentVisible]);

    return (
        <>
            <div className="another another--visible current-content-block" id="sectionAnother" ref={anotherRef}>
                <h2
                    className="another__title current-content-block__title"
                    onClick={() => setIsContentVisible(!isContentVisible)}
                >
                    🌟 {translationsRecord.anotherTitle[currentLang]}
                    <img className="another__title-arrow current-content-block__title-arrow" src={angleSvgPath} />
                </h2>
                <div className="another__content current-content-block__content">
                    <div className="another__content-main">
                        <div className="another__content-main-sun-state">
                            <div className="another__content-main-sun-state-block another__content-main-sun-state-block--sunrise">
                                <img src={sunriseSvgPath} /> {translationsRecord.anotherSunriseText[currentLang]}:{" "}
                                <strong>{formatTimeForLocale(weatherAnother.sunrise, currentLang)}</strong>
                            </div>
                            <div className="another__content-main-sun-state-block another__content-main-sun-state-block--sunset">
                                <img src={sunsetSvgPath} /> {translationsRecord.anotherSunsetText[currentLang]}:{" "}
                                <strong>{formatTimeForLocale(weatherAnother.sunset, currentLang)}</strong>
                            </div>
                        </div>
                        <div className="another__content-main-data">
                            <span className="another__content-main-data-block">
                                <div className="another__content-main-data-block-icon">
                                    <img src={humiditySvgPath} />
                                </div>
                                {translationsRecord.anotherHumidityText[currentLang]}:
                                <strong>
                                    {weatherAnother.humidity} <small>%</small>
                                </strong>
                            </span>
                            <span className="another__content-main-data-block">
                                <div className="another__content-main-data-block-icon">
                                    <img src={mercurySvgPath} />
                                </div>
                                {translationsRecord.anotherPressureText[currentLang]}:
                                <strong>
                                    {weatherAnother.pressure_mb} <small>{translationsRecord.mb[currentLang]}</small>
                                </strong>
                            </span>
                            <span className="another__content-main-data-block">
                                <div className="another__content-main-data-block-icon">
                                    <img src={rainSvgPath} />
                                </div>
                                {translationsRecord.anotherPrecipText[currentLang]}:
                                <strong>
                                    {weatherAnother.precip_mm} <small>{translationsRecord.mm[currentLang]}</small>
                                </strong>
                            </span>
                            <span className="another__content-main-data-block">
                                <div className="another__content-main-data-block-icon">
                                    <img src={cloudSvgPath} />
                                </div>
                                {translationsRecord.anotherCloudText[currentLang]}:
                                <strong>
                                    {weatherAnother.cloud} <small>%</small>
                                </strong>
                            </span>
                        </div>
                    </div>
                    <div className="another__content-second">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                            <path
                                fill={weatherQualityIndex.levelColor}
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3.85 8.62a4 4 0 0 1 4.78-4.77a4 4 0 0 1 6.74 0a4 4 0 0 1 4.78 4.78a4 4 0 0 1 0 6.74a4 4 0 0 1-4.77 4.78a4 4 0 0 1-6.75 0a4 4 0 0 1-4.78-4.77a4 4 0 0 1 0-6.76Z"
                            />
                        </svg>
                        {translationsRecord.anotherWQIShortText[currentLang]} ={" "}
                        <strong>{weatherQualityIndex.indexValue}</strong>
                        <small>{translationsRecord.anotherWQIText[currentLang]}</small>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Another;
