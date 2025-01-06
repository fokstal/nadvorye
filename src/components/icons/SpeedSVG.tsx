import { forwardRef } from "react";
import IComponentSVG, { defaultComponentSVGProps } from "@root/src/models/IComponentSVG";

const SpeedSVG = forwardRef<SVGSVGElement, IComponentSVG>(({ customProps, ...props }, ref) => {
    const customDefaultProps = { ...defaultComponentSVGProps, ...customProps };

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 48 48" ref={ref} {...props}>
            <g {...customDefaultProps} strokeLinejoin="round" strokeWidth="4">
                <path
                    strokeLinecap="round"
                    d="M34.023 6.69A19.908 19.908 0 0 0 24 4C12.954 4 4 12.954 4 24s8.954 20 20 20s20-8.954 20-20c0-3.627-.966-7.03-2.654-9.962"
                />
                <path d="M31.95 16.05S28.562 25.095 27 26.657A4 4 0 0 1 21.343 21c1.562-1.562 10.607-4.95 10.607-4.95Z" />
            </g>
        </svg>
    );
});

export default SpeedSVG;