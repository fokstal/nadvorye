type WeatherModel = {
    location: {
        name: string,
        region: string,
        country: string,
        lat: number,
        lon: number,
    },
    current: {
        last_updated: string,
        temp_c: number,
        feelslike_c: number,
        wind_kph: number,
        humidity: number,
        cloud: number,
        is_day: number,
        condition: {
            text: string,
            icon: string,
        },
    }
}

export default WeatherModel;