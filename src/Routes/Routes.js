import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import InicioSesion from '../Componentes/InicioSesion/InicioSesionGoogle';
import '../Css/App.css';
import Grupo from '../Componentes/Chat/Grupo';
import Base from '../Componentes/Base/ComBase';

class Routes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={InicioSesion} />
                    <Route exact path="/base" component={Base} />
                    <Route exact path="/user/grupo" component={Grupo} />
                </Switch>
            </BrowserRouter>
        );
    }
}
export default Routes;