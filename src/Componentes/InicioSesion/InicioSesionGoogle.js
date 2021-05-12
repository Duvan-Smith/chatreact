import firebase from "firebase";
import React, { Component } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Cookies from 'universal-cookie';
import "../../Css/App.css";
import Button from '@material-ui/core/Button';

const cookies = new Cookies();
class InicioSesionGoogle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: null,
            nombre: "",
            foto: "",
            rows: [],
            isSignedIn: false,
            signInFlow: "popup",
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            ],
            callbacks: {
                signInSuccess: () => false
            },
        }
    }
    componentDidMount = () => {
        if (cookies.get('estadosesion')) {
            firebase.auth().signOut()
            cookies.remove('estadosesion', { path: "/" })
        }
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ isSignedIn: !!user })
        })
    }
    llenarCookies = async (user) => {
        if (user != null) {
            cookies.set('email', user.email, { path: "/" });
            cookies.set('rol', "user", { path: "/" });
            cookies.set('primernombre', user.displayName, { path: "/" });
            cookies.set('Avatar', user.photoURL, { path: "/" });
            cookies.set('signin', user.providerId, { path: "/" });
            cookies.set('uid', user.uid, { path: "/" });
            alert(`Bienvenido ${user.displayName}`)
            window.location.href = "./base";
        }
    }
    cerrarSesion = async () => {
        firebase.auth().signOut()
    }
    loginfacebook = () => {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            console.log(result.credential.accessToken)
            var user = result.user;
            this.setState({ id: user.l, nombre: user.displayName, foto: user.photoURL })
        }).catch(function (error) {
            console.log(error.code)
        });
        this.llenarCookies(firebase.auth().currentUser)
    }
    logingoogle = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            var user = result.user;
            this.setState({ id: user.l, nombre: user.displayName, foto: user.photoURL })
        }).catch(function (error) {
            console.log(error.code)
        });
        this.llenarCookies(firebase.auth().currentUser)
    }
    render() {
        return (
            <div className="App">
                {this.state.isSignedIn ? (
                    <span>
                        {this.llenarCookies(firebase.auth().currentUser)}
                    </span>
                ) : (
                    <>
                        <StyledFirebaseAuth
                            uiConfig={this.state}
                            firebaseAuth={firebase.auth()}
                        />
                        <Button variant="contained" color="primary" onClick={this.loginfacebook}>
                            Iniciar sesión facebook
                        </Button>
                        <Button variant="contained" color="secondary" onClick={this.logingoogle}>
                            Iniciar sesión google
                        </Button>
                    </>
                )}
            </div>
        )
    }
}
export default InicioSesionGoogle