import Language from "../const/Language";
import celsiusToFahrenheit from "./celsiusToFahrenheit";

const getTempForLocale = (temp_c: number, lang = Language.RU): string => {
    if (lang === Language.EN) return `${Math.round(celsiusToFahrenheit(temp_c))}°F`;

    return `${Math.round(temp_c)}°C`;
};
export default getTempForLocale;
