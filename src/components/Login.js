import React from 'react';

function Login(props) {
    let text = "";
    switch (props.loginState) {
        case 1:
            text = `Welcome to Poke-lection!`
            break;
        case 2:
            text = `Network/server not working at the moment, try again later.`
            break;
        case 3:
            text = `Wrong ID, try again.`
    }
    return (
        <div id="login-background">
            {
                props.loginState ? (
                    <form className="login-form" onSubmit={props.login}>
                        <h3>{text}</h3>
                        <label>ID: </label>
                        <input
                            type="text"
                            id="id"
                            name="id"
                            required
                            onChange={props.handleInput}
                        ></input>
                        <input type="submit" id="login" value="Login"></input>
                        <button id="new-id" onClick={props.getNewID}>New</button>
                    </form>
                ) : (
                        <form className="login-form">
                            <h2>Your new ID is:</h2>
                            <h2>{props.input}</h2>
                            <h2>Remember it!</h2>
                            <button onClick={props.startGame}>Let's Start!</button>
                        </form>
                    )
            }
        </div>
    );
}

export default Login;
