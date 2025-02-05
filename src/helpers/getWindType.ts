import Language from "@const/Language";
import { translationsRecordForWindTypes } from "@const/translationsRecord";

const getWindType = (windSpeedKph: number, lang = Language.RU): string => {
    if (windSpeedKph <= 5) {
        return translationsRecordForWindTypes.light[lang];
    } else if (windSpeedKph <= 20) {
        return translationsRecordForWindTypes.moderate[lang];
    } else if (windSpeedKph <= 40) {
        return translationsRecordForWindTypes.strong[lang];
    } else {
        return translationsRecordForWindTypes.storm[lang];
    }
};

export default getWindType;
