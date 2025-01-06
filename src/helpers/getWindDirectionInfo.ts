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

const convertWindDirToText = (wind_dir: number, lang = Language.RU): string => {
    const normalizedWindDir = ((wind_dir % 360) + 360) % 360;

    const directions = [
        { angle: 0, label: translationsRecordForWindDirection.N[lang] },
        { angle: 22.5, label: translationsRecordForWindDirection.NNE[lang] },
        { angle: 45, label: translationsRecordForWindDirection.NE[lang] },
        { angle: 67.5, label: translationsRecordForWindDirection.ENE[lang] },
        { angle: 90, label: translationsRecordForWindDirection.E[lang] },
        { angle: 112.5, label: translationsRecordForWindDirection.ESE[lang] },
        { angle: 135, label: translationsRecordForWindDirection.SE[lang] },
        { angle: 157.5, label: translationsRecordForWindDirection.SSE[lang] },
        { angle: 180, label: translationsRecordForWindDirection.S[lang] },
        { angle: 202.5, label: translationsRecordForWindDirection.SSW[lang] },
        { angle: 225, label: translationsRecordForWindDirection.SW[lang] },
        { angle: 247.5, label: translationsRecordForWindDirection.WSW[lang] },
        { angle: 270, label: translationsRecordForWindDirection.W[lang] },
        { angle: 292.5, label: translationsRecordForWindDirection.WNW[lang] },
        { angle: 315, label: translationsRecordForWindDirection.NW[lang] },
        { angle: 337.5, label: translationsRecordForWindDirection.NNW[lang] },
        { angle: 360, label: translationsRecordForWindDirection.N[lang] },
    ];

    for (let i = 0; i < directions.length; i++) {
        const currentDirection = directions[i];
        const nextDirection = directions[(i + 1) % directions.length];

        if (
            (normalizedWindDir >= currentDirection.angle - 11.25 &&
                normalizedWindDir < currentDirection.angle + 11.25) ||
            (normalizedWindDir >= nextDirection.angle - 11.25 && normalizedWindDir < nextDirection.angle + 11.25)
        ) {
            return currentDirection.label;
        }
    }

    return "Неизвестно";
};

export default getWindDirectionInfo;
export { convertWindDirToText };
