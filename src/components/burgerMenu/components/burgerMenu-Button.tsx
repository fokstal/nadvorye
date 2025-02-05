import { FC } from "react";
import useAppContext from "@root/src/components/app/AppContext";
import useBurgerMenuContext from "../BurgerMenuContext";

const BurgerMenu_Button: FC = () => {
    const { theme } = useAppContext();
    const { toggle: toggleBurgerMenu } = useBurgerMenuContext();

    const lineStyle = {
        background: theme,
        borderColor: theme,
    };

    return (
        <button className="burger-menu__button" onClick={toggleBurgerMenu}>
            <div className="burger-menu__button-icon">
                <hr style={lineStyle} className="burger-menu__button-icon-line burger-menu__button-icon-line--top" />
                <hr style={lineStyle} className="burger-menu__button-icon-line burger-menu__button-icon-line--middle" />
                <hr style={lineStyle} className="burger-menu__button-icon-line burger-menu__button-icon-line--bottom" />
            </div>
        </button>
    );
};

export default BurgerMenu_Button;
