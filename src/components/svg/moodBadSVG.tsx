import { forwardRef } from "react";
import IComponentSVG from "@models/IComponentSVG";

const MoodBadSVG = forwardRef<SVGSVGElement, IComponentSVG>(({ fill = " #FAE7B5", ...props }, ref) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" ref={ref} {...props}>
            <path
                fill={fill}
                d="M256 16C123.452 16 16 123.452 16 256s107.452 240 240 240s240-107.452 240-240S388.548 16 256 16Zm147.078 387.078a207.253 207.253 0 1 1 44.589-66.125a207.332 207.332 0 0 1-44.589 66.125Z"
            />
            <path
                fill={fill}
                d="M152 200h40v40h-40zm168 0h40v40h-40zm-64 80a104 104 0 0 0-104 104h208a104 104 0 0 0-104-104Z"
            />
        </svg>
    );
});

export default MoodBadSVG;
