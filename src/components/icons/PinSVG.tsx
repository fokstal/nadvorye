import { forwardRef } from "react";
import IComponentSVG, { defaultComponentSVGProps } from "@root/src/models/IComponentSVG";

const PinSVG = forwardRef<SVGSVGElement, IComponentSVG>(({ customProps, ...props }, ref) => {
    const customDefaultProps = { ...defaultComponentSVGProps, ...customProps };

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" ref={ref} {...props}>
            <path
                {...customDefaultProps}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m10.25 10.25l4 4m-12.5-7.5l5-5s1 2 2 3s4.5 2 4.5 2l-6.5 6.5s-1-3.5-2-4.5s-3-2-3-2z"
            />
        </svg>
    );
});

export default PinSVG;
