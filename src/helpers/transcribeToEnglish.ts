import Language from "../const/Language";

const transcriptionMapRUtoEN: { [key: string]: string } = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "yo",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "shch",
    ъ: "",
    ы: "y",
    ь: "",
    э: "e",
    ю: "yu",
    я: "ya",
};

const transcriptionMapENtoRU: { [key: string]: string } = {
    a: "а",
    b: "б",
    v: "в",
    g: "г",
    d: "д",
    e: "е",
    yo: "ё",
    zh: "ж",
    z: "з",
    i: "и",
    y: "й",
    k: "к",
    l: "л",
    m: "м",
    n: "н",
    o: "о",
    p: "п",
    r: "р",
    s: "с",
    t: "т",
    u: "у",
    f: "ф",
    kh: "х",
    ts: "ц",
    ch: "ч",
    sh: "ш",
    shch: "щ",
    yu: "ю",
    ya: "я",
};

const transcribe = (text: string, lang: Language): string => {
    if (lang === Language.EN) {
        return text
            .split("")
            .map((char) => {
                const lowerChar = char.toLowerCase();
                const transcribedChar = transcriptionMapRUtoEN[lowerChar] || char;
                return char === lowerChar
                    ? transcribedChar
                    : transcribedChar.charAt(0).toUpperCase() + transcribedChar.slice(1);
            })
            .join("");
    } else if (lang === Language.RU) {
        let result = "";
        let i = 0;

        while (i < text.length) {
            if (i < text.length - 1 && transcriptionMapENtoRU[text.slice(i, i + 2)]) {
                const transcribedChar = transcriptionMapENtoRU[text.slice(i, i + 2)];
                result +=
                    text[i] === text[i].toUpperCase()
                        ? transcribedChar.charAt(0).toUpperCase() + transcribedChar.slice(1)
                        : transcribedChar;
                i += 2;
            } else {
                const transcribedChar = transcriptionMapENtoRU[text[i]] || text[i];
                result +=
                    text[i] === text[i].toUpperCase()
                        ? transcribedChar.charAt(0).toUpperCase() + transcribedChar.slice(1)
                        : transcribedChar;
                i++;
            }
        }

        return result;
    }

    return text;
};

export default transcribe;
