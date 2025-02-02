import { FC } from "react";
import AppProvider from "./AppProvider";
import AppLayout from "./appLayout";
import "./appStyle.scss";

const App: FC = () => {
    return (
        <AppProvider>
            <AppLayout />
        </AppProvider>
    );
};

export default App;
