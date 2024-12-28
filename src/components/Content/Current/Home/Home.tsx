import { Dispatch, FC, MutableRefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { convertFullDateFrom_ISO8601 } from "../../../../helpers/convertFrom_ISO8601";
import WeatherModel from "../../../../models/WeatherModel";
import Language from "../../../../const/Language";
import BurgerMenu from "../../../BurgerMenu/BurgerMenu";
import background from "../../../../assets/images/road_asphalt_rain.jpg";
import getDominantColorInHex from "../../../../helpers/getDominantColor";
import "./Home.scss";
import Header from "../../../Header/Header";

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

    useEffect(() => {
        const imgBackground = imgBackgroundRef.current;

        if (imgBackground) {
            imgBackground.onload = () => {
                setDominantColor(getDominantColorInHex(imgBackground));
            };
        }
    }, []);

    return (
        <>
            <div className="home">
                <Header isUseApi={isUseApi} setIsUseApi={setIsUseApi} />
                <img className="home__background" src={background} ref={imgBackgroundRef} />
                <div className="home__content">
                    <span className="home__content-temp">{weather.current.temp_c}&deg;C</span>
                    <div className="home__content-add">
                        <span className="home__content-add-city">{weather.location.name}</span>
                        <span className="home__content-add-date">
                            {convertFullDateFrom_ISO8601(weather.current.last_updated, currentLang)}
                        </span>
                    </div>
                    <img className="home__content-icon" src={weather.current.condition.icon} />
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
