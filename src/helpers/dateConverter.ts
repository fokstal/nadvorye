import Language from "../const/Language";

const convertFullDateFrom_ISO8601 = (isoDate: string, lang = Language.RU): string => {
    const date = new Date(isoDate);

    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: lang === Language.EN,
    };

    const formattedDate = date.toLocaleString(lang, options);

    return formattedDate;
};

const convertTimeFrom_ISO8601 = (isoDate: string, lang = Language.RU, isResetMinutes = false): string => {
    const date = new Date(isoDate);

    isResetMinutes && date.setMinutes(0);

    const options: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "numeric",
        hour12: lang === Language.EN,
    };

    const formattedDate = date.toLocaleTimeString(lang, options);

    return formattedDate;
};

const convertDateFrom_ISO8601 = (isoDate: string, lang = Language.RU): string => {
    const date = new Date(isoDate);

    const formattedDate = date.toLocaleDateString(lang);

    return formattedDate;
};

const formatTimeForLocale = (timeString: string, lang = Language.RU): string => {
    const [time, modifier] = timeString.split(" ");
    let [hours, minutes] = time.split(":");

    if (modifier === "PM" && hours !== "12") {
        hours = (parseInt(hours, 10) + 12).toString();
    } else if (modifier === "AM" && hours === "12") {
        hours = "00";
    }

    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));

    return new Intl.DateTimeFormat(lang, {
        hour: "numeric",
        minute: "numeric",
        hour12: lang === Language.EN,
    }).format(date);
};

export { convertFullDateFrom_ISO8601, convertTimeFrom_ISO8601, convertDateFrom_ISO8601, formatTimeForLocale };
