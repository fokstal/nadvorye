import { FC } from "react";
import IComponentSVG, { defaultComponentSVGProps } from "@root/src/models/IComponentSVG";

const AngleSVG: FC<IComponentSVG> = (props) => {
    const { strokeColor, fillColor } = { ...defaultComponentSVGProps, ...props };

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 20 20">
            <g fill={fillColor}>
                <path d="m16.32 12.116l-6-5l-.64.768l6 5l.64-.768Z" stroke={strokeColor} />
                <path
                    d="m15.68 12.884l-6-5c-.512-.427.128-1.195.64-.768l6 5c.512.427-.128 1.195-.64.768Z"
                    stroke={strokeColor}
                />
                <path d="m4.32 12.884l6-5l-.64-.768l-6 5l.64.768Z" stroke={strokeColor} />
                <path
                    d="m3.68 12.116l6-5c.512-.427 1.152.341.64.768l-6 5c-.512.427-1.152-.341-.64-.768Z"
                    stroke={strokeColor}
                />
            </g>
        </svg>
    );
};

export default AngleSVG;
