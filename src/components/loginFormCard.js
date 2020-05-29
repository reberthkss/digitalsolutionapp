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
import DigitalSolutionLogo from '../assets/digital solution logo.jpg'
import {useSelector} from "react-redux";


const ButtonLogin = ({onClick}) => {
    const [isDisabled, setDisabled] = useState(false);
    return (
        <Button variant={'contained'}
                style={{
                    background: !isDisabled ? indigo[600] : 'grey',
                    color: 'white',
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

    )
}

const doLogin = async (user, password, rememberMe, history, dispatch, setSnackBar) => {
    doLoginProvider(user, password).then((res) => {
        if (!res.auth) {
            return setSnackBar(true, res.message, 'error');
        } else {
            setSnackBar(true, 'Autenticado com sucesso!', 'success')
            dispatch(markAsAuthenticated(user, res.token, rememberMe));
            loadData((type, payload) => dispatch(saveDataFromDb({type, payload})), res.token).then((res) => {
                if (res.loaded) {
                    dispatch(finishLoad());
                    setTimeout(() => history.push('/dashboard'), 2000);
                }
            })
        }

    }).catch(e => {
        setSnackBar(false, e.message, 'error');
    })
};


export const RenderLoginFormCard = (history, handleUser, handlePassword, handleRememberMe, rememberMe, user, password, dispatch, setSnackBar, setFormToShow) => {
    return (
        <Box>
            <Paper elevation={0} style={{height: 500, width: window.innerWidth <= 400 ? 350 : 400}}>
                <Box display={'flex'} flexDirection={'column'} style={{height: '100%'}} justifyContent={'center'}>
                    <img src={DigitalSolutionLogo} alt={'digital solution'} style={{maxWidth: '85%', margin: '0 auto', padding: 5}}/>
                    <form
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                doLogin(user, password, rememberMe, history, dispatch, setSnackBar);
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
                        <FormControlLabel control={<Checkbox checked={rememberMe} onChange={handleRememberMe} style={{color: 'black'}} name={'remember-me?'}/>}
                                          label={'Lembrar de mim?'}/>
                    </Box>

                    <Box display={'flex'} flexDirection={'column'} justifyContent={'flex-end'} style={{marginLeft:50, marginRight: 50}}>
                        <ButtonLogin onClick={() => {
                            doLogin(user, password, rememberMe, history, dispatch, setSnackBar)
                        }}/>
                        <Button
                            style={{color: indigo[500], marginTop: 5, border: `2px solid ${indigo[500]}`}}
                            onClick={() => setFormToShow('register')}
                        >
                            Registrar
                        </Button>
                    </Box>

                </Box>
            </Paper>
        </Box>
    )
};
