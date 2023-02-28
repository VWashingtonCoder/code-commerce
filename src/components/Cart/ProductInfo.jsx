const ProductInfo = (props) => {
    const {  
        img,
        category,
        name,
        color,
        size
    } = props;
    
    return (
        <div id="ProductInfo">
            <div className="img-container">
                <img src={img} alt={`${name} display`} />
            </div>
            <div className="text-container">
                <p className="category-text">{category}</p>
                <p className="name-text">{name}</p>
                <div className="info-container">
                    <p className="text-label">Color:</p>
                    <p className="text-value">{color}</p>
                </div>
                <div className="info-container">
                    <p className="text-label">Size:</p>
                    <p className="text-value">{size}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductInfo;