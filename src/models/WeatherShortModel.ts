type WeatherShortModel = {
    time: string;
    temp_c: number;
    temp_f: number;
    wind_kph: number;
    condition: {
        icon: string;
    };
};

export default WeatherShortModel;
