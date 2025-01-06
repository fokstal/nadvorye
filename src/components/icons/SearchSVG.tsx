import { FC } from "react";
import IComponentSVG, { defaultComponentSVGProps } from "@root/src/models/IComponentSVG";

const SearchSVG: FC<IComponentSVG> = (props) => {
    const { strokeColor, fillColor } = { ...defaultComponentSVGProps, ...props };

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24">
            <path
                fill={fillColor}
                stroke={strokeColor}
                d="M18.425 18.425L23.5 23.5m-12.5-2C5.201 21.5.5 16.799.5 11S5.201.5 11 .5S21.5 5.201 21.5 11S16.799 21.5 11 21.5Z"
            />
        </svg>
    );
};

export default SearchSVG;
