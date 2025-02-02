enum Language {
    RU = "ru-RU",
    EN = "en-US",
}

const LanguageFlags: { [key in Language]: string } = {
    [Language.RU]: "🇷🇺",
    [Language.EN]: "🇬🇧",
};

export default Language;
export { LanguageFlags };
