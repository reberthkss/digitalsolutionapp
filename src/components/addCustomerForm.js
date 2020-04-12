import React, {Component} from 'react'
import {style} from "../styles/mainStyles";
import {withStyles} from '@material-ui/styles'
import ModalContainer from "./modalContainer";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import CancelAndSaveButtons from "./cancelAndSaveButtons";
import {manageDataInDb} from "../services/insertDataDb";

class AddCustomerForm extends Component {

    state = {
        type: this.props.data ? this.props.data.type : 'insertCustomer',
        name: this.props.data ? this.props.data.name : null,
        cnpj: this.props.data ? this.props.data.cnpj : null,
        formalName: this.props.data ? this.props.data.formalName : null,
        email: this.props.data ? this.props.data.email : null,
        fone: this.props.data ? this.props.data.fone : null,
        address: this.props.data ? this.props.data.address : null,
        contactPerson: this.props.data ? this.props.data.contactPerson : null,
    };

    onCancel = () =>{
        this.props.onCancel()
    };

    onSuccess = () => {
        const newCustomer = this.state;
        manageDataInDb(newCustomer);
        this.props.updateState();
    };

    render() {
        const {classes} = this.props
        return (
            <ModalContainer>
                <Typography>
                    Novo cliente
                </Typography>
                <form style={{ height:'55vh'}}>
                    <Box display={'flex'} style={{height:'55vh'}} justifyContent={'center'} flexDirection={'column'}>
                        <TextField label={'Cliente'} value={this.state.name} onChange={event => this.setState({...this.state, name: event.target.value})} />
                        <TextField label={'CNPJ'} value={this.state.cnpj} onChange={event => this.setState({...this.state, cnpj: event.target.value })}/>
                        <TextField label={'Razão Social'} value={this.state.formalName} onChange={event => this.setState({...this.state, formalName: event.target.value})}/>
                        <TextField label={'E-mail'} value={this.state.email} onChange={event => this.setState({...this.state, email: event.target.value})}/>
                        <TextField label={'Telefone'} value={this.state.fone} onChange={event => this.setState({...this.state, fone: event.target.value})} />
                        <TextField label={'Endereço'} value={this.state.address} onChange={event => this.setState({...this.state, address: event.target.value})} />
                        <TextField label={'Responsável'} value={this.state.contactPerson} onChange={event => this.setState({...this.state, contactPerson: event.target.value})} />
                        <Box selfAlign={'flex-end'} justifyContent={'flex-end'}>
                            <CancelAndSaveButtons success={this.onSuccess} cancel={this.onCancel}/>
                        </Box>
                    </Box>
                </form>
            </ModalContainer>
        )
    }
}

export default withStyles(style)(AddCustomerForm)
