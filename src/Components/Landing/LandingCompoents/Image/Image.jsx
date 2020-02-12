import React from "react";
import "./Image.scss";

function Image() {
    return (
        <div className="image">
            <div className="container">
                <div className="wrapper">
                    <img className="image-img" src="/images/hands-image.png" alt="NFC визитка"/>
                </div>
            </div>
        </div>
    );
}

export default Image;
