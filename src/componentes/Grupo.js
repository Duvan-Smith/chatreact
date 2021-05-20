import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Sesion from './Sesion';

import Button from '@material-ui/core/Button';


import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


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
