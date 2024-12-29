const getWindDirectionInfo = (wind_dir: string): { angle: number; translated: string } => {
    const directions: { [key: string]: { angle: number; translated: string } } = {
        N: { angle: 0, translated: "Север" },
        NNE: { angle: 22.5, translated: "Северо-северо-восток" },
        NE: { angle: 45, translated: "Северо-восток" },
        ENE: { angle: 67.5, translated: "Восточно-северо-восток" },
        E: { angle: 90, translated: "Восток" },
        ESE: { angle: 112.5, translated: "Восточно-юго-восток" },
        SE: { angle: 135, translated: "Юго-восток" },
        SSE: { angle: 157.5, translated: "Южно-юго-восток" },
        S: { angle: 180, translated: "Юг" },
        SSW: { angle: 202.5, translated: "Южно-юго-запад" },
        SW: { angle: 225, translated: "Юго-запад" },
        WSW: { angle: 247.5, translated: "Западно-юго-запад" },
        W: { angle: 270, translated: "Запад" },
        WNW: { angle: 292.5, translated: "Западно-северо-запад" },
        NW: { angle: 315, translated: "Северо-запад" },
        NNW: { angle: 337.5, translated: "Северо-северо-запад" },
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
