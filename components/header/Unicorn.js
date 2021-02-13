import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { sleep } from "../../utils/common";
import config from "./Unicorn.config";

export default function Unicorn({ setListeners }) {
    const [src, setSrc] = useState(config.rest);
    const [mode, setMode] = useState("rest");

    const animator = useMemo(() => ({
        rest: () => { setMode("rest"); setSrc(config.rest); },
        follow: angle => {
            setMode("follow");
            angle = angle ? Math.bound(angle, -90, 90) : 0;
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
            restUnicorn: () => transit("rest"),
            followUnicorn: angle => transit("follow", angle),
            shyUnicorn: () => transit("shy")
        });
    }, [mode]);

    return <img src={src} alt="" width="100%" />;
}

export const UnicornFollowInput = ({ props, inputRef, follow, rest }) => {
    const spanRef = useRef();

    const updateText = useCallback(() => {
        spanRef.current.innerText = inputRef.current.value;
        const angle = ((spanRef.current.offsetWidth / inputRef.current.offsetWidth) - 0.5) * 90;
        setTimeout(() => follow(angle), 0);
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