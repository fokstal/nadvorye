const getWindDirectionInfo = (wind_dir: string): { angle: number; translated: string } => {
    const directions: { [key: string]: { angle: number; translated: string } } = {
        N: { angle: 0, translated: "Север" },
        NE: { angle: 45, translated: "Северо-восток" },
        E: { angle: 90, translated: "Восток" },
        SE: { angle: 135, translated: "Юго-восток" },
        S: { angle: 180, translated: "Юг" },
        SW: { angle: 225, translated: "Юго-запад" },
        W: { angle: 270, translated: "Запад" },
        NW: { angle: 315, translated: "Северо-запад" },
        WSW: { angle: 247.5, translated: "Западно-юго-западное" },
        ESE: { angle: 112.5, translated: "Восточно-юго-восточное" },
    };

    const directionKey = wind_dir.toUpperCase();
    const directionInfo = directions[directionKey];

    if (directionInfo) {
        return directionInfo;
    } else {
        throw new Error("Неизвестное направление ветра");
    }
};

export default getWindDirectionInfo;
