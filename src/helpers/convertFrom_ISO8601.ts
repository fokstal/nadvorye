import Language from "../const/Language";

const convertFullDateFrom_ISO8601 = (isoDate: string, lang = Language.RU): string => {
    const date = new Date(isoDate);

    const formattedDate = date.toLocaleString(lang);

    return formattedDate;
};

const convertTimeFrom_ISO8601 = (isoDate: string, lang = Language.RU): string => {
    const date = new Date(isoDate);

    const formattedDate = date.toLocaleTimeString(lang);

    return formattedDate;
};

const convertDateFrom_ISO8601 = (isoDate: string, lang = Language.RU): string => {
    const date = new Date(isoDate);

    const formattedDate = date.toLocaleDateString(lang);

    return formattedDate;
};

export { convertFullDateFrom_ISO8601, convertTimeFrom_ISO8601, convertDateFrom_ISO8601 };
