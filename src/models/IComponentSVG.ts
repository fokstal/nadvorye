interface IComponentSVG {
    strokeColor?: string;
    fillColor?: string;
}

const defaultComponentSVGProps: IComponentSVG = {
    strokeColor: "currentColor",
    fillColor: "none",
};

export default IComponentSVG;
export { defaultComponentSVGProps };
