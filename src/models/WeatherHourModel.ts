type WeatherHourModel = {
    time: string;
    temp_c: number;
    temp_f: number;
    wind_kph: number;
    condition: {
        icon: string;
        text: string;
        code: number;
    };
};

export default WeatherHourModel;
