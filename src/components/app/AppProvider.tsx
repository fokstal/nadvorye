import { FC, ReactNode, useReducer } from "react";
import data_Clear from "@assets/data/_Clear";
import Language from "@const/Language";
import Theme from "@const/Theme";
import WeatherDataJSONModel from "@models/WeatherDataJSONModel";
import { AppContext } from "./AppContext";

interface IAppProvider {
    children: ReactNode;
}

enum AppReducerType {
    CHANGE_CITY = "CHANGE_CITY",
    CHANGE_LANGUAGE = "CHANGE_LANGUAGE",
    CHANGE_THEME = "CHANGE_THEME",
    CHANGE_DOMINANT_COLOR = "CHANGE_DOMINANT_COLOR",
    CHANGE_STATIC_DATA = "CHANGE_STATIC_DATA",
    TOGGLE_ALLOW_API = "TOGGLE_ALLOW_API",
}

const initialState = {
    city: "Минск",
    language: Language.RU,
    theme: Theme.WHITE,
    dominantColor: "transparent",
    staticData: data_Clear,
    allowApi: false,
};

interface AppAction {
    type: AppReducerType;
    city?: string;
    language?: Language;
    theme?: Theme;
    dominantColor?: string;
    staticData?: WeatherDataJSONModel;
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
        case AppReducerType.CHANGE_STATIC_DATA:
            return {
                ...state,
                staticData: action.staticData || initialState.staticData,
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

    const changeStaticData = (newStaticData: WeatherDataJSONModel): void =>
        dispatch({ type: AppReducerType.CHANGE_STATIC_DATA, staticData: newStaticData });

    const toggleAllowApi = (): void => dispatch({ type: AppReducerType.TOGGLE_ALLOW_API });

    return (
        <AppContext.Provider
            value={{
                ...state,
                changeCity,
                changeLanguage,
                changeTheme,
                changeDominantColor,
                changeStaticData,
                toggleAllowApi,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
export default AppProvider;
