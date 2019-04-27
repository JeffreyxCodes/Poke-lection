import React from 'react';
import Collection from './Collection';

function CollectionList(props) {
    return (
        <div className="column collectionList">
            <form className="title-container" onSubmit={props.addCollection}>
                <h2>Collection List</h2>
                <input
                    type="text"
                    id="newCollection"
                    name="newCollection"
                    value={props.newCollection}
                    onChange={props.handleInput}
                    required
                ></input>
                <input type="submit" value="Add Collection"></input>
                <input
                    type="button"
                    value="Remove Current Collection"
                    onClick={() => props.removeCollection(props.currentCollection)}></input>
            </form>

            <div className="content-container lists">
                {Object.keys(props.collectionList).length > 0 ? (
                    Object.entries(props.collectionList).map(list => {
                        return (
                            <Collection
                                key={list[0]}
                                name={list[0]}
                                bgColor={list[1].bgColor}
                                color={list[0] === props.currentCollection ? "white" : "black"}
                                selectCollection={props.selectCollection}
                            />
                        );
                    })
                ) : (
                        <div>
                            <h3>Start by adding a new collection!</h3>
                        </div>
                    )}
            </div>
        </div>
    );
}

export default CollectionList;
