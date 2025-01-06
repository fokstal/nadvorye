import { SVGProps } from "react";

interface IComponentSVG extends SVGProps<SVGSVGElement> {
    customProps?: IComponentSVGCustom;
}

interface IComponentSVGCustom {
    stroke?: string;
    fill?: string;
}

const defaultComponentSVGCustomProps: IComponentSVGCustom = {
    stroke: "currentColor",
    fill: "none",
};

export default IComponentSVG;
export { defaultComponentSVGCustomProps as defaultComponentSVGProps };
