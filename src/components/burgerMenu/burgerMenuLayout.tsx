import { FC } from "react";
import BurgerMenu_Button from "./components/burgerMenu-Button";
import BurgerMenu_SearchPanel from "./components/burgerMenu-SearchPanel";
import BurgerMenu_PinnedCityList from "./components/burgerMenu-PinnedCityList";
import BurgerMenu_Navbar from "./components/burgerMenu-Navbar";
import BurgerMenu_Control from "./components/burgerMenu-Control";
import useBurgerMenuContext from "./BurgerMenuContext";

const BurgerMenuLayout: FC = () => {
    const { isOpen } = useBurgerMenuContext();

    return (
        <div className={`burger-menu ${isOpen ? "burger-menu--expanded" : ""}`}>
            <BurgerMenu_Button />
            <BurgerMenu_SearchPanel />
            <BurgerMenu_PinnedCityList />
            <BurgerMenu_Navbar />
            <BurgerMenu_Control />
        </div>
    );
};

export default BurgerMenuLayout;
