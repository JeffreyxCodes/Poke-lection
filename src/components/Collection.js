import React from 'react';

function Collection(props) {
    const shadow = props.color === "black" ? "white" : "black";
    return (
        <div
            className="collection"
            name={props.name}
            onClick={props.selectCollection}
            style={{
                backgroundColor: `${props.bgColor}`,
                color: `${props.color}`,
                textShadow: `0px 0px 10px ${shadow}`
            }}>
            <h3>
                {props.name}
            </h3>
        </div>
    );
}

export default Collection;
