class SessionStorageWorker {
    public static getPinnedCityArr(): string[] {
        const pinnedCityArrInJSON = sessionStorage.getItem("pinnedCity");
        let pinnedCityArr: string[] = [];

        if (pinnedCityArrInJSON) pinnedCityArr = JSON.parse(pinnedCityArrInJSON);

        return pinnedCityArr;
    }

    public static setPinnedCityArr(pinnedCityArr: string[]): void {
        sessionStorage.setItem("pinnedCity", JSON.stringify(pinnedCityArr));
    }
}

export default SessionStorageWorker;
