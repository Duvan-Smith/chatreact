import React from 'react';
import Grid from '@material-ui/core/Grid';
import Maximized from './Maximized'
import Minimized from './Minimized'
import { ThemeProvider, FixedWrapper } from '@livechat/ui-kit';
import Cookies from 'universal-cookie';
import firebase from "firebase";
import Grupo from './Grupo';
const cookies = new Cookies();

class CenteredGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id2: "",
      rows: [],
      id: !cookies.get('uid')?"":cookies.get('uid'),
      nombre: !cookies.get('primernombre')?"":cookies.get('primernombre'),
      foto: !cookies.get('Avatar')?"":cookies.get('Avatar'),
      idv: !cookies.get('signin')?"":cookies.get('signin'),
      nombrev: !cookies.get('uid')?"":cookies.get('uid'),
      fotov: !cookies.get('uid')?"":cookies.get('uid'),
      UserSelected:{}
    }
  }
  getData() {
    var db = firebase.firestore();
    this.setState({ rows: [] })

    this.setState({ id: cookies.get('uid'), nombre: cookies.get('primernombre'), foto: cookies.get('Avatar') })

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
    this.setState({ UserSelected: card })
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
        <Grid item xs={2} style={{border: "1px"}}>
            {this.renderCards()}
          </Grid>
          <Grid item xs={12}>
            <ThemeProvider>
              <FixedWrapper.Root maximizedOnInit>
                <FixedWrapper.Maximized>
                  <Maximized
                      {...this.state}
                      id={cookies.get('uid')}
                      nombre={cookies.get('primernombre')}
                      foto={cookies.get('Avatar')}
                      nombreA={this.state.UserSelected.nombre}
                      fotoA={this.state.UserSelected.foto}
                      idA={this.state.UserSelected.id}
                      id2A={this.state.UserSelected.id2}
                    />
                </FixedWrapper.Maximized>
                <FixedWrapper.Minimized>
                  <Minimized {...this.state} />
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
