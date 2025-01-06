import { FC, useEffect, useRef, useState } from "react";
import Compass from "@components/Compass/Compass";
import AngleSVG from "@root/src/components/icons/AngleSVG";
import ConditionSVG from "@root/src/components/icons/ConditionSVG";
import SpeedSVG from "@root/src/components/icons/SpeedSVG";
import translationsRecord from "@const/translationsRecord";
import Language from "@const/Language";
import getWindDirectionInfo from "@helpers/getWindDirectionInfo";
import getWindType from "@helpers/getWindType";
import WeatherWindModel from "@models/WeatherWindModel";
import "./Wind.scss";

interface IWind {
    currentLang: Language;
    weatherWind: WeatherWindModel;
}

const Wind: FC<IWind> = ({ currentLang, weatherWind }) => {
    const weatherWindDirectionInfo = getWindDirectionInfo(weatherWind.wind_dir, currentLang);

    const [isContentVisible, setIsContentVisible] = useState(true);

    const windRef = useRef<HTMLDivElement | null>(null);

    const windEl = windRef.current;

    const handleComponentVisible = () => {
        if (windEl) {
            isContentVisible ? windEl.classList.add("wind--visible") : windEl.classList.remove("wind--visible");
        }
    };

    useEffect(() => {
        handleComponentVisible();
    }, [isContentVisible]);

    return (
        <>
            <div className="wind wind--visible current-content-block" id="sectionWind" ref={windRef}>
                <h2
                    className="wind__title current-content-block__title"
                    onClick={() => setIsContentVisible(!isContentVisible)}
                >
                    🍃 {translationsRecord.windTitle[currentLang]}
                    <AngleSVG className="wind__title-arrow current-content-block__title-arrow" />
                </h2>
                <div className="wind__content current-content-block__content">
                    <Compass scale={1.5} angle={weatherWindDirectionInfo.angle} />
                    <div className="wind__content-text">
                        <span className="wind__content-text-block wind__content-text-block--direction">
                            {weatherWindDirectionInfo.translated} <small>({weatherWindDirectionInfo.angle}&deg;)</small>
                        </span>
                        <span className="wind__content-text-block">
                            <div className="wind__content-text-block-icon">
                                <SpeedSVG />
                            </div>
                            {translationsRecord.windSpeedText[currentLang]}:
                            <strong>
                                {weatherWind.wind_kph} <small>{translationsRecord.kph[currentLang]}</small>
                            </strong>
                        </span>
                        <span className="wind__content-text-block">
                            <div className="wind__content-text-block-icon">
                                <ConditionSVG />
                            </div>
                            {translationsRecord.windTypeText[currentLang]}:
                            <strong>{getWindType(weatherWind.wind_kph, currentLang)}</strong>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Wind;
