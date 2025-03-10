import { forwardRef } from "react";
import IComponentSVG from "@models/IComponentSVG";

const MoodHappySVG = forwardRef<SVGSVGElement, IComponentSVG>(({ fill = " #A8E4A0", ...props }, ref) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" ref={ref} {...props}>
            <path
                fill={fill}
                d="M256 16C123.452 16 16 123.452 16 256s107.452 240 240 240s240-107.452 240-240S388.548 16 256 16Zm147.078 387.078a207.253 207.253 0 1 1 44.589-66.125a207.332 207.332 0 0 1-44.589 66.125Z"
            />
            <path
                fill={fill}
                d="M256 384a104 104 0 0 0 104-104H152a104 104 0 0 0 104 104Zm-50.243-155.708l20.486-24.584L168 155.173l-58.243 48.535l20.486 24.584L168 196.827l37.757 31.465zm80-24.584l20.486 24.584L344 196.827l37.757 31.465l20.486-24.584L344 155.173l-58.243 48.535z"
            />
        </svg>
    );
});

export default MoodHappySVG;
