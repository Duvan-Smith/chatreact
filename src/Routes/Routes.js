import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import '../Css/App.css';
import Base from '../Componentes/Base';
import InicioSesion from '../Componentes/InicioSesion/InicioSesion';

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
                  <Route exact path="/cuenta" component={Base} />
              </Switch>
          </BrowserRouter>
      );
  }
}
export default Routes;