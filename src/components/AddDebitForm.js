import Typography from "@material-ui/core/Typography";
import React, {Component} from 'react'
import ModalContainer from "./modalContainer";
import DateFieldComponent from "./dateFieldComponent";
import MethodPayment from "./methodPayment";
import TextField from "@material-ui/core/TextField";
import CostOfService from "./CostOfService";
import CancelAndSaveButtons from "./cancelAndSaveButtons";
import Box from '@material-ui/core/Box'


class EntryDebitValueCard extends Component {
    onCancel = () => {
        this.props.onCancel()
    }
    render() {
        return (
            <ModalContainer>
                <Box style={{height:'100%',width:'100%'}} flexDirection={'column'}>
                    <Typography>Adicionar Debito</Typography>
                    <Box display={'flex'} style={{height:'50vh'}} flexDirection='column' justifyContent={'center'}>
                        <DateFieldComponent label={'Date of Debit'}/>
                        <MethodPayment />
                        <TextField label={'Referencia'}/>
                        <CostOfService label={'Valorização'} />
                    </Box>
                 <Box display='flex' alignItems='flex-end'justifyContent={'flex-end'}>
                    <CancelAndSaveButtons cancel={this.onCancel}/>
                 </Box>
                </Box>
            </ModalContainer>
        )
    }
}


export default EntryDebitValueCard
