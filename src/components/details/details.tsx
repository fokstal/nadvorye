import { FC, useState } from "react";
import useAppContext from "@components/app/AppContext";
import AngleSVG from "@components/svg/angleSVG";
import SunriseSVG from "@components/svg/sunriseSVG";
import SunsetSVG from "@components/svg/sunsetSVG";
import HumiditySVG from "@components/svg/humiditySVG";
import MercurySVG from "@components/svg/mercurySVG";
import RainSVG from "@components/svg/rainSVG";
import CloudSVG from "@components/svg/cloudSVG";
import QualityIcon from "@components/qualityIcon/qualityIcon";
import translationsRecord from "@const/translationsRecord";
import calculateWeatherQualityIndex from "@helpers/calculateWeatherQualityIndex";
import { formatTimeForLocale } from "@helpers/dateConverter";
import WeatherDetailsModel from "@models/WeatherDetailsModel";
import "./details.scss";

interface IDetails {
    weatherDetails: WeatherDetailsModel;
    temp_c: number;
    wind_kph: number;
}

const Details: FC<IDetails> = ({ weatherDetails, temp_c, wind_kph }) => {
    const { language, theme } = useAppContext();

    const weatherQualityIndex = calculateWeatherQualityIndex(
        temp_c,
        weatherDetails.humidity,
        wind_kph,
        weatherDetails.pressure_mb,
        weatherDetails.cloud
    );

    const [isVisible, setIsVisible] = useState(true);

    return (
        <>
            <div className={`details content-block ${isVisible ? "details--visible" : ""}`} id="sectionDetails">
                <h2 className="details__title content-block__title" onClick={() => setIsVisible((prev) => !prev)}>
                    <span>🌟</span> {translationsRecord.detailsTitle[language]}
                    <AngleSVG className="details__title-arrow content-block__title-arrow" stroke={theme} />
                </h2>
                <div className="details__content content-block__content">
                    <div className="details__content-main">
                        <div className="details__content-main-sun-state">
                            <div className="details__content-main-sun-state-block details__content-main-sun-state-block--sunrise">
                                <SunriseSVG /> {translationsRecord.detailsSunriseText[language]}:{" "}
                                <strong>{formatTimeForLocale(weatherDetails.sunrise, language)}</strong>
                            </div>
                            <div className="details__content-main-sun-state-block details__content-main-sun-state-block--sunset">
                                <SunsetSVG /> {translationsRecord.detailsSunsetText[language]}:{" "}
                                <strong>{formatTimeForLocale(weatherDetails.sunset, language)}</strong>
                            </div>
                        </div>
                        <div className="details__content-main-data">
                            <span className="details__content-main-data-block">
                                <div className="details__content-main-data-block-icon">
                                    <HumiditySVG stroke={theme} />
                                </div>
                                {translationsRecord.detailsHumidityText[language]}:
                                <strong>
                                    {weatherDetails.humidity} <small>%</small>
                                </strong>
                            </span>
                            <span className="details__content-main-data-block">
                                <div className="details__content-main-data-block-icon">
                                    <MercurySVG stroke={theme} />
                                </div>
                                {translationsRecord.detailsPressureText[language]}:
                                <strong>
                                    {weatherDetails.pressure_mb} <small>{translationsRecord.mb[language]}</small>
                                </strong>
                            </span>
                            <span className="details__content-main-data-block">
                                <div className="details__content-main-data-block-icon">
                                    <RainSVG stroke={theme} />
                                </div>
                                {translationsRecord.detailsPrecipText[language]}:
                                <strong>
                                    {weatherDetails.precip_mm} <small>{translationsRecord.mm[language]}</small>
                                </strong>
                            </span>
                            <span className="details__content-main-data-block">
                                <div className="details__content-main-data-block-icon">
                                    <CloudSVG stroke={theme} />
                                </div>
                                {translationsRecord.detailsCloudText[language]}:
                                <strong>
                                    {weatherDetails.cloud} <small>%</small>
                                </strong>
                            </span>
                        </div>
                    </div>
                    <div className="details__content-second">
                        <QualityIcon levelColor={weatherQualityIndex.levelColor} stroke={theme} />
                        {translationsRecord.detailsWQIShortText[language]} ={" "}
                        <strong>{weatherQualityIndex.indexValue}</strong>
                        <small>{translationsRecord.detailsWQIText[language]}</small>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Details;
