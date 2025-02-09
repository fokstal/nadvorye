import { FC, useState } from "react";
import useAppContext from "@components/app/AppContext";
import AngleSVG from "@components/svg/angleSVG";
import ApiSVG from "@components/svg/apiSVG";
import DataSVG from "@components/svg/dataSVG";
import "./adminPanel.scss";

interface IAdminPanel {
    style: React.CSSProperties;
}

const AdminPanel: FC<IAdminPanel> = ({ style }) => {
    const { allowApi, toggleAllowApi } = useAppContext();

    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className={`admin-panel ${isVisible ? "admin-panel--visible" : ""}`} style={style}>
            <div className="admin-panel__header" onClick={() => setIsVisible((prev) => !prev)}>
                <AngleSVG className="admin-panel__header-icon" />
            </div>
            <div className="admin-panel__body">
                <div className="admin-panel__body-api">
                    <label className="admin-panel__body-api-label">
                        <ApiSVG className="admin-panel__body-icon" />
                        Использовать API:
                    </label>
                    <input
                        className="admin-panel__body-api-checkbox"
                        type="checkbox"
                        checked={allowApi}
                        onChange={toggleAllowApi}
                    />
                </div>
                <div className="admin-panel__body-static-data">
                    <label>
                        <DataSVG className="admin-panel__body-icon" />
                        Статические данные:
                    </label>
                    <select className="admin-panel__body-static-data-select">
                        <option disabled selected>
                            Выбор
                        </option>
                        <option>Минск</option>
                        <option>Витебск</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
