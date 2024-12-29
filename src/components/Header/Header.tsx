import { Dispatch, FC, SetStateAction } from "react";
import translationsRecord from "../../const/translationsRecord";
import Language from "../../const/Language";
import "./Header.scss";

interface IHeader {
    currentLang: Language
    isUseApi: boolean;
    setIsUseApi: Dispatch<SetStateAction<boolean>>;
}

const Header: FC<IHeader> = ({ currentLang, isUseApi, setIsUseApi }) => {
    return (
        <>
            <header className="header">
                <h1 className="header__logo">{translationsRecord.headerTitle[currentLang]}</h1>
                <input
                    type="checkbox"
                    name=""
                    id=""
                    checked={isUseApi}
                    onChange={() => setIsUseApi((prevChecked) => !prevChecked)}
                />
            </header>
        </>
    );
};

export default Header;
