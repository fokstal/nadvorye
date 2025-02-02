import { FC } from "react";
import useAppContext from "@root/src/components/app/AppContext";
import translationsRecord from "@const/translationsRecord";

const BurgerMenu_Navbar: FC = () => {
    const { language } = useAppContext();

    return (
        <nav className="burger-menu__navbar">
            <ul className="burger-menu__navbar-link-list">
                <li className="burger-menu__navbar-link-list-item">
                    <a href="#sectionHourly">
                        ⏰ <span>{translationsRecord.hourlyNavbarTitle[language]}</span>
                    </a>
                </li>
                <li className="burger-menu__navbar-link-list-item">
                    <a href="#sectionWind">
                        🍃 <span>{translationsRecord.windTitle[language]}</span>
                    </a>
                </li>
                <li className="burger-menu__navbar-link-list-item">
                    <a href="#sectionDetails">
                        🌟 <span>{translationsRecord.detailsTitle[language]}</span>
                    </a>
                </li>
                <li className="burger-menu__navbar-link-list-item">
                    <a href="#sectionDaily">
                        🗓️ <span>{translationsRecord.dailyNavbarTitle[language]}</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default BurgerMenu_Navbar;
