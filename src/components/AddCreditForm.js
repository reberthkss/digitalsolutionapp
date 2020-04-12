import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Card from '@material-ui/core/Card'
import React, {Component} from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from '@material-ui/core/InputLabel'
import Select from "@material-ui/core/Select";
import FormControl from '@material-ui/core/FormControl';
import MenuItem from "@material-ui/core/MenuItem";
import Input from '@material-ui/core/Input'
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import {Button} from "@material-ui/core";
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

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 48 * 4.5 + 8,
            width: 250,
        },
    },
};

class EntryCreditCard extends Component {
/// local STATE
    state = {
        date: moment(),
        selectedCustomer: '',
        selectedService: '',
        selectedProduct: '',
        paymentMethod: '',
        isProduct: false,
        isService: false,
        price: 0,
        ref: '-',
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
        this.props.onSuccess(newCredit);
        this.props.update();
    };

    render() {
        const {classes} = this.props
        return (
            <ModalContainer>
                <Typography style={{padding: 5}}>Adicionar novo credito</Typography>
                <form style={{height: '60vh'}}>
                <Box display={'flex'} flexDirection={'column'}>
                    <DateFieldComponent date={this.state.date} label={'Date of Credit'}/>
                    <div style={{marginBottom: 5}}>
                        <FormControl style={{marginTop: 10}}>
                            <InputLabel id={'cliente'}>Cliente</InputLabel>
                            <Select
                                labelId={'cliente'}
                                id={'clienteSelect'}
                                value={this.state.selectedCustomer}
                                //This state is LOCAL
                                onChange={event => this.setState({...this.state, selectedCustomer: event.target.value})}
                                input={<Input/>}
                                MenuProps={MenuProps}
                                style={{width: 350}}
                            >
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
                        <FormControlLabel style={{marginTop: 12.5}} control={<Checkbox checked={this.state.isService}/>}
                                          onClick={() => this.checkServiceBox()} label={'Serviço'}/>
                        <FormControl style={{float: 'right'}}>
                            <InputLabel id={'serviceList'}>Lista de serviços</InputLabel>
                            <Select
                                labelId={'serviceList'}
                                id={'serviceListSelect'}
                                value={this.state.selectedService}
                                onChange={event => this.setState({...this.state, selectedService: event.target.value})}
                                input={<Input/>}
                                MenuProps={MenuProps}
                                style={{width: 200}}>
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
                        <FormControlLabel style={{marginTop: 12.5}} control={<Checkbox checked={this.state.isProduct}
                                                                                       onChange={() => this.checkProductBox()}/>}
                                          label={'Mercadoria'}/>
                        <FormControl style={{float: 'right'}}>
                            <InputLabel id={'productsList'}>Lista de produtos</InputLabel>
                            <Select
                                labelId={'productsList'}
                                id={'productsListSelect'}
                                value={this.state.selectedProduct}
                                onChange={event => this.setState(...this.state, {selectedProduct: event.target.value})}
                                MenuProps={MenuProps}
                                input={<Input/>}
                                style={{width: 200}}>
                                {
                                    this.props.listOfProducts.map(product => {
                                        return (
                                            <MenuItem value={`${product.brand} - ${product.name}`} >{product.brand} - {product.name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <MethodPayment onChange={(methodPayment) => this.setState({...this.state, paymentMethod: methodPayment})}/>
                    <CostOfService label={'Valorização'} onChange={(event) => this.setState({...this.state, price: event.target.value})} />
                    <TextField  label={'Observação'} />
                </Box>
                </form>
                <CancelAndSaveButtons success={this.onSuccess} cancel={this.onCancel}/>
            </ModalContainer>
        )
    }
}

const mapStateToProps = state => {
    return {
        listOfCustomers: state.listCustomers,
        listOfProducts: state.listProducts,
        listOfServices: state.listServices
    }
}

const ECC = withStyles(style)(EntryCreditCard);
export default connect(mapStateToProps)(ECC);
