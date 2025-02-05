import { forwardRef } from "react";
import IComponentSVG, { defaultComponentSVGProps } from "@root/src/models/IComponentSVG";

const SearchSVG = forwardRef<SVGSVGElement, IComponentSVG>(
    ({ stroke = defaultComponentSVGProps.stroke, fill = defaultComponentSVGProps.fill, ...props }, ref) => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ref={ref} {...props}>
                <path
                    fill={fill}
                    stroke={stroke}
                    d="M18.425 18.425L23.5 23.5m-12.5-2C5.201 21.5.5 16.799.5 11S5.201.5 11 .5S21.5 5.201 21.5 11S16.799 21.5 11 21.5Z"
                />
            </svg>
        );
    }
);

export default SearchSVG;
