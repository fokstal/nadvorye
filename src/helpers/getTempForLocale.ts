import Language from "../const/Language";
import celsiusToFahrenheit from "./celsiusToFahrenheit";

const getTempForLocale = (temp_c: number, lang = Language.RU) => {
    if ((lang = Language.EN)) return celsiusToFahrenheit(temp_c);

    return temp_c;
};
export default getTempForLocale;
