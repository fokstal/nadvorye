import { FC } from "react";
import useAppContext from "@root/src/components/app/AppContext";
import useBurgerMenuContext from "../BurgerMenuContext";

const BurgerMenu_Button: FC = () => {
    const { theme } = useAppContext();
    const { toggle: toggleBurgerMenu } = useBurgerMenuContext();

    return (
        <button className="burger-menu__button" onClick={toggleBurgerMenu}>
            <div className="burger-menu__button-icon">
                <hr
                    style={{ borderColor: theme }}
                    className="burger-menu__button-icon-line burger-menu__button-icon-line--top"
                />
                <hr
                    style={{ borderColor: theme }}
                    className="burger-menu__button-icon-line burger-menu__button-icon-line--middle"
                />
                <hr
                    style={{ borderColor: theme }}
                    className="burger-menu__button-icon-line burger-menu__button-icon-line--bottom"
                />
            </div>
        </button>
    );
};

export default BurgerMenu_Button;
