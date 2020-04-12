import Typography from "@material-ui/core/Typography";
import React, {Component} from 'react'
import ModalContainer from "./modalContainer";
import DateFieldComponent from "./dateFieldComponent";
import MethodPayment from "./methodPayment";
import TextField from "@material-ui/core/TextField";
import CostOfService from "./CostOfService";
import CancelAndSaveButtons from "./cancelAndSaveButtons";
import Box from '@material-ui/core/Box'
import moment from "moment";
import {manageDataInDb} from "../services/insertDataDb";


class AddDebitForm extends Component {

    state = {
        type: this.props.data ? this.props.data.type : 'insertCredit',
        date: this.props.data ? this.props.data.date : moment() ,
        selectedCustomer: this.props.data ? this.props.data.selectedCustomer : null,
        selectedService: this.props.data ? this.props.data.selectedService : null,
        selectedProduct: this.props.data ? this.props.data.selectedProduct : null,
        paymentMethod: this.props.data ? this.props.data.paymentMethod : null,
        isProduct: this.props.data ? this.props.data.isProduct : false,
        isService: this.props.data ? this.props.data.isService : false,
        price: this.props.data ? this.props.data.price : 0,
        status: this.props.data ? this.props.status : null,
        ref: this.props.data ? this.props.data.ref : null,
    };

    onCancel = () => {
        this.props.onCancel()
    };

    onSuccess = () => {
        const newDebit = this.state;
        manageDataInDb(newDebit);
        this.props.update();
    };

    render() {
        return (
            <ModalContainer height={'50vh'}>
                <Box style={{height:'100%',width:'100%'}} flexDirection={'column'}>
                    <Typography>Adicionar Debito</Typography>
                    <Box display={'flex'} style={{height:'50vh'}} flexDirection='column' justifyContent={'center'}>
                        <DateFieldComponent label={'Date of Debit'} date={this.state.date}/>
                        <MethodPayment onChange={(methodPayment) => this.setState({...this.state, paymentMethod: methodPayment})}/>
                        <TextField  label={'Referencia'} onChange={event => this.setState({...this.state, ref: event.target.value})} />
                        <CostOfService label={'Valorização'} price={this.state.price}onChange={(event) => this.setState({...this.state, price: event.target.value})} />
                    </Box>
                 <Box display='flex' alignItems='flex-end'justifyContent={'flex-end'}>
                    <CancelAndSaveButtons success={this.onSuccess} cancel={this.onCancel}/>
                 </Box>
                </Box>
            </ModalContainer>
        )
    }
}


export default AddDebitForm
