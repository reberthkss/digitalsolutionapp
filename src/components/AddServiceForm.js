import React, {Component} from 'react'
import {withStyles} from "@material-ui/styles";
import {style} from "../styles/mainStyles";
import Typography from "@material-ui/core/Typography";
import ModalContainer from "./modalContainer";
import {TextField} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CancelAndSaveButtons from "./cancelAndSaveButtons";
import CostOfService from "./CostOfService";
import {manageDataInDb} from "../services/insertDataDb";
class AddServiceForm extends Component {
    state = {
        type: this.props.data ? this.props.data.type : 'insert_service',
        id: this.props.data ? this.props.data.id : null,
        descricao: this.props.data ? this.props.data.descricao : null,
        valorizacao: this.props.data ? this.props.data.valorizacao : null,
    };

    onCancel = ()=> {
        this.props.onCancel()
    };

    onSuccess = () => {
        const newService = this.state
        manageDataInDb(newService)
        this.props.update();
    };

    render() {
        return (
            <ModalContainer height={'30vh'}>
                <Typography>
                    Novo serviço
                </Typography>
                <Box display={'flex'} flexDirection={'column'}>
                    <Box display={'flex'} flexDirection={'column'}>
                        <TextField label={'Descrição'} value={this.state.descricao} onChange={event => this.setState({...this.state, descricao: event.target.value})}/>
                        <CostOfService label={'Valorização'} price={this.state.valorizacao} onChange={event => this.setState({...this.state, valorizacao: event.target.value})}/>
                    </Box>
                    <Box display={'flex'} justifyContent={'flex-end'}>
                        <CancelAndSaveButtons success={this.onSuccess} cancel={this.onCancel}/>
                    </Box>
                </Box>
            </ModalContainer>
        )
    }
}

export default withStyles(style)(AddServiceForm)
