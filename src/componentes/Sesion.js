import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Menu from './Menu';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Maximized from './Maximized'
import Minimized from './Minimized'
import { ThemeProvider, FixedWrapper } from '@livechat/ui-kit';
import Grupo from './Grupo';

import * as firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";

class CenteredGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: "",
      id2: "",
      nombre: "",
      foto: "",
      rows: [],
    }
  }
  getData() {
    var db = firebase.firestore();
    this.setState({ rows: [] })

    this.setState({ id: this.props.usuario.id, nombre: this.props.usuario.nombre, foto: this.props.usuario.foto })

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
  selectCard = (card) => {
    this.setState({ CardSelected: card })
  }
  renderCards = () => {
    return <div> <p>Nombre</p>{this.state.rows.map((d) => {
      return (
        <Grupo
          id={d.id}
          id2={d.id2}
          nombre={d.nombre}
          foto={d.foto}
          selectCard={() => this.selectCard({ id: d.id, id2: d.id2, nombre: d.nombre, foto: d.foto })}
        />

      )
    })}   
    </div>
  }
  render() {
    return (
      <div>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Menu nombre={this.state.nombre} foto={this.state.foto} />
          </Grid>
          <Grid item xs={2} style={{border: "1px"}}>
            {this.renderCards()}
          </Grid>
          <Grid item xs={12}>
            {this.state.CardSelected != null ?
              <ThemeProvider>
                <FixedWrapper.Root maximizedOnInit>
                  <FixedWrapper.Maximized>
                    <Maximized
                      {...this.props}
                      id={this.props.usuario.id}
                      nombre={this.props.usuario.nombre}
                      foto={this.props.usuario.foto}
                      nombreA={this.state.CardSelected.nombre}
                      fotoA={this.state.CardSelected.foto}
                      idA={this.state.CardSelected.id}
                      id2A={this.state.CardSelected.id2}
                    />
                  </FixedWrapper.Maximized>
                  <FixedWrapper.Minimized>
                    <Minimized {...this.props} />
                  </FixedWrapper.Minimized>
                </FixedWrapper.Root>
              </ThemeProvider> : null
            }</Grid>
        </Grid>
      </div>
    )
  }
}
export default CenteredGrid;