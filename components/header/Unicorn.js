import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { sleep } from "../../utils/common";

export default function _Unicorn(props) {
    const [config, setConfig] = useState();
    useEffect(async () => setConfig((await import("./Unicorn.config")).default), []);

    return config ? <Unicorn config={config} {...props} /> : null;
}

function Unicorn({ config, setListeners }) {
    const [src, setSrc] = useState(config.follow[5].image);
    const [mode, setMode] = useState("rest");

    const animator = useMemo(() => ({
        // Rest is follow's [-4; 4) duplicate, it has index 5
        rest: () => { setMode("rest"); setSrc(config.follow[5].image); },
        follow: angle => {
            setMode("follow");
            angle = Math.bound(angle ?? 0, -90, 90);
            setSrc(config.follow.find(({ min, max }) => min < angle && max >= angle).image);
        },
        shy: async (shying = true, after) => {
            setMode("shy");
            const images = shying ? config.shy : [...config.shy].reverse();
            const count = images.length;
            const frametime = config.shyDuration / count;
            for(let image of images) (setSrc(image), await sleep(frametime));
            if(!shying) after();
        }
    }), []);
    
    useEffect(() => {
        const transit = (to, angle) => (mode === "shy" ? (angle) => animator.shy(false, () => animator[to](angle)) : animator[to])(angle);
        setListeners({
            rest: () => transit("rest"),
            follow: angle => transit("follow", angle),
            shy: () => transit("shy")
        });
    }, [mode]);

    return <img src={src} alt="" width="100%" />;
}

export const UnicornFollowInput = ({ props, inputRef, follow, rest }) => {
    const spanRef = useRef();

    const updateText = useCallback(() => {
        spanRef.current.innerText = inputRef.current.value;
        const angle = ((spanRef.current.offsetWidth / inputRef.current.offsetWidth) - 0.5) * 90;
        if(document.activeElement == inputRef.current) setTimeout(() => follow(angle), 0);
        spanRef.current.innerText = "";
    }, [follow, rest]);

    return (
        <div className="unicorn-follow-input">
            <input ref={inputRef} {...props} onChange={updateText} onFocus={updateText} onBlur={rest} />
            <span ref={spanRef} style={{ position: "absolute" }} />
        </div>
    );
}

export const UnicornShyInput = ({ props, inputRef, shy, rest }) => <input {...props} ref={inputRef} onFocus={shy} onBlur={rest} />;