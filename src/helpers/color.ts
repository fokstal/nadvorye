type RGBModel = {
    r: number;
    g: number;
    b: number;
};

const rgbToHex = (rgb: RGBModel): string => {
    const { r, g, b } = { ...rgb };

    const toHex = (c: number) => {
        const hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const hexToRgb = (hex: string): RGBModel => {
    hex = hex.replace(/^#/, "");

    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r, g, b };
};

const getTextColor = (dominantColor: string): string => {
    const { r, g, b } = hexToRgb(dominantColor);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness > 120 ? "#434343" : "#f5f5f5";
};

const getDominantColorInHex = (image: HTMLImageElement): string => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("Не удалось получить контекст канваса");
    }

    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const colorCount: { [key: string]: number } = {};
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const rgb = `${r},${g},${b}`;

        if (colorCount[rgb]) {
            colorCount[rgb]++;
        } else {
            colorCount[rgb] = 1;
        }
    }

    let dominantColor = "";
    let maxCount = 0;
    for (const color in colorCount) {
        if (colorCount[color] > maxCount) {
            maxCount = colorCount[color];
            dominantColor = color;
        }
    }

    const [r, g, b] = dominantColor.split(",").map(Number);

    return rgbToHex({ r, g, b });
};

export { type RGBModel, rgbToHex, hexToRgb, getDominantColorInHex, getTextColor };
