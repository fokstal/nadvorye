import { FC, useEffect, useState } from "react";
import data_Clear from "@assets/data/_Clear";
import data_Minsk from "@assets/data/Minsk";
import data_Ottava from "@assets/data/Ottava";
import data_Pekin from "@assets/data/Pekin";
import data_Seul from "@assets/data/Seul";
import data_Valencia from "@assets/data/Valencia";
import useAppContext from "@components/app/AppContext";
import AngleSVG from "@components/svg/angleSVG";
import ApiSVG from "@components/svg/apiSVG";
import DataSVG from "@components/svg/dataSVG";
import translationsRecord from "@const/translationsRecord";
import transcribe from "@helpers/transcribeToEnglish";
import "./adminPanel.scss";

enum StaticDataSelect {
    DEFAULT = "default",
    NULL = "null",
    MINSK = "Minsk",
    OTTAVA = "Ottava",
    PEKIN = "Pekin",
    SEUL = "Seul",
    VALENCIA = "Valencia",
}

interface IAdminPanel {
    style: React.CSSProperties;
}

const AdminPanel: FC<IAdminPanel> = ({ style }) => {
    const { language, theme, allowApi, changeCity, changeStaticData, toggleAllowApi } = useAppContext();

    const [isVisible, setIsVisible] = useState(false);
    const [selectedStaticData, setSelectedStaticData] = useState(StaticDataSelect.DEFAULT);

    const handleSelectStaticData = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStaticData(event.target.value as StaticDataSelect);
    };

    useEffect(() => {
        localStorage.removeItem("weather");
        localStorage.removeItem("weatherDaily");

        switch (selectedStaticData) {
            case StaticDataSelect.DEFAULT:
            case StaticDataSelect.NULL: {
                changeStaticData(data_Clear);
                changeCity("Пустой");
                break;
            }
            case StaticDataSelect.MINSK: {
                changeStaticData({
                    current: data_Minsk.current_at_291224_0915,
                    future: data_Minsk.future_060125_210125,
                });
                changeCity("Минск");
                break;
            }
            case StaticDataSelect.OTTAVA: {
                changeStaticData({
                    current: data_Ottava.current_at_050225_1115,
                    future: [],
                });
                changeCity("Оттава");
                break;
            }
            case StaticDataSelect.PEKIN: {
                changeStaticData({
                    current: data_Pekin.current_at_291224_1545,
                    future: [],
                });
                changeCity("Пекин");
                break;
            }
            case StaticDataSelect.VALENCIA: {
                changeStaticData({
                    current: data_Valencia.current_at_050225_1400,
                    future: data_Valencia.future_050225_200225,
                });
                changeCity("Валенсия");
                break;
            }
            case StaticDataSelect.SEUL: {
                changeStaticData({
                    current: data_Seul.current_at_090225_0300,
                    future: [],
                });
                changeCity("Сеул");
                break;
            }
            default: {
                changeStaticData(data_Clear);
                changeCity("Минск");
            }
        }
    }, [selectedStaticData]);

    return (
        <div className={`admin-panel ${isVisible ? "admin-panel--visible" : ""}`} style={style}>
            <div className="admin-panel__header" onClick={() => setIsVisible((prev) => !prev)}>
                <AngleSVG className="admin-panel__header-icon" stroke={theme} />
            </div>
            <div className="admin-panel__body" style={{ borderColor: theme }}>
                <div className="admin-panel__body-api">
                    <label className="admin-panel__body-label">
                        <ApiSVG className="admin-panel__body-icon" />
                        {translationsRecord.use[language]} API:
                    </label>
                    <input
                        className="admin-panel__body-api-checkbox"
                        type="checkbox"
                        checked={allowApi}
                        onChange={toggleAllowApi}
                    />
                </div>
                <div
                    className={`admin-panel__body-static-data ${
                        allowApi ? "admin-panel__body-static-data--disabled" : ""
                    }`}
                >
                    <label className="admin-panel__body-label">
                        <DataSVG className="admin-panel__body-icon" />
                        {translationsRecord.staticData[language]} :
                    </label>
                    <select
                        className="admin-panel__body-static-data-select"
                        value={selectedStaticData}
                        onChange={handleSelectStaticData}
                    >
                        <option value={StaticDataSelect.DEFAULT} disabled>
                            {translationsRecord.select[language]}
                        </option>
                        <option value={StaticDataSelect.NULL}>{translationsRecord.null[language]} </option>
                        <option value={StaticDataSelect.MINSK}>{transcribe("Минск", language)}</option>
                        <option value={StaticDataSelect.OTTAVA}>{transcribe("Оттава", language)}</option>
                        <option value={StaticDataSelect.PEKIN}>{transcribe("Пекин", language)}</option>
                        <option value={StaticDataSelect.SEUL}>{transcribe("Сеул", language)}</option>
                        <option value={StaticDataSelect.VALENCIA}>{transcribe("Валенсия", language)}</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
