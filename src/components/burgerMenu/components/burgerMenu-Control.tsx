import { FC } from "react";
import useAppContext from "@root/src/components/app/AppContext";
import Language, { LanguageFlags } from "@const/Language";

const languageArr = Object.values(Language);

const BurgerMenu_Control: FC = () => {
    const { language, changeLanguage } = useAppContext();

    const nextLanguage = (currentLang: Language, setCurrentLang: (lang: Language) => void) => {
        const currentIndex = languageArr.indexOf(currentLang);
        const nextIndex = (currentIndex + 1) % languageArr.length;

        setCurrentLang(languageArr[nextIndex]);
    };

    return (
        <div className="burger-menu__control">
            <div className="burger-menu__control-lang" onClick={() => nextLanguage(language, changeLanguage)}>
                {LanguageFlags[language]}
            </div>
        </div>
    );
};

export default BurgerMenu_Control;
