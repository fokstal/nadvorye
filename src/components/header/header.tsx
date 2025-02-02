import { FC } from "react";
import useAppContext from "@components/app/AppContext";
import translationsRecord from "@const/translationsRecord";
import "./header.scss";

const Header: FC = () => {
    const { language, allowApi, toggleAllowApi } = useAppContext();

    return (
        <header className="header">
            <h1 className="header__logo">{translationsRecord.headerTitle[language]}</h1>
            <input type="checkbox" checked={allowApi} onChange={toggleAllowApi} />
        </header>
    );
};

export default Header;
