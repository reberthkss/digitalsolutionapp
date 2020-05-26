import React, {Component} from 'react'
import Box from '@material-ui/core/Box'
import Button from "@material-ui/core/Button";
import {style} from '../styles/mainStyles'
import {withStyles} from '@material-ui/styles'
import AddCreditForm from "./AddCreditForm";
import AddDebitForm from "./AddDebitForm";
import ModalBody from "./ModalBody";
import Fab from "@material-ui/core/Fab";
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import IndeterminateCheckBoxRoundedIcon from '@material-ui/icons/IndeterminateCheckBoxRounded';

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
            <Box display={'flex'} flexDirection={'column'}>
                <Fab onClick={()=> this.setState({...this.state, showNewCredit: true})} className={classes.FloatEnterButton} >
                    <AddBoxRoundedIcon />
                    </Fab>
                <Fab onClick={()=>this.setState({...this.state, showNewDebit: true})} className={classes.FloatDebitButton} >
                    <IndeterminateCheckBoxRoundedIcon/>
                    </Fab>

                <ModalBody open={this.state.showNewCredit} onClose={this.handleCloseCredit}>
                    <AddCreditForm height={'50vh'} onSuccess={(actionType, action) => this.props.onSuccess(actionType, action)} update={() => this.setState({...this.state, showNewCredit: false})} onCancel={()=>this.setState({...this.state, showNewCredit: false})}/>
                </ModalBody>

                <ModalBody open={this.state.showNewDebit} onClose={this.handleCloseDebit}>
                    <AddDebitForm height={'35vh'} onSuccess={(actionType, action) => this.props.onSuccess(actionType, action)} update={() => this.setState({...this.state, showNewDebit: false})} onCancel={()=>this.setState({...this.state, showNewDebit: false})}/>
                </ModalBody>
            </Box>

        )
    }
}

export default withStyles(style)(EntryValueButtons);
