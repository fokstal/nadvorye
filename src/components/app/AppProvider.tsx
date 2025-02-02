import { FC, ReactNode, useReducer } from "react";
import Language from "@const/Language";
import Theme from "@const/Theme";
import { AppContext } from "./AppContext";

interface IAppProvider {
    children: ReactNode;
}

enum AppReducerType {
    CHANGE_CITY = "CHANGE_CITY",
    CHANGE_LANGUAGE = "CHANGE_LANGUAGE",
    CHANGE_THEME = "CHANGE_THEME",
    CHANGE_DOMINANT_COLOR = "CHANGE_DOMINANT_COLOR",
    TOGGLE_ALLOW_API = "TOGGLE_ALLOW_API",
}

const initialState = {
    city: "Минск",
    language: Language.RU,
    theme: Theme.WHITE,
    dominantColor: "transparent",
    allowApi: false,
};

interface AppAction {
    type: AppReducerType;
    city?: string;
    language?: Language;
    theme?: Theme;
    dominantColor?: string;
}

const reducer = (state: typeof initialState, action: AppAction) => {
    switch (action.type) {
        case AppReducerType.CHANGE_CITY:
            return {
                ...state,
                city: action.city || initialState.city,
            };
        case AppReducerType.CHANGE_LANGUAGE:
            return {
                ...state,
                language: action.language || initialState.language,
            };
        case AppReducerType.CHANGE_THEME:
            return {
                ...state,
                theme: action.theme || initialState.theme,
            };
        case AppReducerType.CHANGE_DOMINANT_COLOR:
            return {
                ...state,
                dominantColor: action.dominantColor || initialState.dominantColor,
            };
        case AppReducerType.TOGGLE_ALLOW_API:
            return {
                ...state,
                allowApi: !state.allowApi,
            };
        default:
            return state;
    }
};

const AppProvider: FC<IAppProvider> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const changeCity = (newCity: string): void => dispatch({ type: AppReducerType.CHANGE_CITY, city: newCity });

    const changeLanguage = (newLanguage: Language): void =>
        dispatch({ type: AppReducerType.CHANGE_LANGUAGE, language: newLanguage });

    const changeTheme = (newTheme: Theme): void => dispatch({ type: AppReducerType.CHANGE_THEME, theme: newTheme });

    const changeDominantColor = (newDominantColor: string): void =>
        dispatch({ type: AppReducerType.CHANGE_DOMINANT_COLOR, dominantColor: newDominantColor });

    const toggleAllowApi = (): void => dispatch({ type: AppReducerType.TOGGLE_ALLOW_API });

    return (
        <AppContext.Provider
            value={{
                ...state,
                changeCity,
                changeLanguage,
                changeTheme,
                changeDominantColor,
                toggleAllowApi,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
export default AppProvider;
