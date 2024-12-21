function getDominantColor(image: HTMLImageElement): string {
    // Создаем элемент canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Не удалось получить контекст канваса');
    }

    // Устанавливаем размеры канваса равными размерам изображения
    canvas.width = image.width;
    canvas.height = image.height;

    // Рисуем изображение на канвасе
    ctx.drawImage(image, 0, 0);

    // Получаем данные о пикселях
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Считаем частоту цветов
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

    // Находим наиболее частый цвет
    let dominantColor = '';
    let maxCount = 0;
    for (const color in colorCount) {
        if (colorCount[color] > maxCount) {
            maxCount = colorCount[color];
            dominantColor = color;
        }
    }

    return `rgb(${dominantColor})`;
}

export default getDominantColor;