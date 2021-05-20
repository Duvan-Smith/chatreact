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
  apiKey: "AIzaSyCkgI9EsXFLzXxD0l4bT8L09wLuvvQKLhU",
  authDomain: "chat-react-4ad44.firebaseapp.com",
  databaseURL: "https://chat-react-4ad44.firebaseio.com",
  projectId: "chat-react-4ad44",
  storageBucket: "chat-react-4ad44.appspot.com",
  messagingSenderId: "615934840211",
  appId: "1:615934840211:web:a519314a76374a92a8ec66"
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
      rows: [],
    }
  }
  setInsert() {
    var c = 0;
    this.state.rows.forEach((doc) => {
      if (doc.id == this.state.id && doc.nombre == this.state.nombre) {
        c = c + 1;
      }
    })
    if (c < 1) {
      this.setData()
    }
  }
  setData() {
    var db = firebase.firestore();
    let docReaf = db.collection('users').doc();
    let setAda = docReaf.set({
      id: this.state.id,
      foto: this.state.foto,
      nombre: this.state.nombre,
      id2: this.state.rows.length,
    });
  }
  loginfacebook = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      var token = result.credential.accessToken;
      var user = result.user;
      this.setState({ id: user.l, nombre: user.displayName, foto: user.photoURL })
      this.setInsert()
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
      this.setInsert()
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }
  getData() {
    var db = firebase.firestore();
    this.setState({ rows: [] })
    db.collection('users').get().then((snapshot) => {
      snapshot.forEach((doc) => {
        var u = doc.data();
        var nu = this.state.rows
        nu.push(u)
        this.setState({ rows: nu })
      });
    })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
  }
  componentDidMount() {
    this.getData()
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
