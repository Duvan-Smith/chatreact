import React from "react";
import Button from "@material-ui/core/Button";

import Cookies from "universal-cookie";

const cookies = new Cookies();
export default class SimpleTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  CargarChat = (user) => {
    if (user != null) {
      cookies.set("idrow", user.id, { path: "/" });
      cookies.set("id2row", user.id2, { path: "/" });
      cookies.set("nombrerow", user.nombre, { path: "/" });
      cookies.set("fotorow", user.foto, { path: "/" });
    }
  };
  render() {
    return (
      <>
        {cookies.get("rows").map((d) => {
          return (
            <div className="row" style={{ margin: 20 }}>
              <div className="col-12">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.CargarChat(d)}
                >
                  {d.nombre}
                </Button>
                <hr />
              </div>
            </div>
          );
        })}
      </>
    );
  }
}