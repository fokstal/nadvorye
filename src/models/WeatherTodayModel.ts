type WeatherTodayModel = {
    location: {
        name: string;
        region: string;
        country: string;
        lat: number;
        lon: number;
    };
    current: {
        last_updated: string;
        temp_c: number;
        temp_f: number;
        is_day: number;
        condition: {
            code: number;
            text: string;
            icon: string;
        };
        wind_kph: number;
        wind_dir: string;
        pressure_mb: number;
        precip_mm: number;
        feelslike_c: number;
        feelslike_f: number;
        humidity: number;
        cloud: number;
        windchill_c: number;
        windchill_f: number;
    };
    forecastday: {
        astro: {
            sunrise: string;
            sunset: string;
        };
    };
};

export default WeatherTodayModel;
