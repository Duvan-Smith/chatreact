import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";

import Sesion from './componentes/Sesion';

var firebaseConfig = {
  apiKey: "AIzaSyDt9FQdiKfAxHIFVJiRWy9cTyxQFFZppms",
  authDomain: "chat-6c018.firebaseapp.com",
  databaseURL: "https://chat-6c018.firebaseio.com",
  projectId: "chat-6c018",
  storageBucket: "chat-6c018.appspot.com",
  messagingSenderId: "129209462668",
  appId: "1:129209462668:web:0bdac24471d95d4a49f0a9",
  measurementId: "G-WE7ZQX1QME"
};
firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();
var storageRef = storage.ref();

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      nombre: "",
      foto: "",
    }
  }
  loginfacebook = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      var token = result.credential.accessToken;
      var user = result.user;
      this.setState({ id: user.l, nombre: user.displayName, foto: user.photoURL })
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }
  logingoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      var token = result.credential.accessToken;
      var user = result.user;
      this.setState({ id: user.l, nombre: user.displayName, foto: user.photoURL })
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }
  vista = () => {

    return (
      <div className="App">
        <Router>
          <header className="App-header">
            <Link to="/inicio"  >Iniciar sesión </Link>
            <Link to="/usuario"  >Iniciar  </Link>
          </header>
          {this.state.id != null ?
            <Route path="/usuario" component={() => <Sesion usuario={this.state} />} /> :
            <Route path="/inicio" component={() => <><Button variant="contained" color="primary" onClick={this.loginfacebook}>Iniciar sesión facebook</Button><Button variant="contained" color="secondary" onClick={this.logingoogle}>Iniciar sesión google</Button></>} />

          }

          {//<Route path="/usuario" component={() => <Sesion usuario={this.state.usuario}/>} />
          }

        </Router>

      </div>
    )
  }
  render() {
    return (
      <div className="App">
        {this.vista()}
      </div>
    )
  }
}

export default App;
