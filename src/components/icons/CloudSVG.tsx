import { forwardRef } from "react";
import IComponentSVG, { defaultComponentSVGProps } from "@root/src/models/IComponentSVG";

const CloudSVG = forwardRef<SVGSVGElement, IComponentSVG>(
    ({ stroke = defaultComponentSVGProps.stroke, fill = defaultComponentSVGProps.fill, ...props }, ref) => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ref={ref} {...props}>
                <path
                    fill={fill}
                    stroke={stroke}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257a3 3 0 0 0-3.758-3.848a5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z"
                />
            </svg>
        );
    }
);

export default CloudSVG;
