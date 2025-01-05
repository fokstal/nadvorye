import Language from "@const/Language";
import { translationsRecordForWindDirection } from "@const/translationsRecord";

const getWindDirectionInfo = (wind_dir: string, lang = Language.RU): { angle: number; translated: string } => {
    const directions: { [key: string]: { angle: number; translated: string } } = {
        N: { angle: 0, translated: translationsRecordForWindDirection.N[lang] },
        NNE: { angle: 22.5, translated: translationsRecordForWindDirection.NNE[lang] },
        NE: { angle: 45, translated: translationsRecordForWindDirection.NE[lang] },
        ENE: { angle: 67.5, translated: translationsRecordForWindDirection.ENE[lang] },
        E: { angle: 90, translated: translationsRecordForWindDirection.E[lang] },
        ESE: { angle: 112.5, translated: translationsRecordForWindDirection.ESE[lang] },
        SE: { angle: 135, translated: translationsRecordForWindDirection.SE[lang] },
        SSE: { angle: 157.5, translated: translationsRecordForWindDirection.SSE[lang] },
        S: { angle: 180, translated: translationsRecordForWindDirection.S[lang] },
        SSW: { angle: 202.5, translated: translationsRecordForWindDirection.SSW[lang] },
        SW: { angle: 225, translated: translationsRecordForWindDirection.SW[lang] },
        WSW: { angle: 247.5, translated: translationsRecordForWindDirection.WSW[lang] },
        W: { angle: 270, translated: translationsRecordForWindDirection.W[lang] },
        WNW: { angle: 292.5, translated: translationsRecordForWindDirection.WNW[lang] },
        NW: { angle: 315, translated: translationsRecordForWindDirection.NW[lang] },
        NNW: { angle: 337.5, translated: translationsRecordForWindDirection.NNW[lang] },
    };

    const directionKey = wind_dir.toUpperCase();
    const directionInfo = directions[directionKey];

    if (directionInfo) {
        return directionInfo;
    } else {
        return { angle: 0, translated: wind_dir };
    }
};

export default getWindDirectionInfo;
