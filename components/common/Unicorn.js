import React, { useEffect, useRef } from "react";

let config = {
    extension: "png",
    default: "default",
    follow: [
        {
            min: Number.MIN_SAFE_INTEGER,
            max: -36,
            image: "l5"
        },
        {
            min: -36,
            max: -28,
            image: "l4"
        },
        {
            min: -28,
            max: -20,
            image: "l3"
        },
        {
            min: -20,
            max: -12,
            image: "l2"
        },
        {
            min: -12,
            max: -4,
            image: "l1"
        },
        {
            min: -4,
            max: 4,
            image: "center"
        },
        {
            min: 4,
            max: 12,
            image: "r1"
        },
        {
            min: 12,
            max: 20,
            image: "r2"
        },
        {
            min: 20,
            max: 28,
            image: "r3"
        },
        {
            min: 28,
            max: 36,
            image: "r4"
        },
        {
            min: 36,
            max: Number.MAX_SAFE_INTEGER,
            image: "r5"
        },
    ],
    shy: {
        duration: 600,
        images: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10"
        ]
    }
};

export class Unicorn extends React.Component {
    constructor() {
        super();
        global.unicorn = this;

        this.data = {};
        this.imgRef = React.createRef();

        this.animator = {};
        this.animator.default = {
            setImage: () => {
                this.updateImage({
                    path: "",
                    image: config.default
                });
            }
        };
        this.animator.follow = {
            setImage: (angle) => {
                this.updateImage({
                    path: "follow/",
                    image: this.animator.follow.getImageByAngle(angle)
                });
            },
            getImageByAngle: (angle = 0) => {
                return config.follow.find(entry => entry.min < angle && entry.max >= angle).image;
            }
        };
        this.animator.shy = {
            start: () => { this.animator.shy.animate(true); },
            stop: (after = () => { this.animator.default.setImage(); }) => {
                this.animator.shy.animate(false);
                setTimeout(after, config.shy.duration);
            },
            animate: (direction = true) => {
                let partialDuration = config.shy.duration / config.shy.images.length;
                for(let i = 0; i < config.shy.images.length; i++) {
                    setTimeout(() => {
                        this.animator.shy.setImage(direction, i);
                    }, partialDuration * i);
                }
            },
            setImage: (direction = true, index = 0) => {
                if(!direction) index = config.shy.images.length - index - 1;
                this.updateImage({
                    path: "shy/",
                    image: config.shy.images[index]
                });
            }
        }

        this.transitionMatrix = {
            "default": {
                "default": () => {},
                "follow": (props) => {
                    this.setMode("follow");
                    this.animator.follow.setImage(props.angle);
                },
                "shy": () => {
                    this.setMode("shy");
                    this.animator.shy.start();
                }
            },
            "follow": {
                "default": () => {
                    this.setMode("default");
                    this.animator.default.setImage();
                },
                "follow": (props) => {
                    this.animator.follow.setImage(props.angle);
                },
                "shy": () => {
                    this.animator.default.setImage();
                    this.setMode("shy");
                    this.animator.shy.start();
                }
            },
            "shy": {
                "default": () => {
                    this.animator.shy.stop(() => {
                        this.setMode("default");
                        this.animator.default.setImage();
                    });
                },
                "follow": (props) => {
                    this.animator.shy.stop(() => {
                        this.setMode("follow");
                        this.animator.follow.setImage(props.angle)
                    });
                },
                "shy": () => {}
            }
        };

        this.setMode = (mode = "default") => {
            this.data.mode = mode;
        }

        this.updateImage = (newData = {}) => {
            this.data = {...this.data, ...newData};
            let url = `/images/unicorn/${this.data.path}${this.data.image}.${config.extension}`;
            this.imgRef.current?.setAttribute("src", url);
            this.imgRef.current?.setAttribute("class", `unicorn-${this.data.mode}`);
        };

        this.directlyUpdateProps = (props = {}) => {
            this.transitionMatrix[this.data.mode][props.mode ?? "default"](props);
        };

        this.componentDidMount = () => {
            this.setMode();
            this.animator.default.setImage();
        };
    }

    render() { return <img ref={this.imgRef} alt="" width="100%" />; }
}

export function UnicornFollowInput({ inputClassName, type, placeholder, onChange, onBlur, spanClassName }) {
    const inputRef = useRef();
    const spanRef = useRef();
    const width = useRef();

    const updateText = () => {
        spanRef.current.innerText = inputRef.current.value;
        const _width = spanRef.current.offsetWidth;
        spanRef.current.innerText = "";
        onChange(_width / width.current);
    };
    
    useEffect(() => { width.current = inputRef.current?.offsetWidth ?? 1; }, []);

    return (
        <div className="unicorn-follow-input">
            <input
                ref={inputRef} className={inputClassName ?? ""}
                type={type ?? ""} placeholder={placeholder ?? ""}
                onFocus={updateText} onChange={updateText} onBlur={onBlur}
            />
            <span ref={spanRef} className={spanClassName ?? ""} style={{ position: "absolute" }} />
        </div>
    );
}

export function UnicornShyInput({ inputClassName, type, placeholder, onFocus, onBlur }) {
    return (
        <input
            className={`unicorn-shy-input ${inputClassName ?? ""}`}
            type={type ?? ""} placeholder={placeholder ?? ""}
            onFocus={onFocus} onBlur={onBlur}
        />
    );
}