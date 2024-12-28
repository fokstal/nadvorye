import { FC, useEffect, useRef, useState } from "react";
import mercurySvgPath from "../../../../assets/icons/mercury.svg";
import humiditySvgPath from "../../../../assets/icons/humidity.svg";
import rainSvgPath from "../../../../assets/icons/rain.svg";
import angleSvgPath from "../../../../assets/icons/angle.svg";
import sunsetSvgPath from "../../../../assets/icons/sunset.svg";
import sunriceSvgPath from "../../../../assets/icons/sunrise.svg";
import "./Another.scss";

const Another: FC = () => {
    const aqiColor = "green";

    const [isContentVisible, setIsContentVisible] = useState(true);

    const contentElRef = useRef<HTMLDivElement | null>(null);
    const titleArrowElRef = useRef<HTMLImageElement | null>(null);

    const contentEl = contentElRef.current;
    const titleArrowEl = titleArrowElRef.current;

    const handleContentVisible = () => {
        if (contentEl && titleArrowEl) {
            if (isContentVisible) {
                contentEl.style.height = `${contentEl.scrollHeight + 20}px`;
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
            <div className="another current-content-block">
                <h2
                    className="another__title current-content-block__title"
                    onClick={() => setIsContentVisible(!isContentVisible)}
                >
                    🌟 Другие данные
                    <img className="current-content-block__title-arrow" src={angleSvgPath} ref={titleArrowElRef} />
                </h2>
                <div className="another__content current-content-block__content" ref={contentElRef}>
                    <div className="another__content-main">
                        <div className="another__content-main-sun-state">
                            <div className="another__content-main-sun-state-block another__content-main-sun-state-block--sunrise">
                                <img src={sunriceSvgPath} /> рассвет: <strong>09:27</strong>
                            </div>
                            <div className="another__content-main-sun-state-block another__content-main-sun-state-block--sunset">
                                <img src={sunsetSvgPath} /> закат: <strong>16:51</strong>
                            </div>
                        </div>
                        <div className="another__content-main-data">
                            <span className="another__content-main-data-block">
                                <div className="another__content-main-data-block-icon">
                                    <img src={humiditySvgPath} />
                                </div>
                                Влажность:
                                <strong>
                                    33 <small>%</small>
                                </strong>
                            </span>
                            <span className="another__content-main-data-block">
                                <div className="another__content-main-data-block-icon">
                                    <img src={mercurySvgPath} />
                                </div>
                                Давление:
                                <strong>
                                    4 <small>мб</small>
                                </strong>
                            </span>
                            <span className="another__content-main-data-block">
                                <div className="another__content-main-data-block-icon">
                                    <img src={rainSvgPath} />
                                </div>
                                Вероятность дождя:
                                <strong>
                                    65 <small>%</small>
                                </strong>
                            </span>
                        </div>
                    </div>
                    <div className="another__content-second">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                            <path
                                fill={aqiColor}
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3.85 8.62a4 4 0 0 1 4.78-4.77a4 4 0 0 1 6.74 0a4 4 0 0 1 4.78 4.78a4 4 0 0 1 0 6.74a4 4 0 0 1-4.77 4.78a4 4 0 0 1-6.75 0a4 4 0 0 1-4.78-4.77a4 4 0 0 1 0-6.76Z"
                            />
                        </svg>
                        ИКВ = <strong>43</strong>
                        <small>индекс качества воздуха</small>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Another;
