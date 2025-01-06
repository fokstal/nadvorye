import { forwardRef } from "react";
import IComponentSVG, { defaultComponentSVGProps } from "@root/src/models/IComponentSVG";

const HumiditySVG = forwardRef<SVGSVGElement, IComponentSVG>(({ customProps, ...props }, ref) => {
    const customDefaultProps = { ...defaultComponentSVGProps, ...customProps };

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ref={ref} {...props}>
            <g {...customDefaultProps} strokeWidth="2">
                <path d="M20 14.571C20 18.753 16.336 22 12 22s-8-3.247-8-7.429C4 12 5.305 9.452 6.716 7.423c1.43-2.055 3.076-3.726 3.962-4.568M20 14.571L10.678 2.855M20 14.571c0-2.571-1.305-5.119-2.716-7.148c-1.43-2.055-3.076-3.726-3.962-4.568a1.913 1.913 0 0 0-2.644 0M20 14.571L10.678 2.855" />
                <path strokeLinecap="round" d="M12 18a4 4 0 0 1-4-4" />
            </g>
        </svg>
    );
});

export default HumiditySVG;