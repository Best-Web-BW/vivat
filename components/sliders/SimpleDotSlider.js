import { useEffect, useState } from "react";
import DotContainer from "./DotContainer";

export default function DotSlider({ images, containerClass, slideClass }) {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setActive(prev => Math.cycle(prev + 1, images.length)), 8000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={containerClass}>
            <div className={slideClass}>
                <img src={images[active]} alt="" width="100%" />
            </div>
            <DotContainer count={images.length} active={active} handler={setActive} />
        </div>
    );
}