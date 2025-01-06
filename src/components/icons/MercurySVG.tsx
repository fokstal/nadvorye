import { forwardRef } from "react";
import IComponentSVG, { defaultComponentSVGProps } from "@root/src/models/IComponentSVG";

const MercurySVG = forwardRef<SVGSVGElement, IComponentSVG>(({ customProps, ...props }, ref) => {
    const customDefaultProps = { ...defaultComponentSVGProps, ...customProps };

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" ref={ref} {...props}>
            <path
                {...customDefaultProps}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.5 9V2A1.5 1.5 0 0 0 7 .5h0A1.5 1.5 0 0 0 5.5 2v7a2.5 2.5 0 1 0 3 0Z"
            />
        </svg>
    );
});

export default MercurySVG;
