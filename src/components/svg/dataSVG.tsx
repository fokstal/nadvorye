import { forwardRef } from "react";
import IComponentSVG, { defaultComponentSVGProps } from "@root/src/models/IComponentSVG";

const DataSVG = forwardRef<SVGSVGElement, IComponentSVG>(
    ({ stroke = defaultComponentSVGProps.stroke, fill = defaultComponentSVGProps.fill, ...props }, ref) => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" ref={ref} {...props}>
                <mask id="ipSData0">
                    <g fill={fill} stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
                        <path d="M44 11v27c0 3.314-8.954 6-20 6S4 41.314 4 38V11" />
                        <path d="M44 29c0 3.314-8.954 6-20 6S4 32.314 4 29m40-9c0 3.314-8.954 6-20 6S4 23.314 4 20" />
                        <ellipse cx="24" cy="10" fill="#fff" rx="20" ry="6" />
                    </g>
                </mask>
                <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSData0)" />
            </svg>
        );
    }
);

export default DataSVG;
