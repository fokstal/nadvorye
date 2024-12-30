import { Dispatch, FC, MutableRefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { convertFullDateFrom_ISO8601 } from "../../../../helpers/dateConverter";
import WeatherModel from "../../../../models/WeatherModel";
import Language from "../../../../const/Language";
import BurgerMenu from "../../../BurgerMenu/BurgerMenu";
import getDominantColorInHex from "../../../../helpers/getDominantColor";
import Header from "../../../Header/Header";
import getTempForLocale from "../../../../helpers/getTempForLocale";
import BackgroundWorker from "../../../../service/BackgroundWorker";
import "./Home.scss";
import transcribe from "../../../../helpers/transcribeToEnglish";

interface IHome {
    isUseApi: boolean;
    setIsUseApi: Dispatch<SetStateAction<boolean>>;
    weather: WeatherModel;
    currentLang: Language;
    searchCityInputRef: MutableRefObject<HTMLInputElement | null>;
    setCurrentLang: (lang: Language) => void;
    setCurrentCity: (city: string) => void;
    fetchCurrentWeather: () => void;
}

const Home: FC<IHome> = ({
    isUseApi,
    setIsUseApi,
    weather,
    currentLang,
    searchCityInputRef,
    setCurrentLang,
    setCurrentCity,
    fetchCurrentWeather,
}) => {
    const [dominantColor, setDominantColor] = useState("transparent");

    const imgBackgroundRef = useRef<HTMLImageElement | null>(null);

    let backgroundWorker: BackgroundWorker | null;

    if (imgBackgroundRef.current) backgroundWorker = new BackgroundWorker(".home__background");

    useEffect(() => {
        const imgBackground = imgBackgroundRef.current;

        if (imgBackground) {
            imgBackground.onload = () => {
                setDominantColor(getDominantColorInHex(imgBackground));
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
                        alt={transcribe(weather.current.condition.text, currentLang)}
                        title={transcribe(weather.current.condition.text, currentLang)}
                    />
                </div>
                <BurgerMenu
                    dominantColor={dominantColor}
                    currentLang={currentLang}
                    searchCityInputRef={searchCityInputRef}
                    setCurrentLang={setCurrentLang}
                    setCurrentCity={setCurrentCity}
                    fetchCurrentWeather={fetchCurrentWeather}
                />
            </div>
        </>
    );
};

export default Home;
