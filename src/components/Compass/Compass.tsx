import { FC } from "react";
import "./Compass.scss";

interface ICompass {
    scale: number;
    angle: number;
}

const Compass: FC<ICompass> = ({ scale, angle }) => {
    const width = `${200 * scale}px`;
    const height = `${200 * scale}px`;

    return (
        <>
            <div className="compass" style={{ width: width, height: height }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="200"
                    height="200"
                    viewBox="0 0 512 512"
                    transform={`scale(${scale})`}
                >
                    <defs>
                        <linearGradient
                            id="meteoconsCompassFill0"
                            x1="184"
                            x2="328"
                            y1="131.3"
                            y2="380.7"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop offset="0" stopColor="#6b7280" />
                            <stop offset=".5" stopColor="#6b7280" />
                            <stop offset="1" stopColor="#374151" />
                        </linearGradient>
                    </defs>
                    <circle
                        cx="256"
                        cy="256"
                        r="240"
                        fill="url(#meteoconsCompassFill0)"
                        stroke="#e5e7eb"
                        strokeMiterlimit="10"
                        strokeWidth="6"
                    />
                    <path
                        fill="#9ca3af"
                        d="M259.2 152v-10.4h4.6v18h-4.7l-6.3-10.4v10.4h-4.6v-18h4.7Zm103.3 105.7v3.3h9.8v4h-14.5v-18H372v4h-9.5v3h8.3v3.8Zm-106.4 116a8.4 8.4 0 0 1-5.4-1.6a5.8 5.8 0 0 1-2-4.4h4.4c0 1.6 1.1 2.4 3.1 2.4c1.8 0 2.6-.6 2.6-1.7a1.3 1.3 0 0 0-.4-1a4.6 4.6 0 0 0-1.6-.7l-3.4-.7c-2.9-.7-4.4-2.4-4.4-4.9a5 5 0 0 1 1.7-3.9a7.5 7.5 0 0 1 5.1-1.5a8 8 0 0 1 5 1.5a5.2 5.2 0 0 1 2 4h-4.3c-.2-1.4-1-2-2.7-2a2.9 2.9 0 0 0-1.6.4a1.3 1.3 0 0 0-.6 1c0 .8.5 1.3 1.6 1.6l3.5.8q4.7 1.1 4.7 5.1a4.9 4.9 0 0 1-2 4.1a8.5 8.5 0 0 1-5.3 1.5ZM156.2 255l2-8h4.7l-5.2 18h-4.5l-2.5-11.5l-2.3 11.5h-4.6l-5.2-18h4.7l2 8l.9 4.2l.7-4.3l1.7-7.9h4.4l1.8 8l.6 4.1Z"
                        transform="translate(256, 256) scale(1.8) translate(-256, -256)"
                    />

                    <g transform={`rotate(${angle},  256, 256) translate(256, 256) scale(1.8) translate(-256, -256)`}>
                        <path fill="#ef4444" d="m256 172l-24 84h48l-24-84z" />
                        <path fill="#fff" d="m232 256l24 84l24-84h-48z" />
                        <animateTransform
                            additive="sum"
                            attributeName="transform"
                            calcMode="spline"
                            dur="2s"
                            keySplines=".42, 0, .58, 1; .42, 0, .58, 1"
                            repeatCount="indefinite"
                            type="rotate"
                            values="-6 256 256; 6 256 256; -6 256 256"
                        />
                    </g>
                </svg>
            </div>
        </>
    );
};

export default Compass;
