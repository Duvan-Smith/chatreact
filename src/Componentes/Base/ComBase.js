import Button from '@material-ui/core/Button';
import React from 'react';
import Cookies from 'universal-cookie';
import '../../Css/App.css';
import firebase from "firebase/app";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Menu from '../Bar/Menu';
import Sesion from '../Chat/Sesion';

const cookies = new Cookies();
class Usuario extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mostrar: false,
            mostrarP: false,
        }
    }
    render() {
        return (
            <div>
                <Menu/>
                <div className="row" style={{
                    margin: 10,
                    justifyContent: "center",
                    textAlign: "center",
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <div className="col-12" >
                        <Sesion/>
                    </div>
                </div>
            </div>
        );
    }
}
export default Usuario;