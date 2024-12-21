import WeatherApiLang from "../models/WeatherApiLang";

const convertDateFrom_ISO8601 = (isoDate: string, lang = WeatherApiLang.RU): string => {
    const date = new Date(isoDate);

    const formattedDate = date.toLocaleString(lang);

    return formattedDate;
}

export default convertDateFrom_ISO8601;