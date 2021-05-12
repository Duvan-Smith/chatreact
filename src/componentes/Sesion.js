import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Menu from './Menu';
import Chat from './Chat';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Maximized from './Maximized'
import Maximized2 from './Maximized2'
import Minimized from './Minimized'
import { ThemeProvider, FixedWrapper } from '@livechat/ui-kit';
import Grupo from './Grupo';



class CenteredGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: "",
      nombre: "",
      foto: "",
      idv: "",
      nombrev: "",
      fotov: "",
    }
  }
  componentDidMount() {
    this.setState({ id: this.props.usuario.id, nombre: this.props.usuario.nombre, foto: this.props.usuario.foto })
    this.setState({ idv: this.props.idv, nombrev: this.props.nombrev, fotov: this.props.fotov })
  }
  render() {
    return (
      <div>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Menu nombre={this.state.nombre} foto={this.state.foto} />
          </Grid>
          <Grid item xs={12}>

            <ThemeProvider>
              <FixedWrapper.Root maximizedOnInit>
                <FixedWrapper.Maximized>
                  <Maximized {...this.props} nombre={this.props.usuario.nombre} foto={this.props.usuario.foto} id={this.props.usuario.id} />
                </FixedWrapper.Maximized>
                <FixedWrapper.Minimized>
                  <Minimized {...this.props} />
                </FixedWrapper.Minimized>
              </FixedWrapper.Root>
            </ThemeProvider>
          </Grid>
        </Grid>
      </div>
    )
  }
}
export default CenteredGrid;
