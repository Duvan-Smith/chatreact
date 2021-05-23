import React from "react";
import "../../Css/App.css";
import Button from "@material-ui/core/Button";
import * as firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";
import Cookies from "universal-cookie";
import Img from "../../Data/img.jpg";

const cookies = new Cookies();
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      nombre: "",
      foto: "",
      rows: [],
    };
  }

  getData() {
    var db = firebase.firestore();
    this.setState({ rows: [] });
    db.collection("users")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var u = doc.data();
          var nu = this.state.rows;
          nu.push(u);
          this.setState({ rows: nu });
        });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  }

  componentDidMount() {
    this.getData();
    if (cookies.get("estadosesion")) {
      firebase.auth().signOut();
      cookies.remove("estadosesion", { path: "/" });
      cookies.remove("idrow", { path: "/" });
      cookies.remove("id2row", { path: "/" });
      cookies.remove("nombrerow", { path: "/" });
      cookies.remove("fotorow", { path: "/" });
      cookies.remove("email", { path: "/" });
      cookies.remove("rol", { path: "/" });
      cookies.remove("primernombre", { path: "/" });
      cookies.remove("Avatar", { path: "/" });
      cookies.remove("signin", { path: "/" });
      cookies.remove("uid", { path: "/" });
      cookies.remove("rows", { path: "/" });
    }
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ isSignedIn: !!user });
    });
  }

  llenarCookies = (user) => {
    if (user != null) {
      cookies.set("email", user.email, { path: "/" });
      cookies.set("rol", "user", { path: "/" });
      cookies.set("primernombre", user.displayName, { path: "/" });
      cookies.set("Avatar", user.photoURL, { path: "/" });
      cookies.set("signin", user.providerId, { path: "/" });
      cookies.set("uid", user.uid, { path: "/" });
      alert(`Bienvenido ${user.displayName}`);
      window.location.href = "./cuenta";
    }
  };

  cerrarSesion = () => {
    firebase.auth().signOut();
  };

  setInsert() {
    var c = 0;
    this.state.rows.forEach((doc) => {
      if (doc.id === this.state.id && doc.nombre === this.state.nombre) {
        c = c + 1;
      }
    });
    if (c < 1) {
      this.setData();
    }
  }

  setData() {
    var db = firebase.firestore();
    let docReaf = db.collection("users").doc();
    docReaf.set({
      id: this.state.id,
      foto: this.state.foto,
      nombre: this.state.nombre,
      id2: this.state.rows.length,
    });
  }

  loginfacebook = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result.credential.accessToken);
        var user = result.user;
        this.setState({
          id: user.l,
          nombre: user.displayName,
          foto: user.photoURL,
        });
        this.setInsert();
      })
      .catch(function (error) {
        console.log(error.code);
      });
    this.llenarCookies(firebase.auth().currentUser);
  };

  logingoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result.credential.accessToken);
        var user = result.user;
        this.setState({
          id: user.l,
          nombre: user.displayName,
          foto: user.photoURL,
        });
        this.setInsert();
      })
      .catch(function (error) {
        console.log(error.code);
      });
    this.llenarCookies(firebase.auth().currentUser);
  };

  render() {
    return (
      <div className="App">
        <div className="row" style={{ margin: 20 }}>
          <div className="col-12">
            <img
              style={{
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 10,
                marginTop: 10,
              }}
              width="65%"
              height="auto"
              src={Img}
              alt="StepperFin"
            />
          </div>
          <div className="col-12">
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={this.loginfacebook}
              >
                Iniciar sesión facebook
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.logingoogle}
              >
                Iniciar sesión google
              </Button>
            </>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
