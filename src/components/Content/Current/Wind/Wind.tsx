import { FC, useEffect, useRef, useState } from "react";
import speedSvgPath from "@assets/icons/speed.svg";
import conditionSvgPath from "@assets/icons/condition.svg";
import angleSvgPath from "@assets/icons/angle.svg";
import Compass from "@components/Compass/Compass";
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
                    <img className="wind__title-arrow current-content-block__title-arrow" src={angleSvgPath} />
                </h2>
                <div className="wind__content current-content-block__content">
                    <Compass scale={1.5} angle={weatherWindDirectionInfo.angle} />
                    <div className="wind__content-text">
                        <span className="wind__content-text-block wind__content-text-block--direction">
                            {weatherWindDirectionInfo.translated} <small>({weatherWindDirectionInfo.angle}&deg;)</small>
                        </span>
                        <span className="wind__content-text-block">
                            <div className="wind__content-text-block-icon">
                                <img src={speedSvgPath} />
                            </div>
                            {translationsRecord.windSpeedText[currentLang]}:
                            <strong>
                                {weatherWind.wind_kph} <small>{translationsRecord.kph[currentLang]}</small>
                            </strong>
                        </span>
                        <span className="wind__content-text-block">
                            <div className="wind__content-text-block-icon">
                                <img src={conditionSvgPath} />
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
