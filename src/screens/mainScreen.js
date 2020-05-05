import React, {Component, useState} from 'react'
import Typography from "@material-ui/core/Typography";
import OverViewOfSystemCards from "../components/overViewOfSystemCards";
import EntryValueButtons from "../components/entryValueButtons";
import EntriesTable from "../components/entriesTable";
import {connect} from 'react-redux'
import {Popover, TableCell} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import 'moment/locale/pt-br'
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import {removeDataDb} from "../services/removeDataDb";
import ModalBody from "../components/ModalBody";
import AddCreditForm from "../components/AddCreditForm";
import AddDebitForm from "../components/AddDebitForm";
import {deleteValue, finishLoad, finishLoadAllData, removeFilteredValue, saveDataFromDb} from "../redux/actions";
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
import {formatCurrencie, getColorByStatus, getTextByStatus, loadData} from "../utils/globalFunctions";
import Button from "@material-ui/core/Button";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import {CheckBox} from "@material-ui/icons";
import FormCheckInput from "react-bootstrap/FormCheckInput";
import Checkbox from "@material-ui/core/Checkbox";
import {validationTokenProvider} from "../services/validationTokenProvider";
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 48 * 4.5 + 8,
            width: 100,
        },
    },
};

export const loadValuesData = async (saveData, token) => {
    const allCreditsFromDb = await GetDataDbProvider.loadDataProvider('values', 'getCredit', token);
    await saveData('saveCreditsDebits', allCreditsFromDb);
    await saveData('saveFilteredValues', {
        payed: allCreditsFromDb.filter( (value) => value.status === 'payed' || value.status === null),
        unpayed: allCreditsFromDb.filter( (value) => value.status === 'unpayed'),
        opened: allCreditsFromDb.filter( (value) => value.status === 'opened')
    });
    return {loaded: true}
};

const selectDate = (selectedDate, handleDate) => {
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return (
        <FormControl style={{maxWidth: 125}}>
            <InputLabel id={'listMonths'}>Mes</InputLabel>
            <Select
                labelId={'listMonths'}
                id={'listMonthsSelect'}
                value={selectedDate}
                onChange={event => handleDate(event.target.value)}
                input={<Input />}
                multiple
                MenuProps={MenuProps}
                renderValue={(selected) => selected.join(', ')}
                style={{width: 200}}>
                <MenuItem value={null} style={{height: 30}}>    </MenuItem>
                {
                    months.map(month => {
                        return (
                            <MenuItem key={month} value={month}>
                                <Box display={'flex'} style={{width: '100%'}} flexDirection={'row'} justifyContent={'flex-start'}>
                                    <Checkbox checked={selectedDate.indexOf(month) > -1} />
                                    <span style={{margin:2}}>{month}</span>
                                </Box>
                            </MenuItem>
                        )
                    })
                }
            </Select>
        </FormControl>
    )
}


const ColumnsEntries = (selectedDate, handleDate) => {
    return [selectDate(selectedDate, handleDate), 'Valor', 'Cliente', 'Serviço/Produto', 'Forma de pagamento', 'Status', 'Observação', 'Ações'
    ];
};

class MainScreen extends Component {

    state = {
        showSnack: false,
        show: false,
        isCredit: false,
        loading: true,
        data: {},
        currentTarget: null,
        openPop: false,
        selectDate: [moment().format('MMMM')],
    };

    showSelectedValue = (value) => {
        value.type = 'updateValue';
        this.setState({show: true, isCredit: !!value.selectedCustomer, data: value})
    };


    handleClose = () => {
        this.setState({...this.state, show: !this.state.show})
    };

    handleSuccess = (valueType, action) => this.setState({
        ...this.state,
        showSnack: true,
        message: `${valueType} ${action} com sucesso!`
    });

    componentDidMount(): void {
        moment.locale('pt-br');
        if (this.props.token) {
            validationTokenProvider(this.props.token).then((checkedToken) => {
                console.log(checkedToken)
                if (!checkedToken.isValid) {
                    this.props.history.push('/');
                    return;
                }

                if (this.state.loading) {
                    loadValuesData(this.props.saveData, this.props.token).then((res) => {
                        if (res.loaded) {
                            this.setState({...this.state, loading: false})
                        }
                    })
                }
            })
        } else {
            this.props.history.push('/')
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
                    <EntriesTable maxHeight={585} columns={ColumnsEntries(this.state.selectDate, (selectDate) => {
                        this.setState({...this.state, selectDate})
                    })}>
                        {
                            this.props.listCreditsDebits ?
                                this.props.listCreditsDebits
                                    .filter(value => this.state.selectDate.indexOf(moment(value.date).format('MMMM')) > -1)
                                    .map(value => {
                                return (
                                    <TableRow key={value.id} style={{borderLeft: `.30rem solid ${getColorByStatus(value.status)} !important`}}>
                                        <TableCell
                                            component={'th'}
                                            scope={'row'}
                                            style={{borderLeft: `.3rem solid ${getColorByStatus(value.status)}`}}
                                        >{moment(value.date).format('DD/MM/YYYY')}
                                        </TableCell>
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
                                        <TableCell style={{height: 'auto !important'}} component={'th'} scope={'row'}>{getTextByStatus(value.status)}</TableCell>
                                        <TableCell style={{height: 'auto !important'}} component={'th'} scope={'row'}>{value.ref}</TableCell>
                                        <TableCell style={{height: 'auto !important'}} component={'th'} scope={'row'} style={{width:175}}>
                                            <Box display={'flex'} flexDirection={'row'}  justifyContent={'flex-start'}>
                                                <IconButton onClick={() => this.showSelectedValue(value)}>
                                                    <EditIcon/>
                                                </IconButton>
                                                <IconButton onClick={() => {
                                                    removeDataDb('values', 'remove_value', value.id, this.props.token);
                                                    this.props.removeFilteredValue(value.id, value.status);
                                                    this.props.removeValue(value.id);
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
                            <TableCell/>
                            <TableCell align={"left"} colspan={4} component={'th'} scope={'row'} style={{height: 'auto !important'}}>
                                Total $ {formatCurrencie( this.props.listCreditsDebits.length ? this.props.listCreditsDebits.map((val) => val.price).reduce((a, b) => a+b) : 0)}
                            </TableCell>
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
        if (this.state.loading) return renderLoading();
        return (this.renderBody())
    }
}

const mapStateToProps = state => {
    return {
        token: state.session.token,
        listCreditsDebits: state.listDebitsCredits,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeValue: (id) => {
            dispatch(deleteValue(id))
        },
        removeFilteredValue: (id, status) => {
            dispatch(removeFilteredValue({id: id, status: status}))
        },
        saveData: (type, payload) => {
            dispatch(saveDataFromDb({type, payload}))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
