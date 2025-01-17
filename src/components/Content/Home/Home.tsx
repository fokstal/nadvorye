import { Dispatch, FC, MutableRefObject, SetStateAction, useEffect, useRef, useState } from "react";
import Header from "@components/Header/Header";
import BurgerMenu from "@components/BurgerMenu/BurgerMenu";
import Language from "@const/Language";
import { convertFullDateFrom_ISO8601 } from "@helpers/dateConverter";
import { getDominantColorInHex, getTextColor } from "@root/src/helpers/color";
import getTempForLocale from "@helpers/getTempForLocale";
import transcribe from "@helpers/transcribeToEnglish";
import WeatherModel from "@models/WeatherModel";
import BackgroundWorker from "@service/BackgroundWorker";
import "./Home.scss";

interface IHome {
    isUseApi: boolean;
    setIsUseApi: Dispatch<SetStateAction<boolean>>;
    weather: WeatherModel;
    currentLang: Language;
    searchCityInputRef: MutableRefObject<HTMLInputElement | null>;
    setCurrentLang: (lang: Language) => void;
    fetchCurrentWeather: (city?: string) => void;
    mainColor: string;
    setMainColor: (color: string) => void;
}

const Home: FC<IHome> = ({
    isUseApi,
    setIsUseApi,
    weather,
    currentLang,
    searchCityInputRef,
    setCurrentLang,
    fetchCurrentWeather,
    mainColor,
    setMainColor,
}) => {
    const [dominantColor, setDominantColor] = useState("transparent");

    const imgBackgroundRef = useRef<HTMLImageElement | null>(null);

    let backgroundWorker: BackgroundWorker | null;

    if (imgBackgroundRef.current) backgroundWorker = new BackgroundWorker(".home__background");

    useEffect(() => {
        const imgBackground = imgBackgroundRef.current;

        if (imgBackground) {
            imgBackground.onload = () => {
                const dominantColor = getDominantColorInHex(imgBackground) + 30;

                setDominantColor(dominantColor);
                setMainColor(getTextColor(dominantColor));
            };
        }
    }, []);

    useEffect(() => {
        if (weather && backgroundWorker) {
            backgroundWorker.changeByWeatherType(weather.current.condition.code, weather.current.is_day === 1);
        }
    }, [weather]);

    return (
        <>
            <div className="home" id="sectionHome">
                <Header currentLang={currentLang} isUseApi={isUseApi} setIsUseApi={setIsUseApi} />
                <img className="home__background change-img-fade" ref={imgBackgroundRef} />
                <div className="home__content">
                    <span className="home__content-temp">{getTempForLocale(weather.current.temp_c, currentLang)}</span>
                    <div className="home__content-add">
                        <span className="home__content-add-city">{transcribe(weather.location.name, currentLang)}</span>
                        <span className="home__content-add-date">
                            {convertFullDateFrom_ISO8601(weather.current.last_updated, currentLang)}
                        </span>
                    </div>
                    <img
                        className="home__content-icon"
                        src={weather.current.condition.icon}
                        alt={weather.current.condition.text}
                        title={weather.current.condition.text}
                    />
                </div>
                <BurgerMenu
                    dominantColor={dominantColor}
                    currentLang={currentLang}
                    searchCityInputRef={searchCityInputRef}
                    setCurrentLang={setCurrentLang}
                    fetchCurrentWeather={fetchCurrentWeather}
                    mainColor={mainColor}
                />
            </div>
        </>
    );
};

export default Home;
