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
import {connect} from "react-redux";
import {addValue, updateValue} from "../redux/actions";
import {formatCurrencie} from "../utils/globalFunctions";


class AddDebitForm extends Component {

    state = {
        _id: this.props.data ? this.props.data._id : null,
        type: this.props.data ? this.props.data.type : 'insertDebit',
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
        manageDataInDb('values', newDebit, this.props.token).then(res => {
            newDebit._id = res;
            if (this.state.type === 'insertDebit') {
                this.props.insertData(newDebit);
                this.props.onSuccess('adicionado');
            } else {
                this.props.updateData(newDebit);
                this.props.onSuccess('atualizado');
            }
        })


        this.props.update();

    };

    render() {
        return (
            <ModalContainer  height={this.props.height ? this.props.height : '50vh'}>
                <Box style={{height:'100%',width:'100%'}} flexDirection={'column'}>
                    <Typography>Adicionar Saída</Typography>
                    <Box display={'flex'} style={{height: '100%'}} flexDirection='column' justifyContent={'center'}>
                        <DateFieldComponent label={'Data do Débito'} date={this.state.date} onChange={(dateMoment)=> this.setState({...this.state, date: dateMoment})}/>
                        <MethodPayment paymentMethod={this.state.paymentMethod} onChange={(methodPayment) => this.setState({...this.state, paymentMethod: methodPayment})}/>
                        <TextField  value={this.state.ref}label={'Referência'} onChange={event => this.setState({...this.state, ref: event.target.value})} />
                        <CostOfService label={'Valorização'} value={this.state.price} onChange={(value) => this.setState({...this.state, price: formatCurrencie(value)})} />
                    </Box>
                 <Box display='flex'  style={{paddingTop: 5, marginBottom: -20}} alignItems='flex-end'justifyContent={'flex-end'}>
                    <CancelAndSaveButtons success={this.onSuccess} cancel={this.onCancel}/>
                 </Box>
                </Box>
            </ModalContainer>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.session.token
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        insertData: (debit) => {
            dispatch(addValue(debit));
        },
        updateData: (debit) => {
            dispatch(updateValue(debit));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddDebitForm)
