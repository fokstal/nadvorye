import { FC } from "react";
import IComponentSVG, { defaultComponentSVGProps } from "@root/src/models/IComponentSVG";

const HomeSVG: FC<IComponentSVG> = (props) => {
    const { fillColor } = { ...defaultComponentSVGProps, ...props };

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 20 20">
            <path
                fill={fillColor}
                d="M18.672 11H17v6c0 .445-.194 1-1 1h-4v-6H8v6H4c-.806 0-1-.555-1-1v-6H1.328c-.598 0-.47-.324-.06-.748L9.292 2.22c.195-.202.451-.302.708-.312c.257.01.513.109.708.312l8.023 8.031c.411.425.539.749-.059.749z"
            />
        </svg>
    );
};

export default HomeSVG;
