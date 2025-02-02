import { FC, useEffect, useRef } from "react";
import useAppContext from "@components/app/AppContext";
import Header from "@components/header/header";
import BurgerMenu from "@components/burgerMenu";
import { convertFullDateFrom_ISO8601 } from "@helpers/dateConverter";
import { getDominantColorInHex, getTextColor } from "@helpers/color";
import getTempForLocale from "@helpers/getTempForLocale";
import transcribe from "@helpers/transcribeToEnglish";
import { getIconByCode } from "@helpers/WMOWorker";
import WeatherTodayModel from "@models/WeatherTodayModel";
import BackgroundWorker from "@service/BackgroundWorker";
import "./home.scss";

interface IHome {
    weather: WeatherTodayModel;
}

const Home: FC<IHome> = ({ weather }) => {
    const { language, changeTheme, changeDominantColor } = useAppContext();

    const imgBackgroundRef = useRef<HTMLImageElement | null>(null);
    const backgroundWorker = imgBackgroundRef.current ? new BackgroundWorker(".home__background") : null;

    useEffect(() => {
        const imgBackground = imgBackgroundRef.current;

        if (imgBackground) {
            imgBackground.onload = () => {
                const dominantColor = getDominantColorInHex(imgBackground) + 30;

                changeDominantColor(dominantColor);
                changeTheme(getTextColor(dominantColor));
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
                <Header />
                <img className="home__background change-img-fade" ref={imgBackgroundRef} />
                <div className="home__content">
                    <span className="home__content-temp">{getTempForLocale(weather.current.temp_c, language)}</span>
                    <div className="home__content-add">
                        <span className="home__content-add-city">{transcribe(weather.location.name, language)}</span>
                        <span className="home__content-add-date">
                            {convertFullDateFrom_ISO8601(weather.current.last_updated, language)}
                        </span>
                    </div>
                    <img
                        className="home__content-icon"
                        src={`src/assets/icons/weatherIcons/${getIconByCode(weather.current.condition.code)}.webp`}
                        alt={weather.current.condition.text}
                        title={weather.current.condition.text}
                    />
                </div>
                <BurgerMenu />
            </div>
        </>
    );
};

export default Home;
