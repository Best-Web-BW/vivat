import { useState } from "react";
import DotContainer from "./DotContainer";

export default function DescribedDotSlider({ images, containerClass, slideClass }) {
    const [active, setActive] = useState(0);

    return (
        <div className={containerClass}>
            <div className={slideClass}>
                <img src={images[active][0]} alt="" width="100%" />
            </div>
            <DotContainer count={images.length} active={active} handler={setActive} />
            <div className="alt-text-container">
                <p className="alt-p">{ images[active][1] }</p>
            </div>
        </div>
    );
}