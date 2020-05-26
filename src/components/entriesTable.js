import React, {Component} from 'react'
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";

class EntriesTable extends Component {

    render() {
        return (
            <TableContainer style={{maxHeight: this.props.maxHeight}} component={Paper}>
                <Table stickyHeader aria-label={'sticky table'}>
                    <TableHead>
                        <TableRow>
                            {this.props.columns.map(column => {
                                switch (column) {
                                    case 'Ações':
                                        return <TableCell align={'center'}>
                                            {column}
                                        </TableCell>
                                    case 'Quantidade em estoque':
                                        return <TableCell align={'center'}>
                                            {column}
                                        </TableCell>
                                    default:
                                        return <TableCell>{column}</TableCell>
                                }
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.children}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}

export default EntriesTable
