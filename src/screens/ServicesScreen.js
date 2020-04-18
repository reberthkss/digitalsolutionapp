import Typography from "@material-ui/core/Typography";
import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {style} from "../styles/mainStyles";
import {withStyles} from "@material-ui/styles";
import EntriesTable from "../components/entriesTable";
import Modal from '@material-ui/core/Modal'
import {connect} from 'react-redux'
import AddServiceForm from "../components/AddServiceForm";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import {removeDataDb} from "../services/removeDataDb";
import IconButton from "@material-ui/core/IconButton";
import ModalBody from "../components/ModalBody";
import {deleteService} from "../redux/actions";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';


const columnsService = ['', 'Descrição', 'Valorização'];

class ServicesScreen extends Component {
    state = {
        showSnackbar: false,
        addService: false,
    };

    handleClose = () => {
        this.setState({addService: false})
    }
    render() {
        const {classes} = this.props;
        return (
            <div>
                <Typography variant={"h4"} style={{fontFamily:'nunito', color:'#5a5c69', margin: 30}}>Serviços</Typography>
                <Grid container>
                    <Grid item xs={12}>
                        <Box display={'flex'}  style={{padding:10, marginLeft: 36}} flexDirection={'row'}>
                            <Button className={classes.SuccessButton} onClick={()=>this.setState({...this.state, addService: true})}>Cadastrar serviço</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <EntriesTable maxHeight={500} columns={columnsService}>
                            {
                               this.props.listServices ? this.props.listServices.map(service => {
                                    return (
                                        <TableRow key={service.descricao}>
                                            <TableCell>
                                                <Box display={'flex'} justifyContent={'space-around'}>
                                                    <IconButton onClick={() => {
                                                        service.type = 'update_service'
                                                        this.setState({addService: true, data: service})
                                                    }}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton onClick={ () => {
                                                        removeDataDb('remove_service', service._id)
                                                        this.props.removeService(service._id);
                                                        this.setState({...this.state, showSnackbar: true, message: 'Serviço removido com sucesso!'});
                                                    }
                                                    }>
                                                        <CloseIcon/>
                                                    </IconButton>
                                                </Box>
                                            </TableCell>
                                            <TableCell component={'th'} scope={'row'}>{service.descricao}</TableCell>
                                            <TableCell component={'th'} scope={'row'}>R$ {service.valorizacao}</TableCell>
                                        </TableRow>
                                    )
                                }) : null
                            }
                        </EntriesTable>
                    </Grid>
                </Grid>

                <Snackbar open={this.state.showSnackbar} autoHideDuration={2000} onClose={() => this.setState({...this.state, showSnackbar: false})}>
                    <MuiAlert onClose={() => this.setState({...this.state, showSnackbar: false})} variant={'filled'} severity={'success'}>
                        {this.state.message}
                    </MuiAlert>
                </Snackbar>


                <ModalBody open={this.state.addService} onClose={() => this.handleClose()}>
                    <AddServiceForm
                        data={this.state.data}
                        onSuccess={(action) => this.setState({...this.state, addService: false, showSnackbar: true, message: `serviço ${action} com sucesso!`})}
                        update={() => this.setState({addService: false})}
                        onCancel={()=>this.setState({addService: false})}/>
                </ModalBody>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        listServices: state.listServices,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        removeService: (serviceId) => {
            dispatch(deleteService(serviceId))
        }
    }
};

const SS = withStyles(style)(ServicesScreen);
export default connect(mapStateToProps, mapDispatchToProps)(SS)
