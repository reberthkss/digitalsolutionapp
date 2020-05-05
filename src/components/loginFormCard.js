import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import React, {useState} from "react";
import {doLoginProvider} from "../services/doLoginProvider";
import {finishLoad, markAsAuthenticated, saveDataFromDb} from "../redux/actions";
import Button from "@material-ui/core/Button";
import {indigo} from "@material-ui/core/colors";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {loadData} from "../utils/globalFunctions";

const ButtonLogin = ({onClick}) => {
    const [isDisabled, setDisabled] = useState(false);
    return (
        <Box display={'flex'}>
            <Button variant={'contained'}
                    style={{
                        background: !isDisabled ? indigo[600] : 'grey',
                        color: 'white',
                        width: '100%',
                        marginLeft: 20,
                        marginRight: 20,
                        borderRadius: 20
                    }}
                    startIcon={< ExitToAppIcon/>}
                    onClick={() => {
                        setDisabled(true);
                        onClick();
                        setTimeout(() => setDisabled(false), 3000);
                    }}
                    disabled={isDisabled}
            >
                Entrar
            </Button>
        </Box>
    )
}

const doLogin = async (user, password, history, dispatch, setSnackBar) => {

    doLoginProvider(user, password).then((res) => {
        if (!res.auth) {
            return setSnackBar(true, res.message, 'error');
        } else {
            setSnackBar(true, 'Autenticado com sucesso!', 'success')
            dispatch(markAsAuthenticated(user, res.token));
            loadData((type, payload) => dispatch(saveDataFromDb({type, payload})), res.token).then((res) => {
                if (res.loaded) {
                    dispatch(finishLoad());
                    setTimeout(() => history.push('/dashboard'), 2000);
                }
            })
        }

    }).catch(e => {
        console.error(e.message)
    })
};


export const renderLoginFormCard = (history, handleUser, handlePassword, user, password, dispatch, setSnackBar, setFormToShow) => {
    return (
        <Box>
            <Paper style={{height: 500, width: window.innerWidth <= 400 ? 350 : 400}}>
                <Box display={'flex'} flexDirection={'column'} style={{height: '100%'}} justifyContent={'center'}>
                    <Typography variant={'h4'} align={'center'}
                                style={{paddingBottom: 70, color: '#5a5c69', fontFamily: 'nunito'}}>
                        Bem - Vindo
                    </Typography>
                    <form
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                doLogin(user, password, history, dispatch, setSnackBar);
                                e.preventDefault()
                            }
                        }}>
                        <Box display={'flex'} flexDirection={'column'}
                             style={{paddingLeft: 50, paddingRight: 50, paddingTop: 5, paddingBottom: 5}}>
                            <TextField label={'Digite seu usuario'} variant={'outlined'}
                                       onChange={(event) => handleUser(event.target.value)}/>
                        </Box>
                        <Box display={'flex'} flexDirection={'column'}
                             style={{paddingLeft: 50, paddingRight: 50, paddingTop: 5, paddingBottom: 5}}>
                            <TextField label={'Digite sua senha'}
                                       type={'password'}
                                       onChange={async (event) => {
                                           const value = event.target.value
                                           handlePassword(value.toString());
                                       }}
                                       variant={'outlined'}/>
                        </Box>
                    </form>
                    < Box display={'flex'} style={{paddingLeft: 50, paddingRight: 50, paddingTop: 5, paddingBottom: 5}}>
                        <FormControlLabel control={< Checkbox checked={"todo"} name={'remember-me?'}/>}
                                          label={'Lembrar de mim?'}/>
                    </Box>
                    <Button
                        style={{margin: 20, color: indigo[500], borderRadius: 20, border: `2px solid ${indigo[500]}`}}
                        onClick={() => setFormToShow('register')}
                    >
                        Registrar
                    </Button>
                    <ButtonLogin onClick={() => {
                        doLogin(user, password, history, dispatch, setSnackBar)
                    }}/>
                </Box>
            </Paper>
        </Box>
    )
};
