import React from "react";
import Grid from "@material-ui/core/Grid";
import Menu from "./Bar/Menu";
import Maximized from "./Chat/Maximized";
import Minimized from "./Chat/Minimized";
import { ThemeProvider, FixedWrapper } from "@livechat/ui-kit";
import Grupo from "./ListaPersonas/Personas";
import Paper from "@material-ui/core/Paper";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

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
      anchor: !cookies.get("anchor") ? false : !cookies.get("anchor"),
    };
  }

  toggleDrawer = () => {
    this.setState({ anchor: !this.state.anchor });
  };

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
    if (prevState.rows !== this.state.rows) {
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
          <React.Fragment key={"left"}>
            <SwipeableDrawer
              anchor={"left"}
              open={this.state.anchor}
              onClose={() => this.toggleDrawer()}
              onOpen={() => this.toggleDrawer()}
            >
              {!cookies.get("rows") ? (
                <></>
              ) : (
                <Paper>
                  <Grupo />
                </Paper>
              )}
            </SwipeableDrawer>
          </React.Fragment>
          <Grid item xs={12}>
            <div className="row" style={{ margin: 20, alignItems: "center" }}>
              <div className="col-6">
                <Button onClick={() => this.toggleDrawer()}>{"Ver lista de amigos agregados"}</Button>
              </div>
            </div>
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