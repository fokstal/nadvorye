import { FC, useEffect, useRef, useState } from "react";
import Compass from "../../../Compass/Compass";
import speedSvgPath from "../../../../assets/icons/speed.svg";
import conditionSvgPath from "../../../../assets/icons/condition.svg";
import angleSvgPath from "../../../../assets/icons/angle.svg";
import "./Wind.scss";
import WeatherWindModel from "../../../../models/WeatherWindModel";
import getWindDirectionInfo from "../../../../helpers/getWindDirectionInfo";
import getWindType from "../../../../helpers/getWindType";

interface IWind {
    weatherWind: WeatherWindModel;
}

const Wind: FC<IWind> = ({ weatherWind }) => {
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
    }, [isContentVisible, handleContentVisible]);

    return (
        <>
            <div className="wind current-content-block" id="sectionWind">
                <h2
                    className="wind__title current-content-block__title"
                    onClick={() => setIsContentVisible(!isContentVisible)}
                >
                    🍃 Ветер
                    <img className="current-content-block__title-arrow" src={angleSvgPath} ref={titleArrowElRef} />
                </h2>
                <div className="wind__content current-content-block__content" ref={contentElRef}>
                    <Compass scale={1.5} angle={weatherWindDirectionInfo.angle} />
                    <div className="wind__content-text">
                        <span className="wind__content-text-block wind__content-text-block--direction">
                            {weatherWindDirectionInfo.translated} <small>({weatherWindDirectionInfo.angle}&deg;)</small>
                        </span>
                        <span className="wind__content-text-block">
                            <div className="wind__content-text-block-icon">
                                <img src={speedSvgPath} />
                            </div>
                            Скорость:
                            <strong>
                                {weatherWind.wind_kph} <small>км/ч</small>
                            </strong>
                        </span>
                        <span className="wind__content-text-block">
                            <div className="wind__content-text-block-icon">
                                <img src={conditionSvgPath} />
                            </div>
                            Тип ветра:
                            <strong>{getWindType(weatherWind.wind_kph)}</strong>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Wind;
