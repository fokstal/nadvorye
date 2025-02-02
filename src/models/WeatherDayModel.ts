type WeatherDailyModel = {
    date: string;
    weather_code: number;
    temp_c_max: number;
    temp_c_min: number;
    precip_mm: number;
    wind_kph_max: number;
    wind_dir: number;
};

export default WeatherDailyModel;
