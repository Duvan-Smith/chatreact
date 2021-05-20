// import Button from '@material-ui/core/Button';
import React from 'react';
import '../../Css/App.css';
import Menu from '../Bar/Menu';
import Sesion from '../Chat/Sesion';
import Grupo from '../Chat/Grupo';

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
                <div className="row" 
                    style={{
                        margin: 10,
                        justifyContent: "left",
                        textAlign: "left",
                        display: 'flex',
                        alignItems: 'left',
                    }}>
                    {/* <Grupo/> */}
                    <Sesion/>

                </div>
            </div>
        );
    }
}
export default Usuario;