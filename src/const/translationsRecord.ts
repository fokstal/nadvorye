import Language from "@const/Language";

type Translations = {
    [key in Language]: string;
};

const translationsRecord: Record<string, Translations> = {
    kph: {
        "ru-RU": "км/ч",
        "en-US": "kp/h",
    },
    mm: {
        "ru-RU": "мм",
        "en-US": "mm",
    },
    mb: {
        "ru-RU": "мб",
        "en-US": "mb",
    },
    max: {
        "ru-RU": "макс",
        "en-US": "max",
    },
    min: {
        "ru-RU": "мин",
        "en-US": "min",
    },

    headerTitle: {
        "ru-RU": "Надвор'е",
        "en-US": "Nadvorye",
    },

    hourlyNavbarTitle: {
        "ru-RU": "Почасовой прогноз",
        "en-US": "Hourly forecast",
    },
    hourlyTitle: {
        "ru-RU": "часовой прогноз",
        "en-US": "hourly forecast",
    },

    windTitle: {
        "ru-RU": "Ветер",
        "en-US": "Wind",
    },
    windSpeedText: {
        "ru-RU": "Скорость",
        "en-US": "Speed",
    },
    windTypeText: {
        "ru-RU": "Тип ветра",
        "en-US": "Wind type",
    },

    detailsTitle: {
        "ru-RU": "Другие данные",
        "en-US": "Another",
    },
    detailsSunriseText: {
        "ru-RU": "рассвет",
        "en-US": "sunrise",
    },
    detailsSunsetText: {
        "ru-RU": "закат",
        "en-US": "sunset",
    },
    detailsHumidityText: {
        "ru-RU": "Влажность",
        "en-US": "Humidity",
    },
    detailsPressureText: {
        "ru-RU": "Давление",
        "en-US": "Pressure",
    },
    detailsPrecipText: {
        "ru-RU": "Осадки",
        "en-US": "Precip",
    },
    detailsCloudText: {
        "ru-RU": "Облачность",
        "en-US": "Cloud",
    },
    detailsWQIShortText: {
        "ru-RU": "ИКП",
        "en-US": "WQI",
    },
    detailsWQIText: {
        "ru-RU": "индекс качества погоды",
        "en-US": "weather quality index",
    },

    dailyNavbarTitle: {
        "ru-RU": "Ежедневный прогноз",
        "en-US": "Daily forecast",
    },
    dailyFirstPartTitle: {
        "ru-RU": "Прогноз на",
        "en-US": "Forecast for",
    },
    dailyLastPartTitle: {
        "ru-RU": "дней",
        "en-US": "days",
    },
};

const translationsRecordForWindDirection: Record<string, Translations> = {
    N: {
        "ru-RU": "Север",
        "en-US": "North",
    },
    NNE: {
        "ru-RU": "Северо-северо-восток",
        "en-US": "North-North-East",
    },
    NE: {
        "ru-RU": "Северо-восток",
        "en-US": "North-East",
    },
    ENE: {
        "ru-RU": "Восточно-северо-восток",
        "en-US": "East-North-East",
    },
    E: {
        "ru-RU": "Восток",
        "en-US": "East",
    },
    ESE: {
        "ru-RU": "Восточно-юго-восток",
        "en-US": "East-South-East",
    },
    SE: {
        "ru-RU": "Юго-восток",
        "en-US": "South-East",
    },
    SSE: {
        "ru-RU": "Южно-юго-восток",
        "en-US": "South-South-East",
    },
    S: {
        "ru-RU": "Юг",
        "en-US": "South",
    },
    SSW: {
        "ru-RU": "Южно-юго-запад",
        "en-US": "South-South-West",
    },
    SW: {
        "ru-RU": "Юго-запад",
        "en-US": "South-West",
    },
    WSW: {
        "ru-RU": "Западно-юго-запад",
        "en-US": "West-South-West",
    },
    W: {
        "ru-RU": "Запад",
        "en-US": "West",
    },
    WNW: {
        "ru-RU": "Западно-северо-запад",
        "en-US": "West-North-West",
    },
    NW: {
        "ru-RU": "Северо-запад",
        "en-US": "North-West",
    },
    NNW: {
        "ru-RU": "Северо-северо-запад",
        "en-US": "North-North-West",
    },
};

const translationsRecordForWindTypes: Record<string, Translations> = {
    light: {
        "ru-RU": "Лёгкий",
        "en-US": "Light",
    },
    moderate: {
        "ru-RU": "Умеренный",
        "en-US": "Moderate",
    },
    strong: {
        "ru-RU": "Сильный",
        "en-US": "Strong",
    },
    storm: {
        "ru-RU": "Штормовой",
        "en-US": "Storm",
    },
};

export default translationsRecord;
export { translationsRecordForWindDirection, translationsRecordForWindTypes };
