import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";
import EntriesTable from "../components/entriesTable";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {style} from "../styles/mainStyles";
import {withStyles} from "@material-ui/styles";
import AddCustomerForm from "../components/addCustomerForm";
import {deleteCustomer} from "../redux/actions";
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
import {ThemeProvider} from "@material-ui/core";
import theme from "../themes/tableTheme";
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import Fab from "@material-ui/core/Fab";
import {renderLoading} from "../utils/loading";
import {loadData} from "../utils/globalFunctions";
import GetDataDbProvider from "../services/getDataDbProvider";
import {validationTokenProvider} from "../services/validationTokenProvider";

const columnsTable = ['Cliente', 'CNPJ', 'Razão Social', 'E-mail', 'Telefone', 'Endereço', 'Responsável', 'Ações'];
export const loadCustomerData = async (saveData, token) => {
    const allCustomersFromDb = await GetDataDbProvider.loadDataProvider('customer','getCustomers', token);
    await saveData('getCustomers', allCustomersFromDb);
    return {loaded: true}
}
class CustomersScreen extends Component {
    state = {
        showSnackbar: false,
        addCustomer: false,
        loading: true,
        data: null
    };

    handleClose = () => {
        this.setState({...this.state, addCustomer: !this.state.addCustomer, data: null})
    };

    componentDidMount(): void {
        if (this.props.token) {
            validationTokenProvider(this.props.token).then((checkedToken) => {
                if (!checkedToken.isValid) {
                    this.props.history.push('/');
                    return;
                }
                loadCustomerData(this.props.saveData, this.props.token).then((res) => {
                    if (res.loaded) {
                        this.setState({...this.state, loading: false})
                    }
                })
            })
        } else {
            this.props.history.push('/')
        }
    }

    renderBody = () => {
        const {classes} = this.props;
        return (
            <Grid container style={{height: '93.5%'}} direction={'column'} alignItems={"flex-start"}>
                <Grid item style={{height: '10%', width: '100%'}}>
                    <Typography variant={"h4"} style={{fontFamily:'nunito', color:'#5a5c69', margin: 30}}>Clientes</Typography>
                </Grid>
                <Grid item style={{height: '90%', width: '100%'}}>
                        <ThemeProvider theme={theme}>
                            <EntriesTable maxHeight={'100%'} columns={columnsTable}>
                                {this.props.customers ? this.props.customers.map((customer) => (
                                        <TableRow key={customer.nome}>
                                            <TableCell component={'th'} scope={'row'}>{customer.name}</TableCell>
                                            <TableCell component={'th'} scope={'row'} style={{width: 200}}>{customer.cnpj}</TableCell>
                                            <TableCell component={'th'} scope={'row'}>{customer.formalName}</TableCell>
                                            <TableCell component={'th'} scope={'row'}>{customer.email}</TableCell>
                                            <TableCell component={'th'} scope={'row'} style={{width: 200}}>{customer.fone}</TableCell>
                                            <TableCell component={'th'} scope={'row'}>{customer.address}</TableCell>
                                            <TableCell component={'th'} scope={'row'}>{customer.contactPerson}</TableCell>
                                            <TableCell component={'th'} scope={'row'} style={{width: 170}}>
                                                <Box display={'flex'} justifyContent={'flex-start'}>
                                                    <IconButton onClick={() => {
                                                        customer.type = 'updateCustomer';
                                                        this.setState({addCustomer: true, data: customer});
                                                    }}>
                                                        <EditIcon />
                                                    </IconButton>

                                                    <IconButton onClick={() => {
                                                        removeDataDb('customer', 'remove_customer', customer.id, this.props.token);
                                                        this.props.removeCustomer(customer.id);
                                                        this.setState({...this.state, showSnackbar: true, message: 'Cliente removido com sucesso!'})

                                                    }}>
                                                        <CloseIcon />
                                                    </IconButton>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    )) :
                                    null
                                }
                            </EntriesTable>
                        </ThemeProvider>
                </Grid>
                <Fab className={classes.FloatEnterButton} onClick={()=>this.setState({addCustomer: true})}>
                    <AddBoxRoundedIcon />
                </Fab>

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
            </Grid>
        )
    }
    render() {
     return  this.props.loading || this.state.loading ? renderLoading() : this.renderBody();
    }
}


const mapStateToProps = (state) => {
    return {
        token: state.session.token,
        customers: state.listCustomers,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeCustomer: (customerId) => {
            dispatch(deleteCustomer(customerId))
        },
        saveData: (type, payload) => {
            dispatch({type, payload})
        }
    }
}

const CS = withStyles(style)(CustomersScreen)
export default connect(mapStateToProps, mapDispatchToProps)(CS)
