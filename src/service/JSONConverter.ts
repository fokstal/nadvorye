import data_Clear from "@assets/data/_Clear";
import WeatherTodayModel from "@models/WeatherTodayModel";
import WeatherHourModel from "@models/WeatherHourModel";
import WeatherDayModel from "@models/WeatherDayModel";

class JSONConverter {
    public static toWeatherTodayModel(valueJSON: any): WeatherTodayModel {
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

        return this.toWeatherTodayModel(data_Clear.current);
    }

    public static toWeatherHourModelList(valueJSON: any): WeatherHourModel[] {
        try {
            const result: WeatherHourModel[] = [];

            for (let i = 0; i < valueJSON.forecast.forecastday[0].hour.length; i++) {
                const currentHourData = valueJSON.forecast.forecastday[0].hour[i];

                result.push({
                    time: currentHourData.time,
                    temp_c: currentHourData.temp_c,
                    temp_f: currentHourData.temp_f,
                    wind_kph: currentHourData.wind_kph,
                    condition: {
                        icon: currentHourData.condition.icon,
                        text: currentHourData.condition.text,
                        code: currentHourData.condition.code,
                    },
                });
            }

            return result;
        } catch {}

        return this.toWeatherHourModelList(data_Clear.current);
    }

    public static toWeatherDayModelList(valueJSON: any): WeatherDayModel[] {
        const weatherDailyList: WeatherDayModel[] = [];

        try {
            for (let i = 0; i < valueJSON.temp.length; i++) {
                weatherDailyList.push({
                    date: valueJSON.temp[i],
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
}

export default JSONConverter;
