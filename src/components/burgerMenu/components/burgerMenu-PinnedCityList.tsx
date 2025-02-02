import { FC } from "react";
import useAppContext from "@root/src/components/app/AppContext";
import useBurgerMenuContext from "../BurgerMenuContext";
import transcribe from "@helpers/transcribeToEnglish";

const BurgerMenu_PinnedCityList: FC = () => {
    const { language, theme, changeCity } = useAppContext();
    const { pinnedCityList, removeCity: removeCityFromPinned } = useBurgerMenuContext();

    return (
        <ul className="burger-menu__pinned-city-list">
            {pinnedCityList.map((city) => {
                return (
                    <li className="burger-menu__pinned-city-list-item" key={city}>
                        <span
                            className="burger-menu__pinned-city-list-item-remover"
                            onClick={() => removeCityFromPinned(city)}
                            style={{ color: theme === "#434343" ? "#F8F8F8" : "#434343" }}
                        >
                            +
                        </span>{" "}
                        <span onClick={() => changeCity(city)}>{transcribe(city, language)}</span>
                    </li>
                );
            })}
        </ul>
    );
};

export default BurgerMenu_PinnedCityList;
