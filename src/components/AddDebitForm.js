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
import {addValue, saveDataFromDb, updateValue} from "../redux/actions";
import {formatCurrencie} from "../utils/globalFunctions";


class AddDebitForm extends Component {

    state = {
        id: this.props.data ? this.props.data.id : null,
        type: this.props.data ? this.props.data.type : 'insertCredit',
        date: this.props.data ? this.props.data.date : moment().valueOf() ,
        selectedCustomer: this.props.data ? this.props.data.selectedCustomer : 'carteira',
        selectedService: this.props.data ? this.props.data.selectedService : null,
        selectedProduct: this.props.data ? this.props.data.selectedProduct : null,
        paymentMethod: this.props.data ? this.props.data.paymentMethod : null,
        isProduct: this.props.data ? this.props.data.isProduct : false,
        isService: this.props.data ? this.props.data.isService : false,
        price: this.props.data ? this.props.data.price : true,
        status: this.props.data ? this.props.data.status : null,
        ref: this.props.data ? this.props.data.ref : true,
    };

    onCancel = () => {
        this.props.onCancel()
    };

    onSuccess = () => {
        let newDebit = this.state;
        newDebit.price = -Math.abs(parseFloat(newDebit.price));
        manageDataInDb('values', newDebit, this.props.token).then(res => {
            newDebit.id = res;
            if (this.state.type === 'insertCredit') {
                this.props.insertData(newDebit);
                this.props.saveData({type: 'saveFilteredValues', payload: newDebit})
                this.props.onSuccess('Debito', 'adicionado');
            } else {
                this.props.updateData(newDebit);
                this.props.saveData({type:'updateFilteredValue', payload: newDebit});
                this.props.onSuccess('Debito', 'atualizado');
            }
        })


        this.props.update();

    };

    render() {
        return (
            <ModalContainer  height={this.props.height ? this.props.height : '50vh'}>
                <Box style={{height:'100%',width:'100%'}} flexDirection={'column'}>
                    <Typography>Adicionar Saída</Typography>
                    <form onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            this.onSuccess()
                            e.preventDefault()
                        }
                    }}>
                        <Box display={'flex'} style={{height: '100%'}} flexDirection='column' justifyContent={'center'}>
                            <DateFieldComponent label={'Data do Débito'} date={this.state.date} onChange={(dateMoment)=> this.setState({...this.state, date: dateMoment})}/>
                            <MethodPayment paymentMethod={this.state.paymentMethod} onChange={(methodPayment) => this.setState({...this.state, paymentMethod: methodPayment})}/>
                            <TextField  required error={!this.state.ref} value={this.state.ref === true ? null : this.state.ref} label={'Referência'} onChange={event => this.setState({...this.state, ref: event.target.value})} />
                            <CostOfService label={'Valorização'} required={true} value={this.state.price === true ? true : this.state.price} onChange={(value) => this.setState({...this.state, price: formatCurrencie(value)})} />
                        </Box>
                        <Box display='flex'  style={{paddingTop: 5, marginBottom: -20}} alignItems='flex-end'justifyContent={'flex-end'}>
                            <CancelAndSaveButtons success={this.onSuccess} cancel={this.onCancel}/>
                        </Box>
                    </form>
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
        saveData: (action) => {
            dispatch(saveDataFromDb(action))
        },
        updateData: (debit) => {
            dispatch(updateValue(debit));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddDebitForm)
