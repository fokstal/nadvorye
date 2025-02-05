import { FC, useState } from "react";
import useAppContext from "@root/src/components/app/AppContext";
import Compass from "@root/src/components/compass/compass";
import AngleSVG from "@root/src/components/svg/angleSVG";
import ConditionSVG from "@root/src/components/svg/conditionSVG";
import SpeedSVG from "@root/src/components/svg/speedSVG";
import translationsRecord from "@const/translationsRecord";
import getWindDirectionInfo from "@helpers/getWindDirectionInfo";
import getWindType from "@helpers/getWindType";
import WeatherWindModel from "@models/WeatherWindModel";
import "./wind.scss";

interface IWind {
    weatherWind: WeatherWindModel;
}

const Wind: FC<IWind> = ({ weatherWind }) => {
    const { language, theme } = useAppContext();

    const weatherWindDirectionInfo = getWindDirectionInfo(weatherWind.wind_dir, language);

    const [isVisible, setIsVisible] = useState(true);

    return (
        <div className={`wind content-block ${isVisible ? "wind--visible" : ""}`} id="sectionWind">
            <h2 className="wind__title content-block__header" onClick={() => setIsVisible((prev) => !prev)}>
                <span>🍃</span> {translationsRecord.windTitle[language]}
                <AngleSVG className="wind__title-arrow content-block__header-arrow" stroke={theme} />
            </h2>
            <div className="wind__content content-block__body">
                <Compass scale={1.5} angle={weatherWindDirectionInfo.angle} />
                <div className="wind__content-text">
                    <span className="wind__content-text-block wind__content-text-block--direction">
                        {weatherWindDirectionInfo.translated} <small>({weatherWindDirectionInfo.angle}&deg;)</small>
                    </span>
                    <span className="wind__content-text-block">
                        <div className="wind__content-text-block-icon">
                            <SpeedSVG stroke={theme} />
                        </div>
                        {translationsRecord.windSpeedText[language]}:
                        <strong>
                            {weatherWind.wind_kph} <small>{translationsRecord.kph[language]}</small>
                        </strong>
                    </span>
                    <span className="wind__content-text-block">
                        <div className="wind__content-text-block-icon">
                            <ConditionSVG stroke={theme} />
                        </div>
                        {translationsRecord.windTypeText[language]}:
                        <strong>{getWindType(weatherWind.wind_kph, language)}</strong>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Wind;
