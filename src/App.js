import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';
import Login from './components/Login';
import CollectionList from './components/CollectionList';
import Pokedex from './components/Pokedex';
import MemberList from './components/MemberList';
import Detail from './components/Detail';

class App extends Component {
  constructor() {
    super();
    this.state = {
      collectionList: {},
      id: '',
      loginState: 1,
      // null: login successful, start game
      // 0: new id created successfully
      // 1: initial state
      // 2: network/server issue when creating new at login
      // 3: wrong id at login, indicate to try again
      newCollection: '',
      currentCollection: undefined, // string of the current collection
      pokemon: undefined,
      index: undefined,
      stats: undefined,
    }
  }


  /****************************************************************************
    Handle Inputs
  *****************************************************************************/
  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  /****************************************************************************
    Login related
  *****************************************************************************/
  getNewID = async (e) => {
    e.preventDefault();

    try {
      let id = await Axios.post("https://api.myjson.com/bins", this.state.collectionList);
      id = id.data.uri;
      this.setState({
        id: id.substring(id.lastIndexOf("/") + 1)
      });

      this.setState({
        loginState: 0
      });

    } catch (err) {
      this.setState({
        loginState: 2
      });
      console.error(err);
    }
  }

  login = async (e) => {
    e.preventDefault();

    try {
      const pokeData = await Axios.get("https://api.myjson.com/bins/" + this.state.id);
      this.setState({
        collectionList: pokeData.data,
        loginState: null
      });
    } catch (err) {
      this.setState({
        loginState: 3
      });
      console.error(err);
    }
  }

  startGame = (e) => {
    e.preventDefault();

    this.setState({
      loginState: null
    });
  }


  /****************************************************************************
    CollectionList
  *****************************************************************************/
  addCollection = (e) => {
    e.preventDefault();

    const bgColor = `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(Math.random() * 255)}, ${Math.ceil(Math.random() * 255)})`;
    let list = this.state.collectionList;
    list[`${this.state.newCollection}`] = { bgColor: bgColor, members: {} };
    this.setState({
      collectionList: list,
      newCollection: ""
    });
  }

  removeCollection = (collection) => {
    if (collection) {
      let newCollectionList = this.state.collectionList;
      delete newCollectionList[collection];
      this.setState({
        collectionList: newCollectionList,
        currentCollection: undefined
      });
    }
  }


  /****************************************************************************
    Collection
  *****************************************************************************/
  selectCollection = (e) => {
    this.setState({
      currentCollection: e.currentTarget.getAttribute("name")
    });
  }


  /****************************************************************************
    Pokedex & MemberList
  *****************************************************************************/
  addPokemon = (poke) => {
    if (this.state.currentCollection) {
      let newCollectionList = this.state.collectionList;
      newCollectionList[this.state.currentCollection].members[poke] = poke;
      this.setState({
        collectionList: newCollectionList
      });
    }
  }

  removePokemon = (poke) => {
    let newCollectionList = this.state.collectionList;
    delete newCollectionList[this.state.currentCollection].members[poke];
    this.setState({
      collectionList: newCollectionList
    });
  }

  setPokemon = (index, poke) => {
    if (this.state.index !== index) {
      this.setState({
        pokemon: poke.toLowerCase(),
        index: index
      }, () => {
        this.getStats()
      });
    }
  }

  getStats = async () => {
    try {
      const data = await Axios.get("https://pokeapi.co/api/v2/pokemon/" + this.state.index + "/");
      this.setState({
        stats: data.data.stats.reverse()
      });
    } catch (err) {
      alert("Server Error, try again later.");
      console.error(err);
    }
  }

  save = async () => {
    try {
      const save = await Axios.put(
        "https://api.myjson.com/bins/" + this.state.id,
        JSON.stringify(this.state.collectionList),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      alert("Saved Successfully");
    } catch (err) {
      alert("Saved Fail");
      console.error(err);
    }
  }

  /****************************************************************************
    render
  *****************************************************************************/
  render() {
    return (
      <div className="app-container">
        {this.state.loginState !== null ? (
          <Login
            getNewID={this.getNewID}
            login={this.login}
            loginState={this.state.loginState}
            input={this.state.id}
            handleInput={this.handleInput}
            startGame={this.startGame}
          />
        ) : (
            <div>
              <CollectionList
                collectionList={this.state.collectionList}
                currentCollection={this.state.currentCollection}
                newCollection={this.state.newCollection}
                handleInput={this.handleInput}
                addCollection={this.addCollection}
                removeCollection={this.removeCollection}
                selectCollection={this.selectCollection}
              />
              <MemberList
                collectionList={this.state.collectionList}
                currentCollection={this.state.currentCollection}
                removePokemon={this.removePokemon}
                setPokemon={this.setPokemon}
              />
              <Pokedex
                addPokemon={this.addPokemon}
                setPokemon={this.setPokemon}
              />
              <Detail
                pokemon={this.state.pokemon}
                stats={this.state.stats}
                save={this.save}
              />
            </div>
          )}
      </div>
    );
  }
}

export default App;
