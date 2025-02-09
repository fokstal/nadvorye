import { forwardRef } from "react";
import IComponentSVG, { defaultComponentSVGProps } from "@root/src/models/IComponentSVG";

const ApiSVG = forwardRef<SVGSVGElement, IComponentSVG>(
    ({ stroke = defaultComponentSVGProps.stroke, fill = defaultComponentSVGProps.fill, ...props }, ref) => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ref={ref} {...props}>
                <path fill="currentColor" d="M13.26 10.5h2v1h-2z" />
                <path
                    fill="currentColor"
                    d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM8.4 15L8 13.77H6.06L5.62 15H4l2.2-6h1.62L10 15Zm8.36-3.5a1.47 1.47 0 0 1-1.5 1.5h-2v2h-1.5V9h3.5a1.47 1.47 0 0 1 1.5 1.5ZM20 15h-1.5V9H20Z"
                />
                <path fill="currentColor" d="M6.43 12.77h1.16l-.58-1.59l-.58 1.59z" />
            </svg>
        );
    }
);

export default ApiSVG;
