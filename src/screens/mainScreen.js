import React, {Component} from 'react'
import Typography from "@material-ui/core/Typography";
import OverViewOfSystemCards from "../components/overViewOfSystemCards";
import EntryValueButtons from "../components/entryValueButtons";
import EntriesTable from "../components/entriesTable";
import {connect} from 'react-redux'
import {TableCell} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import {removeDataDb} from "../services/removeDataDb";
import ModalBody from "../components/ModalBody";
import AddCreditForm from "../components/AddCreditForm";
import AddDebitForm from "../components/AddDebitForm";




const columnsEntries = ['', 'Data', 'Cliente', 'Serviço/Produto', 'Forma de pagamento', 'Valor', 'Pago/Inadimplente', 'Observação'];

class MainScreen extends Component {

    state = {
        show: false,
        isCredit: false,
        data: {}
    };
    showSelectedValue = (value) => {
        value.type = 'updateValue';
        this.setState({show: true, isCredit: !!value.selectedCustomer, data: value })
    }

    handleClose = () => {
        this.setState({...this.state, show: !this.state.show})
    };

    render() {
        return (
            <div>
                <Typography variant={"h4"} style={{fontFamily:'nunito', color:'#5a5c69', margin: 30}}>Dashboard</Typography>
                <OverViewOfSystemCards/>
                <Typography variant={"h4"} style={{fontFamily:'nunito', color:'#5a5c69', margin: 30, marginBottom: 20}}>Lançamentos</Typography>
                <EntryValueButtons/>
                <EntriesTable columns={columnsEntries}>
                    {
                        this.props.listCreditsDebits ? this.props.listCreditsDebits.map(value => {
                            return (
                                    <TableRow key={value.date}>
                                        <TableCell component={'th'} scope={'row'}>
                                            <Box display={'flex'} justifyContent={'space-around'}>
                                                <IconButton onClick={() => this.showSelectedValue(value)}>
                                                    <EditIcon/>
                                                </IconButton>
                                                <IconButton onClick={() => removeDataDb('delete_value' ,value.id) }>
                                                    <CloseIcon/>
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                        <TableCell component={'th'} scope={'row'}>{moment(value.date).format('DD-MM-YYYY')}</TableCell>
                                        <TableCell component={'th'} scope={'row'}>{value.selectedCustomer}</TableCell>
                                        <TableCell component={'th'} scope={'row'}>{
                                            value.isService && value.isProduct ?
                                                `${value.selectedService} - ${value.selectedProduct}` :
                                                `${value.selectedService ? value.selectedService : ''}
                                            ${value.selectedProdcut ? value.selectedProdcut : ''}`
                                        }</TableCell>
                                        <TableCell component={'th'} scope={'row'}>{value.paymentMethod}</TableCell>
                                        <TableCell component={'th'} scope={'row'}>{value.price}</TableCell>
                                        <TableCell component={'th'} scope={'row'}>{value.status === 'payed' ? 'Pago' : 'Inadimplente'}</TableCell>
                                        <TableCell component={'th'} scope={'row'}>{value.ref}</TableCell>
                                    </TableRow>
                            )
                        }) : null
                    }
                </EntriesTable>

                <ModalBody open={this.state.show} onClose={() => this.handleClose() }>
                    {
                        this.state.isCredit ?
                            <AddCreditForm
                                data={this.state.data}
                                update={() => this.setState({...this.state, show: false})}
                                onCancel={() => this.setState({...this.state, show: false})} /> :
                            <AddDebitForm
                                data={this.state.data}
                                update={() => this.setState({...this.state, show: false})}
                                onCancel={() => this.setState({...this.state, show: false})}/>
                    }
                </ModalBody>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        listCreditsDebits : state.listDebitsCredits,
        listCredits: state.listCredits,
        listDebits: state.listDebits,
    }
};

export default connect(mapStateToProps)(MainScreen)
