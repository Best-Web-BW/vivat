export default function DotContainer({ count, active, handler }) {
    return (
        <div className="dots-container">
            {
                new Array(count).fill(0).map((_, index) => (
                    <div
                        key={index}
                        className={`dot ${active === index ? "active" : ""}`}
                        onClick={() => handler(index)}
                    />
                ))
            }
        </div>
    );
}