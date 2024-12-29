import Language from "../const/Language";
import celsiusToFahrenheit from "./celsiusToFahrenheit";

const getTempForLocale = (temp_c: number, lang = Language.RU): string => {
    if ((lang = Language.EN)) return `${celsiusToFahrenheit(temp_c)}&deg;F`;

    return `${temp_c}&deg;C`;
};
export default getTempForLocale;
