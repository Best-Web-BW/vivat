import { useEffect } from "react";

export default function ModalImageSlider({ images, active, opened, switchSlide, closeSlider }) {
    const scrollLeft = () => switchSlide(prev => Math.cycle(prev - 1, images.length));
    const scrollRight = () => switchSlide(prev => Math.cycle(prev + 1, images.length));
    
    useEffect(() => {
        const handler = (evt) => {
            switch(evt.keyCode) {
                case 27: return closeSlider();
                case 37: return scrollLeft();
                case 39: return scrollRight();
                default: return;
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [images]);

    return (
        <div className={`modal-gallery-wrapper ${opened ? "opened" : ""}`}>
            <span className="close-modal" onClick={closeSlider}>x</span>
            <div className="modal-gallery-slider">
                <div className="modal-gallery-slide">
                    { images && <img src={`/images/gallery/album/webp/${images[active]}.webp`} alt="" height="100%" /> }
                </div>
                <div className="modal-gallery-navigation">
                    <div className="prev" onClick={scrollLeft}>
                        <span />
                    </div>
                    <div className="next" onClick={scrollRight}>
                        <span />
                    </div>
                </div>
            </div>
        </div>
    );
}