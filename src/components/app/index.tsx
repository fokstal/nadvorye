import { FC } from "react";
import AppProvider from "./AppProvider";
import AppLayout from "./appLayout";
import "./styles.scss";

const App: FC = () => {
    return (
        <AppProvider>
            <AppLayout />
        </AppProvider>
    );
};

export default App;
