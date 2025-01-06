import { forwardRef } from "react";
import IComponentSVG, { defaultComponentSVGProps } from "@root/src/models/IComponentSVG";

const AngleSVG = forwardRef<SVGSVGElement, IComponentSVG>(
    ({ stroke = defaultComponentSVGProps.stroke, fill = defaultComponentSVGProps.fill, ...props }, ref) => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" ref={ref} {...props}>
                <g fill={fill}>
                    <path d="m16.32 12.116l-6-5l-.64.768l6 5l.64-.768Z" stroke={stroke} />
                    <path
                        d="m15.68 12.884l-6-5c-.512-.427.128-1.195.64-.768l6 5c.512.427-.128 1.195-.64.768Z"
                        stroke={stroke}
                    />
                    <path d="m4.32 12.884l6-5l-.64-.768l-6 5l.64.768Z" stroke={stroke} />
                    <path
                        d="m3.68 12.116l6-5c.512-.427 1.152.341.64.768l-6 5c-.512.427-1.152-.341-.64-.768Z"
                        stroke={stroke}
                    />
                </g>
            </svg>
        );
    }
);

export default AngleSVG;
