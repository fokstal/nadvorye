import { FC, useEffect, useRef, useState } from "react";
import speedSvgPath from "@assets/icons/speed.svg";
import conditionSvgPath from "@assets/icons/condition.svg";
import angleSvgPath from "@assets/icons/angle.svg";
import Compass from "@components/Compass/Compass";
import translationsRecord from "@const/translationsRecord";
import Language from "@const/Language";
import getWindDirectionInfo from "@helpers/getWindDirectionInfo";
import getWindType from "@helpers/getWindType";
import transcribe from "@helpers/transcribeToEnglish";
import WeatherWindModel from "@models/WeatherWindModel";
import "./Wind.scss";

interface IWind {
    currentLang: Language;
    weatherWind: WeatherWindModel;
}

const Wind: FC<IWind> = ({ currentLang, weatherWind }) => {
    const weatherWindDirectionInfo = getWindDirectionInfo(weatherWind.wind_dir);

    const [isContentVisible, setIsContentVisible] = useState(true);

    const contentElRef = useRef<HTMLDivElement | null>(null);
    const titleArrowElRef = useRef<HTMLImageElement | null>(null);

    const contentEl = contentElRef.current;
    const titleArrowEl = titleArrowElRef.current;

    const handleContentVisible = () => {
        if (contentEl && titleArrowEl) {
            if (isContentVisible) {
                contentEl.style.height = `${contentEl.scrollHeight + 180}px`;
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
    }, [isContentVisible]);

    return (
        <>
            <div className="wind current-content-block" id="sectionWind">
                <h2
                    className="wind__title current-content-block__title"
                    onClick={() => setIsContentVisible(!isContentVisible)}
                >
                    🍃 {translationsRecord.windTitle[currentLang]}
                    <img className="current-content-block__title-arrow" src={angleSvgPath} ref={titleArrowElRef} />
                </h2>
                <div className="wind__content current-content-block__content" ref={contentElRef}>
                    <Compass scale={1.5} angle={weatherWindDirectionInfo.angle} />
                    <div className="wind__content-text">
                        <span className="wind__content-text-block wind__content-text-block--direction">
                            {transcribe(weatherWindDirectionInfo.translated, currentLang)}{" "}
                            <small>({weatherWindDirectionInfo.angle}&deg;)</small>
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
                            <strong>{transcribe(getWindType(weatherWind.wind_kph), currentLang)}</strong>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Wind;
