import React, {Component} from 'react'
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {connect} from 'react-redux'

class EntriesTable extends Component {

    render() {
        return (
            <TableContainer style={{maxHeight:this.props.maxHeight ? this.props.maxHeight : 250}}component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {this.props.columns.map(column => {
                                return (
                                    <TableCell>{column}</TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {this.props.children}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}

export default EntriesTable
