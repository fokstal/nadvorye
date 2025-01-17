import { forwardRef } from "react";
import IComponentSVG, { defaultComponentSVGProps } from "@root/src/models/IComponentSVG";

const RainSVG = forwardRef<SVGSVGElement, IComponentSVG>(
    ({ stroke = defaultComponentSVGProps.stroke, fill = defaultComponentSVGProps.fill, ...props }, ref) => {
        fill = stroke;

        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ref={ref} {...props}>
                <path
                    fill={fill}
                    stroke={stroke}
                    strokeWidth="0.1"
                    d="M5.119 23.764a.802.802 0 0 1 0-1.138l4.166-4.165a.803.803 0 0 1 1.386.557a.802.802 0 0 1-.248.581l-4.165 4.166a.802.802 0 0 1-1.138 0zm8.475-3.94a.802.802 0 0 1 0-1.138l3.059-3.056h-8.5l-4.198 4.195a.804.804 0 1 1-1.138-1.138l3.06-3.06h-.135a5.806 5.806 0 0 1 0-11.612h.067h-.003c.09 0 .18.007.269.011c1.364-2.42 3.917-4.027 6.846-4.027a7.832 7.832 0 0 1 7.832 7.831v.015a3.954 3.954 0 0 1 3.008 3.833a3.946 3.946 0 0 1-3.946 3.946h-.884l-4.198 4.198a.802.802 0 0 1-1.138 0zM1.609 9.82a4.201 4.201 0 0 0 4.196 4.197h14.004a2.338 2.338 0 1 0-.001-4.678c-.577 0-1.104.209-1.512.554l.003-.003a.806.806 0 0 1-1.045-1.227l.001-.001a3.924 3.924 0 0 1 1.852-.871l.024-.004A6.22 6.22 0 0 0 7.774 4.336l-.014.021a5.797 5.797 0 0 1 1.68.937l-.011-.009a.805.805 0 1 1-1.008 1.256l.001.001a4.127 4.127 0 0 0-2.606-.919h-.011h.001A4.2 4.2 0 0 0 1.607 9.82z"
                />
            </svg>
        );
    }
);

export default RainSVG;
