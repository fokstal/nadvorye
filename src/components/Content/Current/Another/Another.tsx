import { FC, useEffect, useRef, useState } from "react";
import AngleSVG from "@root/src/components/icons/AngleSVG";
import SunriseSVG from "@root/src/components/icons/SunriseSVG";
import SunsetSVG from "@root/src/components/icons/SunsetSVG";
import HumiditySVG from "@root/src/components/icons/HumiditySVG";
import MercurySVG from "@root/src/components/icons/MercurySVG";
import RainSVG from "@root/src/components/icons/RainSVG";
import CloudSVG from "@root/src/components/icons/CloudSVG";
import WeatherQualityIcon from "@root/src/components/WeatherQualityIcon/WeatherQualityIcon";
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
            isContentVisible
                ? anotherEl.classList.add("another--visible")
                : anotherEl.classList.remove("another--visible");
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
                    <AngleSVG className="another__title-arrow current-content-block__title-arrow" />
                </h2>
                <div className="another__content current-content-block__content">
                    <div className="another__content-main">
                        <div className="another__content-main-sun-state">
                            <div className="another__content-main-sun-state-block another__content-main-sun-state-block--sunrise">
                                <SunriseSVG /> {translationsRecord.anotherSunriseText[currentLang]}:{" "}
                                <strong>{formatTimeForLocale(weatherAnother.sunrise, currentLang)}</strong>
                            </div>
                            <div className="another__content-main-sun-state-block another__content-main-sun-state-block--sunset">
                                <SunsetSVG /> {translationsRecord.anotherSunsetText[currentLang]}:{" "}
                                <strong>{formatTimeForLocale(weatherAnother.sunset, currentLang)}</strong>
                            </div>
                        </div>
                        <div className="another__content-main-data">
                            <span className="another__content-main-data-block">
                                <div className="another__content-main-data-block-icon">
                                    <HumiditySVG />
                                </div>
                                {translationsRecord.anotherHumidityText[currentLang]}:
                                <strong>
                                    {weatherAnother.humidity} <small>%</small>
                                </strong>
                            </span>
                            <span className="another__content-main-data-block">
                                <div className="another__content-main-data-block-icon">
                                    <MercurySVG />
                                </div>
                                {translationsRecord.anotherPressureText[currentLang]}:
                                <strong>
                                    {weatherAnother.pressure_mb} <small>{translationsRecord.mb[currentLang]}</small>
                                </strong>
                            </span>
                            <span className="another__content-main-data-block">
                                <div className="another__content-main-data-block-icon">
                                    <RainSVG />
                                </div>
                                {translationsRecord.anotherPrecipText[currentLang]}:
                                <strong>
                                    {weatherAnother.precip_mm} <small>{translationsRecord.mm[currentLang]}</small>
                                </strong>
                            </span>
                            <span className="another__content-main-data-block">
                                <div className="another__content-main-data-block-icon">
                                    <CloudSVG />
                                </div>
                                {translationsRecord.anotherCloudText[currentLang]}:
                                <strong>
                                    {weatherAnother.cloud} <small>%</small>
                                </strong>
                            </span>
                        </div>
                    </div>
                    <div className="another__content-second">
                        <WeatherQualityIcon levelColor={weatherQualityIndex.levelColor} />
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
