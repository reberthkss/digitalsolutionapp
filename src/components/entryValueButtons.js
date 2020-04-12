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
            <Box display={'flex'} flexDirection={'row'} justifyContent={'flex-end'}>
                <Button onClick={()=>this.setState({...this.state, showNewCredit: true})} className={classes.SuccessButton}>Entry service</Button>
                <Button onClick={()=>this.setState({...this.state, showNewDebit: true})} className={classes.CancelButton}>Entry cost of service</Button>

                <ModalBody open={this.state.showNewCredit} onClose={this.handleCloseCredit}>
                    <AddCreditForm update={() => this.setState({...this.state, showNewCredit: false})} onCancel={()=>this.setState({...this.state, showNewCredit: false})}/>
                </ModalBody>

                <ModalBody open={this.state.showNewDebit} onClose={this.handleCloseDebit}>
                    <AddDebitForm update={() => this.setState({...this.state, showNewDebit: false})} onCancel={()=>this.setState({...this.state, showNewDebit: false})}/>
                </ModalBody>
            </Box>

        )
    }
}

export default withStyles(style)(EntryValueButtons);
