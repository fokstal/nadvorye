const getWindType = (windSpeedKph: number): string => {
    if (windSpeedKph <= 5) {
        return "Лёгкий";
    } else if (windSpeedKph <= 20) {
        return "Умеренный";
    } else if (windSpeedKph <= 40) {
        return "Сильный";
    } else {
        return "Штормовой";
    }
};

export default getWindType;
