import { createContext, useContext } from "react";

interface IBurgerMenuContext {
    isOpen: boolean;
    pinnedCityList: string[];
    toggle: () => void;
    addCity: (city: string) => void;
    removeCity: (city: string) => void;
}

const BurgerMenuContext = createContext<IBurgerMenuContext | undefined>(undefined);

function useBurgerMenuContext(): IBurgerMenuContext {
    const context = useContext(BurgerMenuContext);

    if (!context) throw new Error("useBurgerMenuContext must be used within a BurgerMenuProvider.");

    return context;
}

export default useBurgerMenuContext;
export { BurgerMenuContext };
