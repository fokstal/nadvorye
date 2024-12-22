import { FC } from "react";
import "./Header.scss";

const Header: FC = () => {
    return (
        <>
            <header className="header">
                <h1 className="header__logo">Nadvorye</h1>
                <ul className="header__link-list">
                    <li className="header__link-list-item">
                        <a href="#">Current</a>
                    </li>
                    <li className="header__link-list-item">
                        <a href="#">On month</a>
                    </li>
                    <li className="header__link-list-item">
                        <a href="#">By setting</a>
                    </li>
                </ul>
            </header>
        </>
    );
};

export default Header;
