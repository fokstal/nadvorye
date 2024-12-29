import Language from "./Language";

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

    headerTitle: {
        "ru-RU": "Надвор'е",
        "en-US": "Nadvorye",
    },

    hour24Title: {
        "ru-RU": "24 часовой прогноз",
        "en-US": "24-hour forecast",
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

    anotherTitle: {
        "ru-RU": "Другие данные",
        "en-US": "Another",
    },
    anotherSunriseText: {
        "ru-RU": "рассвет",
        "en-US": "sunrise",
    },
    anotherSunsetText: {
        "ru-RU": "закат",
        "en-US": "sunset",
    },
    anotherHumidityText: {
        "ru-RU": "Влажность",
        "en-US": "Humidity",
    },
    anotherPressureText: {
        "ru-RU": "Давление",
        "en-US": "Pressure",
    },
    anotherPrecipText: {
        "ru-RU": "Осадки",
        "en-US": "Precip",
    },
    anotherCloudText: {
        "ru-RU": "Облачность",
        "en-US": "Cloud",
    },
    anotherWQIShortText: {
        "ru-RU": "ИКП",
        "en-US": "WQI"
    },
    anotherWQIText: {
        "ru-RU": "индекс качества погоды",
        "en-US": "weather quality index"
    }
};

export default translationsRecord;
