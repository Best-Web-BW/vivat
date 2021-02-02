import React from "react";

export default class DescriptedDotSlider extends React.Component {
    constructor(props) {
        super();

        this.state = {
            active: 0,
            images: [],
            descriptions: [],
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

        for(let i = 0; i < props.images.length; i++) {
            this.state.images[i] = props.images[i][0];
            this.state.descriptions[i] = props.images[i][1];
            this.switchDot(i, false);
        }

        this.switchDot(this.state.active, true);
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
                <div className="alt-text-container">
                    <p className="alt-p">{ this.state.descriptions[this.state.active] }</p>
                </div>
            </div>
        );
    }
}