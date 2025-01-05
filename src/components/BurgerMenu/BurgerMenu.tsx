import { FC, MutableRefObject, useEffect, useRef, useState } from "react";
import searchSvgPath from "@assets/icons/search.svg";
import pinSvgPath from "@assets/icons/pin.svg";
import Language, { LanguageFlags } from "@const/Language";
import translationsRecord from "@const/translationsRecord";
import transcribe from "@helpers/transcribeToEnglish";
import BurgerMenuHandler from "./BurgerMenuHandler";
import "./index.scss";

interface IBurgerMenu {
    dominantColor: string;
    currentLang: Language;
    searchCityInputRef: MutableRefObject<HTMLInputElement | null>;
    setCurrentLang: (lang: Language) => void;
    fetchCurrentWeather: (city?: string) => void;
}

const BurgerMenu: FC<IBurgerMenu> = ({
    dominantColor,
    currentLang,
    searchCityInputRef,
    setCurrentLang,
    fetchCurrentWeather,
}) => {
    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(true);
    const [isPinCityInSearch, setIsPinCityInSearch] = useState(true);

    const burgerMenuRef = useRef<HTMLDivElement | null>(null);
    const searchCityBtnRef = useRef<HTMLButtonElement | null>(null);
    const pinInSearchRef = useRef<HTMLImageElement | null>(null);

    const [burgerMenuHandler, setBurgerMenuHandler] = useState<BurgerMenuHandler | null>(null);
    useEffect(() => {
        const searchCityBtn = searchCityBtnRef.current;
        if (searchCityBtn) {
            searchCityBtn.style.background = dominantColor;
        }
    }, [dominantColor]);

    useEffect(() => {
        const burgerMenu = burgerMenuRef.current;
        const searchCityInput = searchCityInputRef.current;
        const pinInSearch = pinInSearchRef.current;

        if (burgerMenu && searchCityInput && pinInSearch) {
            const handler = new BurgerMenuHandler({
                burgerMenu: burgerMenu,
                searchCityInput: searchCityInput,
                pinInSearch: pinInSearch,
            });
            setBurgerMenuHandler(handler);
        }
    }, [burgerMenuRef, searchCityInputRef, pinInSearchRef]);

    return (
        <>
            <div className="burger-menu" ref={burgerMenuRef}>
                <button
                    className="burger-menu__button"
                    onClick={() => burgerMenuHandler?.toggleBurgerMenu(isBurgerMenuOpen, setIsBurgerMenuOpen)}
                >
                    <div className="burger-menu__button-icon">
                        <hr className="burger-menu__button-icon-line burger-menu__button-icon-line--top" />
                        <hr className="burger-menu__button-icon-line burger-menu__button-icon-line--middle" />
                        <hr className="burger-menu__button-icon-line burger-menu__button-icon-line--bottom" />
                    </div>
                </button>
                <form className="burger-menu__search-city">
                    <img
                        src={pinSvgPath}
                        className="burger-menu__search-city-pin"
                        ref={pinInSearchRef}
                        onClick={() =>
                            burgerMenuHandler?.togglePinCityInSearch(isPinCityInSearch, setIsPinCityInSearch)
                        }
                    />

                    <input
                        className="burger-menu__search-city-input"
                        type="text"
                        name=""
                        id="searchTextBox"
                        ref={searchCityInputRef}
                    />
                    <button
                        className="burger-menu__search-city-btn"
                        type="button"
                        style={{ background: dominantColor + 80 }}
                        ref={searchCityBtnRef}
                        onClick={() =>
                            burgerMenuHandler?.handleSearchCity(
                                isPinCityInSearch,
                                setIsPinCityInSearch,
                                fetchCurrentWeather
                            )
                        }
                    >
                        <img src={searchSvgPath} alt="🔍" />
                    </button>
                </form>
                <ul className="burger-menu__pinned-city-list">
                    {burgerMenuHandler?.PinnedCityArr &&
                        burgerMenuHandler?.PinnedCityArr.map((city) => {
                            return (
                                <li
                                    className="burger-menu__pinned-city-list-item"
                                    key={city}
                                    onClick={() => fetchCurrentWeather(city)}
                                >
                                    <span
                                        className="burger-menu__pinned-city-list-item-remover"
                                        onClick={() => burgerMenuHandler.removeCityFromPinned(city)}
                                    >
                                        +
                                    </span>{" "}
                                    {transcribe(city, currentLang)}
                                </li>
                            );
                        })}
                </ul>
                <nav className="burger-menu__navbar">
                    <ul className="burger-menu__navbar-link-list">
                        <li className="burger-menu__navbar-link-list-item">
                            <a href="#sectionHour24">
                                ⏰ <span>{translationsRecord.hour24Title[currentLang]}</span>
                            </a>
                        </li>
                        <li className="burger-menu__navbar-link-list-item">
                            <a href="#sectionWind">
                                🍃 <span>{translationsRecord.windTitle[currentLang]}</span>
                            </a>
                        </li>
                        <li className="burger-menu__navbar-link-list-item">
                            <a href="#sectionAnother">
                                🌟 <span>{translationsRecord.anotherTitle[currentLang]}</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                <div className="burger-menu__control">
                    <div
                        className="burger-menu__control-lang"
                        onClick={() => burgerMenuHandler?.nextLanguage(currentLang, setCurrentLang)}
                    >
                        {LanguageFlags[currentLang]}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BurgerMenu;
