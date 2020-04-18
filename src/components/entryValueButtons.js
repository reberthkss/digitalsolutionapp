import React, {Component} from 'react'
import Box from '@material-ui/core/Box'
import Button from "@material-ui/core/Button";
import {style} from '../styles/mainStyles'
import {withStyles} from '@material-ui/styles'
import Modal from '@material-ui/core/Modal';
import AddCreditForm from "./AddCreditForm";
import AddDebitForm from "./AddDebitForm";
import ModalBody from "./ModalBody";

class EntryValueButtons extends Component {
    state = {
        showNewCredit: false,
        showNewDebit: false
    };

    handleCloseCredit = ()=> this.setState( {...this.state, showNewCredit: false});
    handleCloseDebit = () => this.setState({...this.state, showNewDebit: false});

    render() {
        let {classes} = this.props;
        return (
            <Box display={'flex'} flexDirection={'row'} style={{marginLeft: 36, marginBottom: 20}}>
                <Button onClick={()=>this.setState({...this.state, showNewCredit: true})} className={classes.SuccessButton}>Entrada</Button>
                <Button onClick={()=>this.setState({...this.state, showNewDebit: true})} className={classes.CancelButton}>Saída</Button>

                <ModalBody open={this.state.showNewCredit} onClose={this.handleCloseCredit}>
                    <AddCreditForm onSuccess={(actionType, action) => this.props.onSuccess(actionType, action)} update={() => this.setState({...this.state, showNewCredit: false})} onCancel={()=>this.setState({...this.state, showNewCredit: false})}/>
                </ModalBody>

                <ModalBody open={this.state.showNewDebit} onClose={this.handleCloseDebit}>
                    <AddDebitForm onSuccess={(action) => this.props.onSuccess('Debito', action)} update={() => this.setState({...this.state, showNewDebit: false})} onCancel={()=>this.setState({...this.state, showNewDebit: false})}/>
                </ModalBody>
            </Box>

        )
    }
}

export default withStyles(style)(EntryValueButtons);
