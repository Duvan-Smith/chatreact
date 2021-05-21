import React from "react";
import Grid from "@material-ui/core/Grid";
import Menu from "./Bar/Menu";
import Maximized from "./Chat/Maximized";
import Minimized from "./Chat/Minimized";
import { ThemeProvider, FixedWrapper } from "@livechat/ui-kit";
import Grupo from "./ListaPersonas/Personas";
import Paper from "@material-ui/core/Paper";

import * as firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";
import Cookies from "universal-cookie";

const cookies = new Cookies();
class CenteredGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idrow: !cookies.get("idrow") ? "" : cookies.get("idrow"),
      id2row: !cookies.get("id2row") ? "" : cookies.get("id2row"),
      nombrerow: !cookies.get("nombrerow") ? "" : cookies.get("nombrerow"),
      fotorow: !cookies.get("fotorow") ? "" : cookies.get("fotorow"),
      rows: [],
    };
  }

  getData() {
    var db = firebase.firestore();

    this.setState({
      id: cookies.get("uid"),
      nombre: cookies.get("primernombre"),
      foto: cookies.get("Avatar"),
    });

    db.collection("users")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var u = doc.data();
          var nu = this.state.rows;
          nu.push(u);
          this.setState({ rows: nu });
          cookies.set("rows", nu, { path: "/" });
        });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.rows !== this.state.rows || prevState.id !== this.state.id) {
      this.getData();
    }
  }

  render() {
    return (
      <div>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Menu />
          </Grid>
          {!cookies.get("rows") ? (
            <></>
          ) : (
            <Grid item xs={2} style={{ border: "1px" }}>
              <Paper>
                <Grupo />
              </Paper>
            </Grid>
          )}
          <Grid item xs={12}>
            {this.state.idrow !== "" ? (
              <ThemeProvider>
                <FixedWrapper.Root maximizedOnInit>
                  <FixedWrapper.Maximized>
                    <Maximized
                      {...this.props}
                      id={cookies.get("uid")}
                      nombre={cookies.get("primernombre")}
                      foto={cookies.get("Avatar")}
                      nombreA={cookies.get("nombrerow")}
                      fotoA={cookies.get("fotorow")}
                      idA={cookies.get("idrow")}
                      id2A={cookies.get("id2row")}
                    />
                  </FixedWrapper.Maximized>
                  <FixedWrapper.Minimized>
                    <Minimized {...this.props} />
                  </FixedWrapper.Minimized>
                </FixedWrapper.Root>
              </ThemeProvider>
            ) : null}
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default CenteredGrid;