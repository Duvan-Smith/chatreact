import React from 'react';
import ReactDOM from 'react-dom';
import './Css/index.css';
import Routes from './Routes/Routes';
import * as serviceWorker from './serviceWorker';
import firebase from "firebase"

firebase.initializeApp({
    apiKey: "AIzaSyCkgI9EsXFLzXxD0l4bT8L09wLuvvQKLhU",
    authDomain: "chat-react-4ad44.firebaseapp.com",
    databaseURL: "https://chat-react-4ad44.firebaseio.com",
    projectId: "chat-react-4ad44",
    storageBucket: "chat-react-4ad44.appspot.com",
    messagingSenderId: "615934840211",
    appId: "1:615934840211:web:a519314a76374a92a8ec66"
})

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
