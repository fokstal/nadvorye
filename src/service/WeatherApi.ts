import WeatherApiLang from "../models/WeatherApiLang";
import WeatherModel from "../models/WeatherModel";

class WeatherApi {
    private _key: string;
    private _host: string;
    private _lang: WeatherApiLang;

    public get Key() {
        return this._key;
    }
    public get Host() {
        return this._host;
    }
    public get Lang() {
        return this._lang;
    }

    public constructor(key: string, host: string, lang = WeatherApiLang.RU) {
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
        }
        catch (error) {
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
                temp_c: valueJSON.current.temp_c,
                feelslike_c: valueJSON.current.feelslike_c,
                wind_kph: valueJSON.current.wind_kph,
                humidity: valueJSON.current.humidity,
                cloud: valueJSON.current.cloud,
                is_day: valueJSON.current.is_day,
                condition: {
                    text: valueJSON.current.condition.text,
                    icon: valueJSON.current.condition.icon,
                },
            }
        }
    }
}

export default WeatherApi;