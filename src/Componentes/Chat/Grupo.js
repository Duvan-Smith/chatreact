import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

export default class SimpleTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <Paper >
                <Button onClick={() => this.props.selectCard({ id: this.props.id, id2: this.props.id2, nombre: this.props.nombre, foto: this.props.foto })}>
                    {this.props.nombre}
                </Button>
                <hr />
            </Paper>
        );
    }
}
