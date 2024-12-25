import { FC } from "react";
import "./Wind.scss";
import Compass from "../../../Compass/Compass";
import speedSvgPath from "../../../../assets/icons/speed.svg";
import mercurySvgPath from "../../../../assets/icons/mercury.svg";
import humiditySvgPath from "../../../../assets/icons/humidity.svg";
import conditionSvgPath from "../../../../assets/icons/condition.svg";

const Wind: FC = () => {
    const angle = -45;

    return (
        <>
            <div className="wind">
                <h2 className="wind__title">🍃 Wind</h2>
                <div className="wind__content">
                    <Compass scale={1.5} angle={angle} />
                    <div className="wind__content-text">
                        <span className="wind__content-text-block wind__content-text-block--direction">
                            North-east <small>({angle}&deg;)</small>
                        </span>
                        <span className="wind__content-text-block">
                            <div className="wind__content-text-block-icon">
                                <img src={speedSvgPath} />:
                            </div>
                            255 <small>km/h</small>
                        </span>
                        <span className="wind__content-text-block">
                            <div className="wind__content-text-block-icon">
                                <img src={mercurySvgPath} />:
                            </div>
                            4 <small>mb</small>
                        </span>
                        <span className="wind__content-text-block">
                            <div className="wind__content-text-block-icon">
                                <img src={humiditySvgPath} />:
                            </div>
                            33 <small>%</small>
                        </span>
                        <span className="wind__content-text-block">
                            <div className="wind__content-text-block-icon">
                                <img src={conditionSvgPath} />:
                            </div>
                            hurricanes
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Wind;
