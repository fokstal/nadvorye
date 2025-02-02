import { FC } from "react";
import BurgerMenuLayout from "./burgerMenuLayout";
import BurgerMenuProvider from "./BurgerMenuProvider";
import "./styles.scss";

const BurgerMenu: FC = () => {
    return (
        <BurgerMenuProvider>
            <BurgerMenuLayout />
        </BurgerMenuProvider>
    );
};

export default BurgerMenu;
