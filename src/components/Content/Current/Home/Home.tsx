import { FC } from "react";
import convertDateFrom_ISO8601 from "../../../../helpers/convertFrom_ISO8601";
import WeatherModel from "../../../../models/WeatherModel";
import Language from "../../../../const/Language";
import "./Home.scss";

interface IHome {
    weather: WeatherModel;
    currentLang: Language;
}

const Home: FC<IHome> = ({ weather, currentLang }) => {
    return (
        <>
            <div className="home">
                <span className="home__temp">{weather.current.temp_c}&deg;C</span>
                <div className="home__add">
                    <span className="home__add-city">{weather.location.name}</span>
                    <span className="home__add-date">
                        {convertDateFrom_ISO8601(weather.current.last_updated, currentLang)}
                    </span>
                </div>
                <img className="home__icon" src={weather.current.condition.icon} />
            </div>
        </>
    );
};

export default Home;
