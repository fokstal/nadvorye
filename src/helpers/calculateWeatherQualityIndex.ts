type WeatherQualityIndex = {
    indexValue: number;
    levelColor: string;
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

    let levelColor: string;

    if (indexValue < 0) {
        levelColor = "#E4717A50";
    } else if (indexValue >= 0 && indexValue <= 20) {
        levelColor = "#FCE88390";
    } else {
        levelColor = "#77DD7790";
    }

    return { levelColor, indexValue };
};

export default calculateWeatherQualityIndex;
