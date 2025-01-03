import baseImgPath from "@assets/images/base.jpg";
import sunnyDayImgPath from "@assets/images/sunny-day.jpg";
import sunnyNightImgPath from "@assets/images/sunny-night.jpg";
import cloudDayImgPath from "@assets/images/cloud-day.jpg";
import cloudNightImgPath from "@assets/images/cloud-night.jpg";
import mistDayImgPath from "@assets/images/mist-day.jpg";
import mistNightImgPath from "@assets/images/mist-night.jpg";
import rainDayImgPath from "@assets/images/rain-day.jpg";
import rainNightImgPath from "@assets/images/rain-night.jpg";
import someRainDayImgPath from "@assets/images/some-rain-day.jpg";
import someRainNightImgPath from "@assets/images/some-rain-night.jpg";
import snowDayImgPath from "@assets/images/snow-day.jpg";
import snowNightImgPath from "@assets/images/snow-night.jpg";
import someSnowDayImgPath from "@assets/images/some-snow-day.jpg";
import someSnowNightImgPath from "@assets/images/some-snow-night.jpg";
import thunderDayImgPath from "@assets/images/thunder-day.jpg";
import thunderNightImgPath from "@assets/images/thunder-night.jpg";

interface ImagePaths {
    day: string;
    night: string;
}

type ImagesMap = {
    [key: number]: ImagePaths | number;
};

class BackgroundWorker {
    private _homeBackground: HTMLImageElement;
    private _body: HTMLBodyElement;
    private _images: ImagesMap = {
        1000: {
            day: sunnyDayImgPath,
            night: sunnyNightImgPath,
        },
        1003: {
            day: cloudDayImgPath,
            night: cloudNightImgPath,
        },
        1006: 1003,
        1009: 1003,
        1030: {
            day: mistDayImgPath,
            night: mistNightImgPath,
        },
        1135: 1030,
        1147: 1030,
        1180: {
            day: rainDayImgPath,
            night: rainNightImgPath,
        },
        1183: 1180,
        1186: 1180,
        1240: 1180,
        1246: 1180,
        1189: 1180,
        1192: 1180,
        1195: 1180,
        1243: 1180,
        1063: {
            day: someRainDayImgPath,
            night: someRainNightImgPath,
        },
        1069: 1063,
        1150: 1063,
        1153: 1063,
        1249: 1063,
        1252: 1063,
        1210: {
            day: snowDayImgPath,
            night: snowNightImgPath,
        },
        1213: 1210,
        1216: 1210,
        1255: 1210,
        1261: 1210,
        1219: 1210,
        1222: 1210,
        1225: 1210,
        1237: 1210,
        1258: 1210,
        1264: 1210,
        1066: {
            day: someSnowDayImgPath,
            night: someSnowNightImgPath,
        },
        1072: 1066,
        1114: 1066,
        1117: 1066,
        1168: 1066,
        1171: 1066,
        1198: 1066,
        1201: 1066,
        1204: 1066,
        1207: 1066,
        1087: {
            day: thunderDayImgPath,
            night: thunderNightImgPath,
        },
        1273: 1087,
        1276: 1087,
        1279: 1087,
        1282: 1087,
    };

    public constructor(homeBackgroundSelector: string) {
        this._homeBackground = document.querySelector(homeBackgroundSelector) as HTMLImageElement;
        this._body = document.querySelector("body") as HTMLBodyElement;
    }

    public changeByWeatherType(weatherCode: number, is_day: boolean) {
        const imagePath = this.getImageByKey(weatherCode, is_day ? "day" : "night");

        this._homeBackground.classList.add("out");

        setTimeout(() => {
            this._homeBackground.src = imagePath;
            this._body.style.backgroundImage = `url(${imagePath})`;

            this._homeBackground.classList.remove("out");
        }, 500);
    }

    private getImageByKey(key: number, timeOfDay: "day" | "night"): string {
        let current: ImagePaths | number | undefined = this._images[key];

        while (typeof current === "number") {
            current = this._images[current];
        }

        if (current && typeof current === "object") {
            return current[timeOfDay];
        }

        return baseImgPath;
    }
}

export default BackgroundWorker;
