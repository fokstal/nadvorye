import { Dispatch, FC, SetStateAction } from "react";
import "./Header.scss";

interface IHeader {
    isUseApi: boolean;
    setIsUseApi: Dispatch<SetStateAction<boolean>>;
}

const Header: FC<IHeader> = ({ isUseApi, setIsUseApi }) => {
    return (
        <>
            <header className="header">
                <h1 className="header__logo">Nadvorye</h1>
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
