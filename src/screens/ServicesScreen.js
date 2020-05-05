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
import {deleteService, saveDataFromDb} from "../redux/actions";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import Fab from "@material-ui/core/Fab";
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import theme from "../themes/tableTheme";
import {ThemeProvider} from "@material-ui/core";
import {renderLoading} from "../utils/loading";
import GetDataDbProvider from "../services/getDataDbProvider";
import {validationTokenProvider} from "../services/validationTokenProvider";

const columnsService = ['Descrição', 'Valorização', 'Ações'];
export const loadServiceData = async (saveData, token) => {
    const allServicesFromDb = await GetDataDbProvider.loadDataProvider('services', 'get_services', token);
    await saveData('getServices', allServicesFromDb);
    return {loaded: true}
};

class ServicesScreen extends Component {
    state = {
        showSnackbar: false,
        addService: false,
        loading: true,
    };

    componentDidMount(): void {
        if (this.props.token) {
            validationTokenProvider(this.props.token).then((checkedToken) => {
                if (!checkedToken.isValid) {
                    this.props.history.push('/');
                    return;
                }
                loadServiceData(this.props.saveData, this.props.token).then((res) => {
                    if (res.loaded) {
                        this.setState({...this.state, loading: false});
                    }
                })
            })
        } else {
            this.props.history.push('/');
        }

    }

    handleClose = () => {
        this.setState({...this.state, addService: false, data: null})
    }

    renderBody = () => {
        const {classes} = this.props;
        return (
            <div>
                <Typography variant={"h4"} style={{fontFamily:'nunito', color:'#5a5c69', margin: 30}}>Serviços</Typography>
                <Grid container>
                    <Grid item xs={12}>
                        <ThemeProvider theme={theme}>
                            <EntriesTable maxHeight={565} columns={columnsService}>
                                {
                                    this.props.listServices ? this.props.listServices.map(service => {
                                        return (
                                            <TableRow key={service.descricao}>
                                                <TableCell component={'th'} scope={'row'}>{service.descricao}</TableCell>
                                                <TableCell component={'th'} scope={'row'}>R$ {service.valorizacao}</TableCell>
                                                <TableCell style={{width: 170}}>
                                                    <Box display={'flex'} justifyContent={'flex-start'}>
                                                        <IconButton onClick={() => {
                                                            service.type = 'update_service'
                                                            this.setState({addService: true, data: service})
                                                        }}>
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton onClick={ () => {
                                                            removeDataDb('services', 'remove_service', service._id, this.props.token)
                                                            this.props.removeService(service.id);
                                                            this.setState({...this.state, showSnackbar: true, message: 'Serviço removido com sucesso!'});
                                                        }
                                                        }>
                                                            <CloseIcon/>
                                                        </IconButton>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }) : null
                                }
                            </EntriesTable>
                        </ThemeProvider>
                    </Grid>
                </Grid>

                <Fab className={classes.FloatEnterButton} onClick={()=>this.setState({...this.state, addService: true})}>
                    <AddBoxRoundedIcon />
                </Fab>
                <Snackbar open={this.state.showSnackbar} autoHideDuration={2000} onClose={() => this.setState({...this.state, showSnackbar: false})}>
                    <MuiAlert onClose={() => this.setState({...this.state, showSnackbar: false})} variant={'filled'} severity={'success'}>
                        {this.state.message}
                    </MuiAlert>
                </Snackbar>


                <ModalBody open={this.state.addService} onClose={() => this.handleClose()}>
                    <AddServiceForm
                        data={this.state.data}
                        onSuccess={(action) => this.setState({...this.state, showSnackbar: true, message: `serviço ${action} com sucesso!`})}
                        update={() => this.setState({addService: false})}
                        onCancel={()=>this.setState({addService: false})}/>
                </ModalBody>
            </div>
        )
    }
    render() {
        return this.props.loading || this.state.loading ? renderLoading() : this.renderBody();
    }
}


const mapStateToProps = state => {
    return {
        token: state.session.token,
        listServices: state.listServices,
        loading: state.loadAllData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        removeService: (serviceId) => {
            dispatch(deleteService(serviceId))
        },
        saveData: (type, payload) => {
            dispatch(saveDataFromDb({type, payload}))
        }
    }
};

const SS = withStyles(style)(ServicesScreen);
export default connect(mapStateToProps, mapDispatchToProps)(SS)
