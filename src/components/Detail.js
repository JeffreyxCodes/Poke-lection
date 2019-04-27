import React from 'react';

function Detail(props) {
    let src = '';
    if (props.pokemon) {
        let name = props.pokemon;
        name = (name === "mr. mime") ? "mr-mime" 
            : (name === "mime jr.") ? "mime-jr" : name;
        src = "http://www.pokestadium.com/sprites/xy/" + name + ".gif";
    }

    return (
        <div className="column detail">
            <div className="title-container">
                <button onClick={props.save}>
                    <h3>Save Collections</h3>
                </button>
            </div>
            <div className="content-container">
                {props.pokemon && props.stats ? (
                    <div>
                        <img src={src} alt={props.pokemon} />
                        {props.stats.map(stat => {
                            return (
                                <h3 key={stat.stat.name}>{stat.stat.name}: {stat["base_stat"]}</h3>
                            );
                        })}
                    </div>
                ) : (
                    <h3>Click on a Pokemon</h3>
                )}
            </div>
        </div>
    );
}

export default Detail;
