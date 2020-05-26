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
import {addService, updateService} from "../redux/actions";
import {connect} from "react-redux";
import {formatCurrencie} from "../utils/globalFunctions";
class AddServiceForm extends Component {
    state = {
        id: this.props.data ? this.props.data.id : null,
        type: this.props.data ? this.props.data.type : 'insert_service',
        descricao: this.props.data ? this.props.data.descricao : true,
        valorizacao: this.props.data ? this.props.data.valorizacao : true,
    };

    onCancel = ()=> {
        this.props.onCancel()
    };

    onSuccess = () => {
        const newService = this.state
        if (this.state.descricao === null || this.state.descricao === true) {
            this.setState({...this.state, descricao: null})
            return
        }
        manageDataInDb('services', newService, this.props.token).then((id) => {
            newService.id = id;
            if (this.state.type === 'insert_service') {
                this.props.onSuccess('adicionado');
                this.props.insertData(newService);
            } else {
                this.props.updateData(newService);
                this.props.onSuccess('atualizado');
            }
        })
        this.props.update();
    };

    render() {
        return (
            <ModalContainer height={'30vh'}>
                <Typography>
                    Novo serviço
                </Typography>
                <form
                    onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        this.onSuccess()
                        e.preventDefault()
                    }
                }}>
                    <Box display={'flex'} flexDirection={'column'} style={{paddingBottom: 20, paddingRight: 20}}>
                        <Box display={'flex'} flexDirection={'column'}>
                            <TextField
                                fullWidth
                                label={'Descrição'}
                                error={!this.state.descricao}
                                value={this.state.descricao === true ? null : this.state.descricao}
                                onChange={event => this.setState({...this.state, descricao: event.target.value})}
                                helperText={this.state.descricao ? null : 'Digite o nome do serviço'}
                            />
                            <CostOfService label={'Valorização'} value={this.state.valorizacao} onChange={value => this.setState({...this.state, valorizacao: formatCurrencie(value)})} style={{width: '100%'}}/>
                        </Box>
                    </Box>
                    <Box display={'flex'} style={{height: '7vh'}} alignItems={'flex-end'} justifyContent={'flex-end'}>
                        <CancelAndSaveButtons success={this.onSuccess} cancel={this.onCancel}/>
                    </Box>
                </form>
            </ModalContainer>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.session.token,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        insertData: (service) => {
            dispatch(addService(service))
        },
        updateData: (service) => {
            dispatch(updateService(service))
        }
    }
}
const ASF = withStyles(style)(AddServiceForm);
export default connect(mapStateToProps, mapDispatchToProps)(ASF)
