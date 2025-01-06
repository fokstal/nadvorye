import Language from "@const/Language";
import weatherJSONClear from "@const/weatherJSONClear";
import WeatherModel from "@models/WeatherModel";
import WeatherShortModel from "@models/WeatherShortModel";
import WeatherDailyModel from "@models/WeatherDailyModel";
import { fetchWeatherApi } from "openmeteo";

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

    public async getFuture(city: string, days: 1 | 3 | 7 | 14 | 16): Promise<any | null> {
        const timeZoneByCity: any = await this.getTimeZone(city);
        const latitude = timeZoneByCity.location.lat;
        const longitude = timeZoneByCity.location.lon;

        const url = "https://api.open-meteo.com/v1/forecast";
        const options = {
            latitude: latitude,
            longitude: longitude,
            daily: [
                "weather_code",
                "temperature_2m_max",
                "temperature_2m_min",
                "precipitation_sum",
                "wind_speed_10m_max",
                "wind_direction_10m_dominant",
            ],
            timezone: "GMT",
            forecast_days: days,
        };

        try {
            const weatherFutureResps = await fetchWeatherApi(url, options);
            const weatherFutureResp = weatherFutureResps[0];
            const utcOffsetSeconds = weatherFutureResp.utcOffsetSeconds();
            const daily = weatherFutureResp.daily();

            if (!daily) return null;

            const weatherFutureJSON = {
                time: WeatherApi.getTimeRange(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                    (t) => new Date((t + utcOffsetSeconds) * 1000)
                ),
                weatherCode: daily.variables(0)!.valuesArray()!,
                temperature2mMax: daily.variables(1)!.valuesArray()!,
                temperature2mMin: daily.variables(2)!.valuesArray()!,
                precipitationSum: daily.variables(3)!.valuesArray()!,
                windSpeed10mMax: daily.variables(4)!.valuesArray()!,
                windDirection10mDominant: daily.variables(5)!.valuesArray()!,
            };

            return weatherFutureJSON;
        } catch (error) {
            throw new Error(`Error on WeatherApi (getFuture): ${error}`);
        }
    }

    public async getTimeZone(city: string): Promise<any> {
        const url = `https://weatherapi-com.p.rapidapi.com/timezone.json?q=${city}`;
        const options = {
            method: "GET",
            headers: {
                "x-rapidapi-key": this._key,
                "x-rapidapi-host": this._host,
            },
        };

        try {
            const timeZoneResp = await fetch(url, options);
            const timeZoneJSON = await timeZoneResp.json();

            return timeZoneJSON;
        } catch (error) {
            throw new Error(`Error on WeatherApi (getTimeZone): ${error}`);
        }
    }

    public async getForecast(city: string): Promise<any> {
        const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&lang=${this._lang}`;
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

            return weatherJSON;
        } catch (error) {
            throw new Error(`Error on WeatherApi (getCurrent): ${error}`);
        }
    }

    public static convertJSONToWeatherModel(valueJSON: any): WeatherModel {
        try {
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
                        code: valueJSON.current.condition.code,
                        text: valueJSON.current.condition.text,
                        icon: valueJSON.current.condition.icon,
                    },
                    wind_kph: valueJSON.current.wind_kph,
                    wind_dir: valueJSON.current.wind_dir,
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
        } catch {}

        return this.convertJSONToWeatherModel(weatherJSONClear);
    }

    public static convertJSONToWeatherShortModelList(valueJSON: any): WeatherShortModel[] {
        try {
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
        } catch {}

        return this.convertJSONToWeatherShortModelList(weatherJSONClear);
    }

    public static convertJSONToWeatherDailyModelList(valueJSON: any): WeatherDailyModel[] {
        const weatherDailyList: WeatherDailyModel[] = [];

        try {
            for (let i = 0; i < valueJSON.time.length; i++) {
                weatherDailyList.push({
                    date: valueJSON.time[i],
                    weather_code: valueJSON.weatherCode[i],
                    temp_c_max: valueJSON.temperature2mMax[i],
                    temp_c_min: valueJSON.temperature2mMin[i],
                    precip_mm: valueJSON.precipitationSum[i],
                    wind_kph_max: valueJSON.windSpeed10mMax[i],
                    wind_dir: valueJSON.windDirection10mDominant[i],
                });
            }
        } catch (err) {}

        return weatherDailyList;
    }

    public static getTimeRange(start: number, stop: number, step: number): number[] {
        return Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
    }
}

export default WeatherApi;
