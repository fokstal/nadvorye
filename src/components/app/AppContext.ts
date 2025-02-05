import { createContext, useContext } from "react";
import Language from "@const/Language";
import Theme from "@const/Theme";

interface IAppContext {
    city: string;
    language: Language;
    theme: Theme;
    dominantColor: string;
    allowApi: boolean;
    changeCity: (newCity: string) => void;
    changeLanguage: (newLanguage: Language) => void;
    changeTheme: (newTheme: Theme) => void;
    changeDominantColor: (newDominantColor: string) => void;
    toggleAllowApi: () => void;
}

const AppContext = createContext<IAppContext | undefined>(undefined);

const useAppContext = (): IAppContext => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("useApp must be used within a AppProvider.");
    }

    return context;
};

export default useAppContext;
export { AppContext };
