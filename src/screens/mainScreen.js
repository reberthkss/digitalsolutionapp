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
import {deleteValue, finishLoadAllData, removeFilteredValue} from "../redux/actions";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Tooltip from "@material-ui/core/Tooltip";
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ButtonBase from "@material-ui/core/ButtonBase";
import FormControl from "@material-ui/core/FormControl";
import { ThemeProvider } from '@material-ui/core'
import theme from "../themes/tableTheme";
import GetDataDbProvider from "../services/getDataDbProvider";
import CircularProgress from "@material-ui/core/CircularProgress";
import {renderLoading} from "../utils/loading";


const columnsEntries = [
    <FormControl>
        <Tooltip title={'Selecionar data'}>
            <ButtonBase>
                <div style={{padding: 5}}>Data</div>
                <CalendarTodayIcon fontSize={'small'}/>
            </ButtonBase>
        </Tooltip>
    </FormControl>, 'Valor', 'Cliente', 'Serviço/Produto', 'Forma de pagamento', 'Status', 'Observação', 'Ações'];

const loadData = async (saveData, token) => {

    const allCreditsFromDb = await GetDataDbProvider.loadDataProvider('values', 'getCredit', token);
    await saveData('saveCreditsDebits', allCreditsFromDb);

    await saveData('saveFilteredValues', {
        payed: allCreditsFromDb.filter( (value) => value.status === 'payed'),
        unpayed: allCreditsFromDb.filter( (value) => value.status === 'unpayed'),
        opened: allCreditsFromDb.filter( (value) => value.status === 'opened')
    });

    const allCustomersFromDb = await GetDataDbProvider.loadDataProvider('customer','getCustomers', token);
    await saveData('getCustomers', allCustomersFromDb);

    const allServicesFromDb = await GetDataDbProvider.loadDataProvider('services', 'get_services', token);
    await saveData('getServices', allServicesFromDb);

    const allProductsFromDb = await GetDataDbProvider.loadDataProvider('product', 'get_products', token);
    await saveData('getProducts', allProductsFromDb);
    return {loaded: true}
};


class MainScreen extends Component {

    state = {
        showSnack: false,
        show: false,
        isCredit: false,
        data: {},
    };

    showSelectedValue = (value) => {
        value.type = 'updateValue';
        this.setState({show: true, isCredit: !!value.selectedCustomer, data: value})
    }

    handleClose = () => {
        this.setState({...this.state, show: !this.state.show})
    };

    handleSuccess = (valueType, action) => this.setState({
        ...this.state,
        showSnack: true,
        message: `${valueType} ${action} com sucesso!`
    });

    componentDidMount(): void {
        if (this.props.loading) {
            loadData(this.props.saveData, this.props.token).then((res) => {
                if (res.loaded) {
                    this.setState({...this.state, loading: false});
                    this.props.finishLoad();
                }
            })
        }
    }

    renderBody = () => {
        return (
            <div>
                <Typography variant={"h4"}
                            style={{fontFamily: 'nunito', color: '#5a5c69', margin: 30, marginBottom: 10}}>Dashboard</Typography>
                <OverViewOfSystemCards />
                <Typography variant={"h4"} style={{
                    fontFamily: 'nunito',
                    color: '#5a5c69',
                    margin: 30,
                    marginTop: 10,
                    marginBottom: 10
                }}>Lançamentos</Typography>
                <EntryValueButtons onSuccess={this.handleSuccess}/>
                <ThemeProvider theme={theme}>
                    <EntriesTable maxHeight={370} columns={columnsEntries}>
                        {
                            this.props.listCreditsDebits ? this.props.listCreditsDebits.map(value => {
                                return (
                                    <TableRow key={value._id} style={{height: 10}}>
                                        <TableCell
                                            style={{height: 'auto !important'}}
                                            component={'th'}
                                            scope={'row'}>{moment(value.date).format('DD/MM/YYYY')}</TableCell>
                                        <TableCell style={{height: 'auto !important'}} component={'th'} scope={'row'}>R$ {value.price}</TableCell>
                                        <TableCell style={{height: 'auto !important'}} component={'th'} scope={'row'}>{value.selectedCustomer}</TableCell>
                                        <TableCell style={{height: 'auto !important'}} component={'th'} scope={'row'}>
                                            {
                                                value.isService && value.isProduct ? `${value.selectedService} - ${value.selectedProduct}` :
                                                    value.isService ? `${value.selectedService}` :
                                                        value.isProduct ? `${value.selectedProduct}` : ''
                                            }
                                        </TableCell>
                                        <TableCell style={{height: 'auto !important'}} component={'th'} scope={'row'}>{value.paymentMethod}</TableCell>
                                        < TableCell style={{height: 'auto !important'}} component={'th'} scope={'row'}>{value.status}</TableCell>
                                        <TableCell style={{height: 'auto !important'}} component={'th'} scope={'row'}>{value.ref}</TableCell>
                                        <TableCell style={{height: 'auto !important'}} component={'th'} scope={'row'} style={{width:175}}>
                                            <Box display={'flex'} flexDirection={'row'}  justifyContent={'flex-start'}>
                                                <IconButton onClick={() => this.showSelectedValue(value)}>
                                                    <EditIcon/>
                                                </IconButton>
                                                <IconButton onClick={() => {
                                                    removeDataDb('values', 'remove_value', value._id, this.props.token);
                                                    this.props.removeFilteredValue(value._id, value.status);
                                                    this.props.removeValue(value._id);
                                                    this.setState({
                                                        ...this.state,
                                                        showSnack: true,
                                                        message: `Valor deletado!`
                                                    })
                                                }}>
                                                    <CloseIcon/>
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                )
                            }) : null
                        }
                        <TableRow key={'totalValue'} style={{height: 10}} >
                            <TableCell align={"right"} colspan={3} component={'th'} scope={'row'} style={{height: 'auto !important'}}>Total R$ 1000,00</TableCell>
                        </TableRow>

                    </EntriesTable>
                </ThemeProvider>

                <Snackbar open={this.state.showSnack} autoHideDuration={2000}
                          onClose={() => this.setState({...this.state, showSnack: false})}>
                    <MuiAlert severity={'success'} variant={'filled'} onClose={() => this.setState({
                        ...this.state,
                        showSnack: false
                    })}> {this.state.message} </MuiAlert>
                </Snackbar>

                <ModalBody open={this.state.show} onClose={() => this.handleClose()}>
                    {
                        this.state.isCredit ?
                            <AddCreditForm
                                data={this.state.data}
                                update={() => this.setState({...this.state, show: false})}
                                onSuccess={this.handleSuccess}
                                onCancel={() => this.setState({...this.state, show: false})}/> :
                            <AddDebitForm
                                data={this.state.data}
                                onSuccess={this.handleSuccess}
                                update={() => this.setState({...this.state, show: false})}
                                onCancel={() => this.setState({...this.state, show: false})}/>
                    }
                </ModalBody>
            </div>
        )
    }

    render() {
        if (this.props.loading) return renderLoading();
        return (this.renderBody())
    }
}

const mapStateToProps = state => {
    return {
        token: state.session.token,
        loading: state.loadAllData,
        listCreditsDebits: state.listDebitsCredits,
        listCredits: state.listCredits,
        listDebits: state.listDebits,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeValue: (id) => {
            dispatch(deleteValue(id))
        },
        removeFilteredValue: (id, status) => {
            dispatch(removeFilteredValue({_id: id, status: status}))
        },
        finishLoad: () => {
            dispatch(finishLoadAllData());
        },
        saveData: (type, payload) => {
            dispatch({type, payload})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
