import Typography from "@material-ui/core/Typography";
import React, {Component} from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from '@material-ui/core/InputLabel'
import Select from "@material-ui/core/Select";
import FormControl from '@material-ui/core/FormControl';
import MenuItem from "@material-ui/core/MenuItem";
import Input from '@material-ui/core/Input'
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {style} from "../styles/mainStyles";
import {withStyles} from '@material-ui/styles'
import CancelAndSaveButtons from "./cancelAndSaveButtons";
import ModalContainer from "./modalContainer";
import DateFieldComponent from "./dateFieldComponent";
import MethodPayment from "./methodPayment";
import CostOfService from "./CostOfService";
import moment from "moment";
import {connect} from 'react-redux';
import Box from '@material-ui/core/Box'
import {manageDataInDb} from "../services/insertDataDb";
import {addValue, saveDataFromDb, updateValue} from "../redux/actions";
import {formatCurrencie} from "../utils/globalFunctions";

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 48 * 4.5 + 8,
            width: 250,
        },
    },
};

class AddCreditForm extends Component {
/// local STATE
    state = {
        id: this.props.data ? this.props.data.id : null,
        type: this.props.data ? this.props.data.type : 'insertCredit',
        date: this.props.data ? this.props.data.date : moment().valueOf(),
        selectedCustomer: this.props.data ? this.props.data.selectedCustomer : null,
        selectedService: this.props.data ? this.props.data.selectedService : null,
        selectedProduct: this.props.data ? this.props.data.selectedProduct : null,
        paymentMethod: this.props.data ? this.props.data.paymentMethod : null,
        isProduct: this.props.data ? this.props.data.isProduct : false,
        isService: this.props.data ? this.props.data.isService : false,
        price: this.props.data ? this.props.data.price : true,
        status: this.props.data ? this.props.data.status : true,
        ref: this.props.data ? this.props.data.ref : null,
    };

    checkServiceBox = () => {
        this.setState({...this.state, isService: !this.state.isService})
    };

    checkProductBox = () => {
        this.setState({...this.state, isProduct: !this.state.isProduct})
    };

    onCancel = () => {
        this.props.onCancel()
    };

    onSuccess = () => {
        const newCredit = this.state;
        if (newCredit.price === true || newCredit.price === null
        &&  newCredit.status === true || newCredit.status === null) {
            this.setState({...this.state, price: null, status: null});
            return;
        } else if (newCredit.price === true || newCredit.price === null) {
            this.setState({...this.state, price: null});
            return;
        } else if (newCredit.status === true || newCredit.status === null) {
            this.setState({...this.state, status: null});
            return;
        }

        newCredit.price = parseFloat(newCredit.price);
        manageDataInDb('values', newCredit, this.props.token).then(res => {
            newCredit.id = res;
            if (this.state.type === 'insertCredit') {
                this.props.insertData(newCredit);
                this.props.saveFilteredData('saveFilteredValues', newCredit);
                this.props.onSuccess('Credito', 'adicionado');
            } else {
                this.props.updateData(newCredit);
                this.props.saveFilteredData('updateFilteredValue', newCredit);
                this.props.onSuccess('Credito', 'atualizado');
            }
        })
        this.props.update();

    }
    ;

