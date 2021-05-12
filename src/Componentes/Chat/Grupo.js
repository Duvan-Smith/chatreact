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

const useStyles = makeStyles({
    root: {
        width: '40%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 150,
    },
});

function createData(name, id, foto) {
    return { name, id, foto };
}

const rows = [
    createData('Frozen yoghurt', 159,'foto'),
    createData('Ice cream sandwich', 237,'foto'),
    createData('Eclair', 262,'foto'),
    createData('Cupcake', 305,'foto'),
    createData('Gingerbread', 356,'foto'),
];

export default function SimpleTable() {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nombres</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                            {row.name}
                                <Menu>
                                    <MenuItem>
                                        {row.name}
                                    </MenuItem>
                                </Menu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}
