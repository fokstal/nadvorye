import { FC } from "react";
import IComponentSVG, { defaultComponentSVGProps } from "@root/src/models/IComponentSVG";

const ConditionSVG: FC<IComponentSVG> = (props) => {
    const { fillColor } = { ...defaultComponentSVGProps, ...props };

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 32 32">
            <path fill={fillColor} d="m8 16l8-8l8 8l-8 8z" />
            <path
                fill={fillColor}
                d="M16 4A12 12 0 1 1 4 16A12.014 12.014 0 0 1 16 4m0-2a14 14 0 1 0 14 14A14 14 0 0 0 16 2Z"
            />
        </svg>
    );
};

export default ConditionSVG;
