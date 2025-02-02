import Language from "@const/Language";

class WeatherApi {
    private _key: string;
    private _host: string;
    private _lang: Language;
    private _api_RapidApi_options;

    private static api_OpenMeteo_url = "https://api.open-meteo.com/";
    private static api_RapidApi_url = "https://weatherapi-com.p.rapidapi.com/";

    public get Key() {
        return this._key;
    }
    public get Host() {
        return this._host;
    }
    public get Lang() {
        return this._lang;
    }

    public constructor(key: string, host: string, lang = Language.RU) {
        this._key = key;
        this._host = host;
        this._lang = lang;

        this._api_RapidApi_options = {
            method: "GET",
            headers: {
                "x-rapidapi-key": key,
                "x-rapidapi-host": host,
            },
        };
    }

    public async fetchDailyForecast(city: string, days: 1 | 3 | 7 | 14 | 16): Promise<any | null> {
        const timeZoneByCity: any = await this.fetchTimeZone(city);
        const latitude = timeZoneByCity.location.lat;
        const longitude = timeZoneByCity.location.lon;
        const url = `${WeatherApi.api_OpenMeteo_url}v1/forecast?latitude=${latitude}&longitude=${longitude}`;
        const options = `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant&timezone=Europe/Minsk&forecast_days=${days}`;

        try {
            const resp = await fetch(url + options);
            const data = await resp.json();

            const json = {
                temp: data.daily.time,
                weatherCode: data.daily.weather_code,
                temperature2mMax: data.daily.temperature_2m_max,
                temperature2mMin: data.daily.temperature_2m_min,
                precipitationSum: data.daily.precipitation_sum,
                windSpeed10mMax: data.daily.wind_speed_10m_max,
                windDirection10mDominant: data.daily.wind_direction_10m_dominant,
            };

            return json;
        } catch (error) {
            console.error(`Error on WeatherApi (fetchDailyForecast): ${error}`);
        }

        return null;
    }

    public async fetchTimeZone(city: string): Promise<any | null> {
        const url = `${WeatherApi.api_RapidApi_url}timezone.json?q=${city}`;

        try {
            const resp = await fetch(url, this._api_RapidApi_options);
            const json = await resp.json();

            return json;
        } catch (error) {
            console.error(`Error on WeatherApi (fetchTimeZone): ${error}`);
        }

        return null;
    }

    public async fetchTodayForecast(city: string): Promise<any | null> {
        const url = `${WeatherApi.api_RapidApi_url}forecast.json?q=${city}&lang=${this._lang}`;

        try {
            const resp = await fetch(url, this._api_RapidApi_options);
            const json = await resp.json();

            return json;
        } catch (error) {
            console.error(`Error on WeatherApi (fetchTodayForecast): ${error}`);
        }

        return null;
    }

    public static getTimeRange(start: number, stop: number, step: number): number[] {
        return Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
    }
}

export default WeatherApi;
