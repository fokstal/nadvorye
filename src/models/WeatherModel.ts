type WeatherModel = {
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
            text: string;
            icon: string;
        };
        wind_kph: number;
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

export default WeatherModel;
