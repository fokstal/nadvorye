import { forwardRef, SVGProps } from "react";

interface WeatherQualityIconProps extends SVGProps<SVGSVGElement> {
    levelColor: string;
    stroke?: string;
}

const WeatherQualityIcon = forwardRef<SVGSVGElement, WeatherQualityIconProps>(
    ({ levelColor, stroke = "currentColor", ...props }, ref) => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ref={ref} {...props}>
                <path
                    fill={levelColor}
                    stroke={stroke}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3.85 8.62a4 4 0 0 1 4.78-4.77a4 4 0 0 1 6.74 0a4 4 0 0 1 4.78 4.78a4 4 0 0 1 0 6.74a4 4 0 0 1-4.77 4.78a4 4 0 0 1-6.75 0a4 4 0 0 1-4.78-4.77a4 4 0 0 1 0-6.76Z"
                />
            </svg>
        );
    }
);

export default WeatherQualityIcon;
