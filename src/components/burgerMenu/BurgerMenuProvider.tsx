import { FC, ReactNode, useReducer } from "react";
import { BurgerMenuContext } from "./BurgerMenuContext";
import SessionStorageWorker from "@root/src/helpers/SessionStorageWorker";

const initValue = {
    isOpen: false,
    pinnedCityList: SessionStorageWorker.getPinnedCityArr(),
};

enum IBurgerMenuReducerType {
    TOGGLE = "TOGGLE",
    ADD_CITY = "ADD_CITY",
    REMOVE_CITY = "REMOVE_CITY",
}

interface IBurgerMenuAction {
    type: IBurgerMenuReducerType;
    city?: string;
}

const reducer = (state: typeof initValue, action: IBurgerMenuAction) => {
    switch (action.type) {
        case IBurgerMenuReducerType.TOGGLE:
            return {
                ...state,
                isOpen: !state.isOpen,
            };
        case IBurgerMenuReducerType.ADD_CITY: {
            if (action.city) {
                if (!state.pinnedCityList.includes(action.city)) {
                    state.pinnedCityList.push(action.city);

                    SessionStorageWorker.setPinnedCityArr(state.pinnedCityList);
                }
            }

            return { ...state };
        }
        case IBurgerMenuReducerType.REMOVE_CITY: {
            state.pinnedCityList = state.pinnedCityList.filter((pinnedCity) => pinnedCity !== action.city);

            SessionStorageWorker.setPinnedCityArr(state.pinnedCityList);

            return { ...state };
        }
    }
};

interface IBurgerMenuProvider {
    children: ReactNode;
}

const BurgerMenuProvider: FC<IBurgerMenuProvider> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initValue);

    const toggle = () => dispatch({ type: IBurgerMenuReducerType.TOGGLE });

    const addCity = (city: string) => dispatch({ type: IBurgerMenuReducerType.ADD_CITY, city });

    const removeCity = (city: string) => dispatch({ type: IBurgerMenuReducerType.REMOVE_CITY, city });

    return (
        <BurgerMenuContext.Provider
            value={{
                ...state,
                toggle,
                addCity,
                removeCity,
            }}
        >
            {children}
        </BurgerMenuContext.Provider>
    );
};

export default BurgerMenuProvider;
