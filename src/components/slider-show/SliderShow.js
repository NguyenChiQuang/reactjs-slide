import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import './SliderShow.css'

export default class SliderShow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            slideIndex: 0
        }

        const ratioWHArray = this.props.ratio.split(":");
        this.ratioWH = ratioWHArray[0] / ratioWHArray[1];
    }

    // lay slide moi
    getNewSlideIndex(step) {
        const slideIndex = this.state.slideIndex;
        const numberSlide = this.props.input.length;
    
        let newSlideIndex = slideIndex + step;
    
        if (newSlideIndex >= numberSlide) newSlideIndex = 0;
        else if (newSlideIndex < 0) newSlideIndex = numberSlide - 1;
    
        return newSlideIndex;
    }

    // Quay về ảnh phía trước, tức index giảm 1 => step = -1
    backward = () => {
        this.setState({
            slideIndex: this.getNewSlideIndex(-1)
        });
    }

    // Tiến tới ảnh phía sau, tức index tăng 1 => step = 1
    forward = () => {
        this.setState({
            slideIndex: this.getNewSlideIndex(1)
        });
    }

    // Xác định slideIndex nào sẽ được active
    setSlideIndex = (index) => {
        this.setState({
        slideIndex: index
        })
    }

    updateDimensions = () => {
        this.containerElm.style.height = `${this.containerElm.offsetWidth / this.ratioWH}px`;
    }

    runAutomatic = () => {
        this.setState({
          slideIndex: this.getNewSlideIndex(1)
        });
    }

    componentDidMount() {
        this.rootElm = ReactDOM.findDOMNode(this);
        this.containerElm = this.rootElm.querySelector(".container");
    
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    
        const timeout = this.props.timeout || 5000;

        this.automaticInterval = setInterval(
        () => this.runAutomatic(), 
        Number.parseInt(timeout)
        );
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
        clearInterval(this.automaticInterval);
    }
    
render() {
    const { slideIndex } = this.state;
    const { input } = this.props;
    return (
        <div className="lp-slideshow">
            <div className="container">
            {
                input.map((image, index) => {
                return (
                    <div
                        key={index}
                        className={`slide ${slideIndex === index ? "active" : ""}`}
                    >
                    <div className="number-text">{`${index + 1} / ${input.length}`}</div>
                    <img className="image" src={image.src} alt={image.caption} />
                    <div className="caption-text">{image.caption}</div>
                    </div>
                )
                })
            }

            <span className="prev" onClick={this.backward}>❮</span>
            <span className="next" onClick={this.forward}>❯</span>
            </div>

            <div className="dot-container">
            {
                input.map((_, index) => {
                return (
                    <span
                        key={index}
                        className={`dot ${slideIndex === index ? "active" : ""}`}
                        onClick={() => this.setSlideIndex(index)}
                    >
                    </span>
                )
                })
            }
            </div>
        </div>
    )
  }
}
