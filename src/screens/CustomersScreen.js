import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";
import OverViewOfSystemCards from "../components/overViewOfSystemCards";
import EntryValueButtons from "../components/entryValueButtons";
import EntriesTable from "../components/entriesTable";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {style} from "../styles/mainStyles";
import {withStyles} from "@material-ui/styles";
import Modal from '@material-ui/core/Modal'
import ModalContainer from "../components/modalContainer";
import AddDebitForm from "../components/AddDebitForm";
import AddCustomerForm from "../components/addCustomerForm";
import {addCustomer, deleteCustomer} from "../redux/actions";
import {connect} from 'react-redux'
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import ModalBody from "../components/ModalBody";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import {removeDataDb} from "../services/removeDataDb";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';




const columnsTable = ['', 'Cliente', 'CNPJ', 'Razão Social', 'E-mail', 'Telefone', 'Endereço', 'Responsável'];
class CustomersScreen extends Component {
    state = {
        showSnackbar: false,
        addCustomer: false,
    };

    handleClose = () => {
        this.setState({addCustomer: !this.state.addCustomer})
    };
    render() {
        const {classes} = this.props
        return (
            <div>
                <Typography variant={"h4"} style={{fontFamily:'nunito', color:'#5a5c69', margin: 30}}>Clientes</Typography>
                    <Grid container>
                        <Grid item xs={12}>
                            <Box display={'flex'}  style={{padding:10, marginLeft:36}}flexDirection={'row'}>
                                <Button className={classes.SuccessButton} onClick={()=>this.setState({addCustomer: true})}>Cadastrar cliente</Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <EntriesTable maxHeight={500} columns={columnsTable}>
                                {this.props.customers ? this.props.customers.map((customer) => (
                                        <TableRow key={customer.nome}>
                                            <TableCell component={'th'} scope={'row'}>
                                                <Box display={'flex'} justifyContent={'space-around'}>
                                                    <IconButton onClick={() => {
                                                        customer.type = 'updateCustomer';
                                                        this.setState({addCustomer: true, data: customer});
                                                    }}>
                                                        <EditIcon />
                                                    </IconButton>

                                                    <IconButton onClick={() => {
                                                        removeDataDb('remove_customer', customer._id);
                                                        this.props.removeCustomer(customer._id);
                                                        this.setState({...this.state, showSnackbar: true, message: 'Cliente removido com sucesso!'})

                                                    }}>
                                                        <CloseIcon />
                                                    </IconButton>
                                                </Box>
                                            </TableCell>
                                            <TableCell component={'th'} scope={'row'}>{customer.name}</TableCell>
                                            <TableCell component={'th'} scope={'row'}>{customer.cnpj}</TableCell>
                                            <TableCell component={'th'} scope={'row'}>{customer.formalName}</TableCell>
                                            <TableCell component={'th'} scope={'row'}>{customer.email}</TableCell>
                                            <TableCell component={'th'} scope={'row'}>{customer.fone}</TableCell>
                                            <TableCell component={'th'} scope={'row'}>{customer.address}</TableCell>
                                            <TableCell component={'th'} scope={'row'}>{customer.contactPerson}</TableCell>
                                        </TableRow>
                                    )) :
                                    null
                                }
                            </EntriesTable>
                        </Grid>
                    </Grid>

                <Snackbar open={this.state.showSnackbar} autoHideDuration={2000} onClose={() => this.setState({...this.state, showSnackbar: false})}>
                    <MuiAlert onClose={() => this.setState({...this.state, showSnackbar: false})} severity={'success'} variant={'filled'}>
                        {this.state.message}
                    </MuiAlert>
                </Snackbar>
                <ModalBody open={this.state.addCustomer} onClose={this.handleClose} >
                    <AddCustomerForm
                        onSuccess={(action) => this.setState({...this.state, showSnackbar: true, message: `Cliente ${action} com sucesso!`, addCustomer: false})}
                        data={this.state.data}
                        onCancel={()=>this.setState({...this.state, addCustomer: false})}/>
                </ModalBody>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        customers: state.listCustomers,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeCustomer: (customerId) => {
            dispatch(deleteCustomer(customerId))
        }
    }
}

const CS = withStyles(style)(CustomersScreen)
export default connect(mapStateToProps, mapDispatchToProps)(CS)
