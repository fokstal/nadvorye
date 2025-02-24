class LocalStorageWorker {
    public static getWeatherJson(): any {
        return localStorage.getItem("weather");
    }

    public static getWeatherDailyJson(): any {
        localStorage.getItem("weatherDaily");
    }

    public static getPinnedCityArr(): string[] {
        const pinnedCityArrInJSON = localStorage.getItem("pinnedCity");
        let pinnedCityArr: string[] = [];

        if (pinnedCityArrInJSON) pinnedCityArr = JSON.parse(pinnedCityArrInJSON);

        return pinnedCityArr;
    }

    public static setWeatherJson(weatherJson: any): void {
        localStorage.setItem("weather", JSON.stringify(weatherJson));
    }

    public static setWeatherDailyJson(weatherDailyJson: any): void {
        localStorage.setItem("weatherDaily", JSON.stringify(weatherDailyJson));
    }

    public static setPinnedCityArr(pinnedCityArr: string[]): void {
        localStorage.setItem("pinnedCity", JSON.stringify(pinnedCityArr));
    }
}

export default LocalStorageWorker;
