import useAppContext from "./AppContext";
import weatherJSONClear from "@const/weatherJSONClear";
import { WeatherApiConfig } from "@src/app.config";
import WeatherApi from "@service/WeatherApi";
import JSONConverter from "@service/JSONConverter";
import WeatherTodayModel from "@models/WeatherTodayModel";
import WeatherDailyModel from "@models/WeatherDayModel";
import WeatherHourModel from "@models/WeatherHourModel";
import getUserCoordinates from "@helpers/getUserCoordinates";

class AppHandler {
    private _api: WeatherApi;
    private _context = useAppContext();

    public get Api(): WeatherApi {
        return this._api;
    }

    public constructor() {
        this._api = new WeatherApi(WeatherApiConfig.KEY, WeatherApiConfig.HOST, this._context.language);
    }

    public setCityByUserCoordinates = async (): Promise<boolean> => {
        const userCoordinates = await getUserCoordinates();

        if (!userCoordinates) return false;

        this._context.changeCity(`${userCoordinates.latitude}, ${userCoordinates.longitude}`);

        return true;
    };

    public getCurrentWeather = async (): Promise<{
        todayData: WeatherTodayModel;
        in24HourData: WeatherHourModel[];
    }> => {
        let json: any;

        if (this._context.allowApi) {
            json = await this._api.fetchTodayForecast(this._context.city);
        } else {
            const jsonFromStorage = sessionStorage.getItem("weather");

            if (jsonFromStorage) json = JSON.parse(jsonFromStorage);
            else json = weatherJSONClear;
        }

        sessionStorage.setItem("weather", JSON.stringify(json));

        return {
            todayData: JSONConverter.toWeatherTodayModel(json),
            in24HourData: JSONConverter.toWeatherHourModelList(json),
        };
    };

    public getWeatherInDay = async (days: 1 | 3 | 7 | 14 | 16): Promise<WeatherDailyModel[]> => {
        let json: any;

        if (this._context.allowApi) {
            try {
                json = await this._api.fetchDailyForecast(this._context.city, days);
            } catch (err) {
                console.error("Fetch 'weatherDaily' with error: ", err);
                json = [];
            }
        } else {
            const jsonFromStorage = sessionStorage.getItem("weatherDaily");

            if (jsonFromStorage) json = JSON.parse(jsonFromStorage);
            json = [];
        }

        sessionStorage.setItem("weatherDaily", JSON.stringify(json));

        return JSONConverter.toWeatherDayModelList(json);
    };
}

export default AppHandler;
