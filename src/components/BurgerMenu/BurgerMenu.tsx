import { FC, MutableRefObject, useEffect, useRef, useState } from "react";
import Language, { LanguageFlags } from "../../const/Language";
import searchIcon from "../../assets/icons/search.svg";
import "./BurgerMenu.scss";

interface IBurgerMenu {
    dominantColor: string;
    currentLang: Language;
    searchCityInputRef: MutableRefObject<HTMLInputElement | null>;
    setCurrentLang: (lang: Language) => void;
    setCurrentCity: (city: string) => void;
    fetchCurrentWeather: () => void;
}

const BurgerMenu: FC<IBurgerMenu> = ({
    dominantColor,
    currentLang,
    searchCityInputRef,
    setCurrentLang,
    setCurrentCity,
    fetchCurrentWeather,
}) => {
    const burgerMenuRef = useRef<HTMLDivElement | null>(null);
    const burgerBtnLineTopRef = useRef<HTMLHRElement | null>(null);
    const burgerBtnLineMiddleRef = useRef<HTMLHRElement | null>(null);
    const burgerBtnLineBottomRef = useRef<HTMLHRElement | null>(null);
    const burgerMenuSearchCityFormRef = useRef<HTMLFormElement | null>(null);
    const linkHour24Ref = useRef<HTMLLinkElement | null>(null);
    const linkWindRef = useRef<HTMLLinkElement | null>(null);
    const linkAnotherRef = useRef<HTMLLinkElement | null>(null);

    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

    const languagesArray = Object.values(Language);
    const burgerMenu = burgerMenuRef.current;
    const burgerBtnLineTop = burgerBtnLineTopRef.current;
    const burgerBtnLineMiddle = burgerBtnLineMiddleRef.current;
    const burgerBtnLineBottom = burgerBtnLineBottomRef.current;
    const burgerMenuSearchCityForm = burgerMenuSearchCityFormRef.current;
    const linkHour24 = linkHour24Ref.current;
    const linkWind = linkWindRef.current;
    const linkAnother = linkAnotherRef.current;

    const nextLanguage = () => {
        const currentIndex = languagesArray.indexOf(currentLang);
        const nextIndex = (currentIndex + 1) % languagesArray.length;
        setCurrentLang(languagesArray[nextIndex]);
    };

    const toggleBurgerMenu = () => {
        if (burgerMenu) {
            setIsBurgerMenuOpen(!isBurgerMenuOpen);

            if (isBurgerMenuOpen) {
                burgerMenu.style.width = "30%";

                if (burgerBtnLineTop) burgerBtnLineTop.classList.add("burger-btn__icon-line-top--active");
                if (burgerBtnLineMiddle) burgerBtnLineMiddle.classList.add("burger-btn__icon-line-middle--active");
                if (burgerBtnLineBottom) burgerBtnLineBottom.classList.add("burger-btn__icon-line-bottom--active");
                if (burgerMenuSearchCityForm)
                    burgerMenuSearchCityForm.classList.add("burger-menu__search-city--active");

                if (linkHour24) {
                    linkHour24.style.fontSize = "28px";
                    linkHour24.style.opacity = "1";
                }
                if (linkWind) {
                    linkWind.style.fontSize = "28px";
                    linkWind.style.opacity = "1";
                }
                if (linkAnother) {
                    linkAnother.style.fontSize = "28px";
                    linkAnother.style.opacity = "1";
                }
            }

            if (!isBurgerMenuOpen) {
                burgerMenu.style.width = "50px";

                if (burgerBtnLineTop) burgerBtnLineTop.classList.remove("burger-btn__icon-line-top--active");
                if (burgerBtnLineMiddle) burgerBtnLineMiddle.classList.remove("burger-btn__icon-line-middle--active");
                if (burgerBtnLineBottom) burgerBtnLineBottom.classList.remove("burger-btn__icon-line-bottom--active");
                if (burgerMenuSearchCityForm)
                    burgerMenuSearchCityForm.classList.remove("burger-menu__search-city--active");

                if (linkHour24) {
                    linkHour24.style.fontSize = "0";
                    linkHour24.style.opacity = "0";
                }
                if (linkWind) {
                    linkWind.style.fontSize = "0";
                    linkWind.style.opacity = "0";
                }
                if (linkAnother) {
                    linkAnother.style.fontSize = "0";
                    linkAnother.style.opacity = "0";
                }
            }
        }
    };

    useEffect(() => {
        toggleBurgerMenu();
    }, []);

    return (
        <>
            <div className="burger-menu" ref={burgerMenuRef}>
                <button className="burger-btn" onClick={() => toggleBurgerMenu()}>
                    <div className="burger-btn__icon">
                        <hr className="burger-btn__icon-line burger-btn__icon-line-top" ref={burgerBtnLineTopRef} />
                        <hr
                            className="burger-btn__icon-line burger-btn__icon-line-middle"
                            ref={burgerBtnLineMiddleRef}
                        />
                        <hr
                            className="burger-btn__icon-line burger-btn__icon-line-bottom"
                            ref={burgerBtnLineBottomRef}
                        />
                    </div>
                </button>
                <form className="burger-menu__search-city" ref={burgerMenuSearchCityFormRef}>
                    <input
                        className="burger-menu__search-city-input"
                        type="text"
                        name=""
                        id="searchTextBox"
                        ref={searchCityInputRef}
                        onChange={(e) => setCurrentCity(e.target.value)}
                    />
                    <button
                        className="burger-menu__search-city-btn"
                        type="button"
                        style={{ background: dominantColor + 80 }}
                        onClick={() => fetchCurrentWeather()}
                    >
                        <img src={searchIcon} alt="🔍" />
                    </button>
                </form>
                <nav className="burger-menu__navbar">
                    <ul className="burger-menu__navbar-link-list">
                        <li className="burger-menu__navbar-link-list-item">
                            <a href="#sectionHour24">
                                ⏰ <span ref={linkHour24Ref}>24 часовой прогноз</span>
                            </a>
                        </li>
                        <li className="burger-menu__navbar-link-list-item">
                            <a href="#sectionWind">
                                🍃 <span ref={linkWindRef}>Ветер</span>
                            </a>
                        </li>
                        <li className="burger-menu__navbar-link-list-item">
                            <a href="#sectionAnother">
                                🌟 <span ref={linkAnotherRef}>Другие данные</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                <div className="burger-menu__control">
                    <div className="burger-menu__control-lang" onClick={() => nextLanguage()}>
                        {LanguageFlags[currentLang]}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BurgerMenu;
