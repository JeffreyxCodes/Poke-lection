import React from 'react';

function MemberList(props) {
    let members = props.collectionList[props.currentCollection];

    if (members) {
        const color = props.currentCollection ? members.bgColor : "orange";
        members = members.members;
        if (members && JSON.stringify(members) !== JSON.stringify({})) {
            members = Object.keys(members).map((member, index) => {
                return (
                    <div key={member + member}>
                        <h3 onClick={() => props.setPokemon(index+1, member)}>{member}</h3>
                        <input type="button" value="Remove" onClick={() => props.removePokemon(member)}></input>
                    </div>
                );
            })
        } else {
            members = (
                <h3>Add some pokemon from the Pokedex</h3>
            );
        }

        return (
            <div className="column memberList">
                <div className="title-container">
                    <h2>{props.currentCollection}</h2>
                </div>
                <div className="content-container" style={{backgroundColor: `${color}`}}>
                    {members}
                </div>
            </div>
        );
    }

    return (
        <div className="column memberList">
            <div className="title-container"></div>
            <div className="content-container">
                <div>
                    {Object.keys(props.collectionList).length > 0 ? (
                        <h3>Now select a collection</h3>
                    ) : (
                        <h3>Serious, go add a collection</h3>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MemberList;
