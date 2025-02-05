import WeatherQualityLevel from "@const/WeatherQualityLevel";

type WeatherQualityIndex = {
    indexValue: number;
    level: WeatherQualityLevel;
};

const calculateWeatherQualityIndex = (
    temp_с: number,
    humidity: number,
    wind_kph: number,
    pressure_mb: number,
    cloud: number
): WeatherQualityIndex => {
    let indexValue = 0;

    if (temp_с < 0) {
        indexValue -= 10;
    } else if (temp_с >= 0 && temp_с <= 20) {
        indexValue += 5;
    } else if (temp_с > 20 && temp_с <= 30) {
        indexValue += 10;
    } else {
        indexValue += 15;
    }

    if (humidity > 80) {
        indexValue -= 5;
    } else if (humidity >= 60 && humidity <= 80) {
        indexValue += 5;
    } else {
        indexValue += 10;
    }

    if (wind_kph > 20) {
        indexValue -= 5;
    } else if (wind_kph >= 10 && wind_kph <= 20) {
        indexValue += 5;
    } else {
        indexValue += 10;
    }

    if (pressure_mb < 1000) {
        indexValue -= 5;
    } else if (pressure_mb >= 1000 && pressure_mb <= 1020) {
        indexValue += 5;
    } else {
        indexValue += 10;
    }

    if (cloud > 80) {
        indexValue -= 5;
    } else if (cloud >= 40 && cloud <= 80) {
        indexValue += 5;
    } else {
        indexValue += 10;
    }

    let level = WeatherQualityLevel.DEFAULT;

    if (indexValue < 0) {
        level = WeatherQualityLevel.ANGRY;
    } else if (indexValue >= 0 && indexValue < 10) {
        level = WeatherQualityLevel.BAD;
    } else if (indexValue >= 10 && indexValue < 20) {
        level = WeatherQualityLevel.GOOD;
    } else {
        level = WeatherQualityLevel.HAPPY;
    }

    return { level, indexValue };
};

export default calculateWeatherQualityIndex;