    render() {
        const {classes} = this.props
        return (
            <ModalContainer height={'80vh'}>
                <Typography style={{padding: 5}}>Adicionar Novo Crédito</Typography>
                <form style={{height: '60vh'}} onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        this.onSuccess()
                        e.preventDefault()
                    }
                }}>
                    <Box display={'flex'} flexDirection={'column'} style={{paddingBottom: 10}}>
                        <DateFieldComponent date={this.state.date}
                                            onChange={(value) => this.setState({date: value})}
                                            label={'Data do crédito'}/>
                        <div style={{marginBottom: 5}}>
                            <FormControl style={{marginTop: 10}}>
                                <InputLabel id={'cliente'}>Cliente</InputLabel>
                                <Select
                                    labelId={'cliente'}
                                    id={'clienteSelect'}
                                    value={this.state.selectedCustomer === true ? null : this.state.selectedCustomer}
                                    //This state is LOCAL
                                    onChange={event => this.setState({
                                        ...this.state,
                                        selectedCustomer: event.target.value
                                    })}
                                    input={<Input/>}
                                    MenuProps={MenuProps}
                                    style={{width: 350}}
                                >
                                    <MenuItem value={null} style={{height: 30}}/>
                                    {
                                        this.props.listOfCustomers.map(customer => {
                                            return (
                                                <MenuItem value={customer.formalName}>{customer.name}</MenuItem>
                                            );
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <FormControlLabel
                                style={{marginTop: 12.5}}
                                control={<Checkbox checked={this.state.isService}/>}
                                onClick={() => this.checkServiceBox()} label={'Serviço'}/>
                            <FormControl style={{float: 'right'}}>
                                <InputLabel id={'serviceList'}>Lista de Serviços</InputLabel>
                                <Select
                                    labelId={'serviceList'}
                                    id={'serviceListSelect'}
                                    value={this.state.selectedService}
                                    onChange={event => this.setState({
                                        ...this.state,
                                        selectedService: event.target.value
                                    })}
                                    input={<Input/>}
                                    MenuProps={MenuProps}
                                    style={{width: 200}}>
                                    <MenuItem value={null} style={{height: 30}}> </MenuItem>
                                    {
                                        this.props.listOfServices.map(service => {
                                            return (
                                                <MenuItem value={service.descricao}>{service.descricao}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <FormControlLabel
                                style={{marginTop: 12.5}}
                                control={<Checkbox checked={this.state.isProduct}
                                                   onChange={() => this.checkProductBox()}/>}
                                label={'Mercadoria'}/>
                            <FormControl style={{float: 'right'}}>
                                <InputLabel id={'productsList'}>Lista de Produtos</InputLabel>
                                <Select
                                    labelId={'productsList'}
                                    id={'productsListSelect'}
                                    value={this.state.selectedProduct}
                                    onChange={event => this.setState({
                                        ...this.state,
                                        selectedProduct: event.target.value
                                    })}
                                    MenuProps={MenuProps}
                                    input={<Input/>}
                                    style={{width: 200}}>
                                    <MenuItem value={null} style={{height: 30}}></MenuItem>
                                    {
                                        this.props.listOfProducts.map(product => {
                                            return (
                                                <MenuItem
                                                    value={`${product.brand} - ${product.name}`}>{product.brand} - {product.name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </div>
                        <MethodPayment
                            paymentMethod={this.state.paymentMethod}
                            onChange={(methodPayment) => this.setState({
                                ...this.state,
                                paymentMethod: methodPayment
                            })}/>
                        <CostOfService
                            label={'Valorização'} required={true}
                            value={this.state.price}
                            onChange={(value) => {
                                this.setState({...this.state, price: formatCurrencie(value)});
                            }}/>
                        <FormControl>
                            <InputLabel required error={!this.state.status} id={'statusPayment'}
                                        children={<span>{!this.state.status ? 'Selecione o Status' : null}</span>}>Status
                                do
                                Pagamento</InputLabel>
                            <Select
                                labelId={'statusPayment'}
                                id={'statusPaymentSelect'}
                                value={this.state.status === true ? null : this.state.status}
                                onChange={event => this.setState({...this.state, status: event.target.value})}
                                MenuProps={MenuProps}
                                input={<Input/>}
                                style={{width: 350}}>
                                <MenuItem value={null} style={{height: 50}}> </MenuItem>
                                <MenuItem value={'opened'}>Em aberto</MenuItem>
                                <MenuItem value={'payed'}>Pago</MenuItem>
                                <MenuItem value={'unpayed'}>Inadimplente</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField label={'Observação'} value={this.state.ref}
                                   onChange={event => this.setState({...this.state, ref: event.target.value})}/>
                    </Box>
                </form>
                <Box display={'flex'} style={{height: '10vh'}} alignItems={'flex-end'} justifyContent={'flex-end'}>
                    <CancelAndSaveButtons success={this.onSuccess} cancel={this.onCancel}/>
                </Box>
            </ModalContainer>
        )
    }
}

const
    mapStateToProps = state => {
        return {
            token: state.session.token,
            listOfCustomers: state.listCustomers,
            listOfProducts: state.listProducts,
            listOfServices: state.listServices
        }
    };

const
    mapDispatchToProps = (dispatch) => {
        return {
            insertData: (credit) => {
                dispatch(addValue(credit));
            },
            saveFilteredData: (type, value) => {
                dispatch(saveDataFromDb({type: type, payload: value}))
            },
            updateData: (credit) => {
                dispatch(updateValue(credit))
            }
        }
    };

const
    ECC = withStyles(style)(AddCreditForm);
export default connect(mapStateToProps, mapDispatchToProps)

(
    ECC
)
;
