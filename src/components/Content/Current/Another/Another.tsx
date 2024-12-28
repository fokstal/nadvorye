import { FC, useEffect, useRef, useState } from "react";
import angleSvgPath from "../../../../assets/icons/angle.svg";
import "./Another.scss";

const Another: FC = () => {
    const [isContentVisible, setIsContentVisible] = useState(true);

    const contentElRef = useRef<HTMLDivElement | null>(null);
    const titleArrowElRef = useRef<HTMLImageElement | null>(null);

    const contentEl = contentElRef.current;
    const titleArrowEl = titleArrowElRef.current;

    const handleContentVisible = () => {
        if (contentEl && titleArrowEl) {
            if (isContentVisible) {
                contentEl.style.height = `${contentEl.scrollHeight + 20}px`;
                contentEl.style.opacity = "1";
                contentEl.style.visibility = "visible";

                titleArrowEl.style.transform = "rotate(180deg)";
            } else {
                contentEl.style.height = "0";
                contentEl.style.opacity = "0";
                contentEl.style.visibility = "hidden";

                titleArrowEl.style.transform = "rotate(0)";
            }
        }
    };

    useEffect(() => {
        handleContentVisible();
    }, [isContentVisible, handleContentVisible]);

    return (
        <>
            <div className="another current-content-block">
                <h2
                    className="another__title current-content-block__title"
                    onClick={() => setIsContentVisible(!isContentVisible)}
                >
                    🌟 Another
                    <img className="current-content-block__title-arrow" src={angleSvgPath} ref={titleArrowElRef} />
                </h2>
                <div className="another__content current-content-block__content" ref={contentElRef}></div>
            </div>
        </>
    );
};

export default Another;
