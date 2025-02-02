import { FC, useRef, useState } from "react";
import useAppContext from "@root/src/components/app/AppContext";
import useBurgerMenuContext from "../BurgerMenuContext";
import PinSVG from "@root/src/components/svg/pinSVG";
import SearchSVG from "@root/src/components/svg/searchSVG";

const BurgerMenu_SearchPanel: FC = () => {
    const { theme, dominantColor, changeCity } = useAppContext();
    const { addCity: addCityToPinnedList } = useBurgerMenuContext();

    const [isPinCityInSearch, setIsPinCityInSearch] = useState(true);

    const searchCityBtnRef = useRef<HTMLButtonElement | null>(null);
    const searchCityInputRef = useRef<HTMLInputElement | null>(null);
    const pinInSearchRef = useRef<SVGSVGElement | null>(null);

    const handleSearchCity = () => {
        if (searchCityInputRef.current) {
            const searchCityInputValue = searchCityInputRef.current.value;

            if (searchCityInputValue != "") {
                if (!isPinCityInSearch) {
                    addCityToPinnedList(searchCityInputValue);

                    setIsPinCityInSearch((prev) => !prev);
                }

                changeCity(searchCityInputValue);

                searchCityInputRef.current.value = "";
            }
        }
    };

    return (
        <form className="burger-menu__search-city">
            <PinSVG
                className={`burger-menu__search-city-pin ${
                    isPinCityInSearch ? "burger-menu__search-city-pin--rotate" : ""
                }`}
                ref={pinInSearchRef}
                onClick={() => setIsPinCityInSearch((prev) => !prev)}
                stroke={theme}
            />

            <input className="burger-menu__search-city-input" type="text" ref={searchCityInputRef} />
            <button
                className="burger-menu__search-city-btn"
                type="button"
                style={{ background: dominantColor }}
                ref={searchCityBtnRef}
                onClick={handleSearchCity}
            >
                <SearchSVG stroke={theme} />
            </button>
        </form>
    );
};

export default BurgerMenu_SearchPanel;
