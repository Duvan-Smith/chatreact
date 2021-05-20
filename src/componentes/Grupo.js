import React from 'react';
import Paper from '@material-ui/core/Paper';

import { BrowserRouter as Link } from "react-router-dom";

export default class SimpleTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <Paper >
                <Link onClick={() => this.props.selectCard({ id: this.props.id, id2: this.props.id2, nombre: this.props.nombre, foto: this.props.foto })} to="/usuario">
                    {this.props.nombre}
                </Link>
                <hr />
            </Paper>
        );
    }
}
