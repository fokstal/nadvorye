import Language from "@root/src/const/Language";
import SessionStorageWorker from "@root/src/helpers/SessionStorageWorker";

interface IBurgerMenuHandler {
    burgerMenu: HTMLDivElement;
    searchCityInput: HTMLInputElement;
    pinInSearch: SVGSVGElement;
}

class BurgerMenuHandler {
    private _burgerMenu: HTMLDivElement;
    private _searchCityInput: HTMLInputElement;
    private _pinInSearch: SVGSVGElement;

    private _languageArr = Object.values(Language);
    private _pinnedCityArr = SessionStorageWorker.getPinnedCityArr();

    public get PinnedCityArr() {
        return this._pinnedCityArr;
    }

    public constructor(props: IBurgerMenuHandler) {
        this._burgerMenu = props.burgerMenu;
        this._searchCityInput = props.searchCityInput;
        this._pinInSearch = props.pinInSearch;
    }

    public nextLanguage = (currentLang: Language, setCurrentLang: (lang: Language) => void) => {
        const currentIndex = this._languageArr.indexOf(currentLang);
        const nextIndex = (currentIndex + 1) % this._languageArr.length;

        setCurrentLang(this._languageArr[nextIndex]);
    };

    public toggleBurgerMenu = (
        isBurgerMenuOpen: boolean,
        setIsBurgerMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        setIsBurgerMenuOpen(!isBurgerMenuOpen);

        isBurgerMenuOpen
            ? this._burgerMenu.classList.add("burger-menu--expanded")
            : this._burgerMenu.classList.remove("burger-menu--expanded");
    };

    public togglePinCityInSearch = (
        isPinCityInSearch: boolean,
        setIsPinCityInSearch: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        setIsPinCityInSearch(!isPinCityInSearch);

        isPinCityInSearch
            ? this._pinInSearch.classList.add("burger-menu__search-city-pin--rotate")
            : this._pinInSearch.classList.remove("burger-menu__search-city-pin--rotate");
    };

    public handleSearchCity = (
        isPinCityInSearch: boolean,
        setIsPinCityInSearch: React.Dispatch<React.SetStateAction<boolean>>,
        fetchCurrentWeather: (city?: string) => void
    ) => {
        if (!isPinCityInSearch && this._searchCityInput.value != "") {
            this._pinnedCityArr.push(this._searchCityInput.value);
            SessionStorageWorker.setPinnedCityArr(this._pinnedCityArr);

            this.togglePinCityInSearch(isPinCityInSearch, setIsPinCityInSearch);
        }

        fetchCurrentWeather(this._searchCityInput.value);
    };

    removeCityFromPinned = (city: string) => {
        this._pinnedCityArr = this._pinnedCityArr.filter((pinnedCity) => pinnedCity !== city);

        SessionStorageWorker.setPinnedCityArr(this._pinnedCityArr);
    };
}

export default BurgerMenuHandler;
