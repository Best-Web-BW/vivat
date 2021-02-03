import React from "react";

export default class DotSlider extends React.Component {
    constructor(props) {
        super();

        this.state = {
            active: 0,
            images: props.images,
            dots: []
        }

        this.createDot = (index, mode) => {
            return <div key={index} className={`dot ${mode ? "active" : ""}`} onClick={() => this.switchImage(index)} />;
        }

        this.switchDot = (index, mode) => {
            this.state.dots[index] = this.createDot(index, mode);
        };

        this.switchImage = (index) => {
            this.switchDot(this.state.active, false);
            this.switchDot(index, true);
            this.setState({ active: index });
        };

        for(let i = 0; i < props.images.length; i++) this.switchDot(i, false);
        this.switchDot(this.state.active, true);
    }

    componentDidMount() {
        this.autoSwitchInterval = setInterval(() => {
            this.switchImage(Math.cycle(this.state.active + 1, this.state.images.length));
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.autoSwitchInterval);
    }

    render() {
        return (
            <div className={this.props.containerClass}>
                <div className={this.props.slideClass}>
                    <img src={this.state.images[this.state.active]} alt="" width="100%" />
                </div>
                <div className="dots-container">
                    { this.state.dots }
                </div>
            </div>
        );
    }
}