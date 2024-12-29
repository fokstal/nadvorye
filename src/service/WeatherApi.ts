import Language from "../const/Language";
import WeatherModel from "../models/WeatherModel";
import WeatherShortModel from "../models/WeatherShortModel";

class WeatherApi {
    private _key: string;
    private _host: string;
    private _lang: Language;

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
    }

    public async getCurrent(city: string): Promise<WeatherModel> {
        const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}&lang=${this._lang}`;
        const options = {
            method: "GET",
            headers: {
                "x-rapidapi-key": this._key,
                "x-rapidapi-host": this._host,
            },
        };

        try {
            const weatherResp = await fetch(url, options);
            const weatherJSON = await weatherResp.json();

            return WeatherApi.convertJSONToWeatherModel(weatherJSON);
        } catch (error) {
            throw new Error(`Error on WeatherApi (getCurrent): ${error}`);
        }
    }

    public static convertJSONToWeatherModel(valueJSON: any): WeatherModel {
        return {
            location: {
                name: valueJSON.location.name,
                region: valueJSON.location.region,
                country: valueJSON.location.country,
                lat: valueJSON.location.lat,
                lon: valueJSON.location.lon,
            },
            current: {
                last_updated: valueJSON.current.last_updated,
                temp_c: valueJSON.current.temp_c,
                temp_f: valueJSON.current.temp_f,
                is_day: valueJSON.current.is_day,
                condition: {
                    text: valueJSON.current.condition.text,
                    icon: valueJSON.current.condition.icon,
                },
                wind_kph: valueJSON.current.wind_kph,
                pressure_mb: valueJSON.current.pressure_mb,
                precip_mm: valueJSON.current.precip_mm,
                feelslike_c: valueJSON.current.feelslike_c,
                feelslike_f: valueJSON.current.feelslike_f,
                humidity: valueJSON.current.humidity,
                cloud: valueJSON.current.cloud,
                windchill_c: valueJSON.current.windchill_c,
                windchill_f: valueJSON.current.windchill_f,
            },
            forecastday: {
                astro: {
                    sunrise: valueJSON.forecast.forecastday[0].astro.sunrise,
                    sunset: valueJSON.forecast.forecastday[0].astro.sunset,
                },
            },
        };
    }

    public static convertJSONToWeatherShortModelList(valueJSON: any): WeatherShortModel[] {
        const result: WeatherShortModel[] = [];

        for (let i = 0; i < valueJSON.forecast.forecastday[0].hour.length; i++) {
            const currentHourData = valueJSON.forecast.forecastday[0].hour[i];

            result.push({
                time: currentHourData.time,
                temp_c: currentHourData.temp_c,
                temp_f: currentHourData.temp_f,
                wind_kph: currentHourData.wind_kph,
                condition: {
                    icon: currentHourData.condition.icon,
                },
            });
        }

        return result;
    }
}

export default WeatherApi;
