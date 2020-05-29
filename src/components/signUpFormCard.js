import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import React, {useState} from "react";
import {doLoginProvider} from "../services/doLoginProvider";
import {markAsAuthenticated} from "../redux/actions";
import Button from "@material-ui/core/Button";
import {indigo} from "@material-ui/core/colors";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {doRegisterProvider} from "../services/doRegisterProvider";


const ButtonCancel = ({onClick}) => {
    return (
        <Box display={'flex'} justifyContent={'flex-end'} style={{paddingRight: 10}}>
            <Button variant={'contained'}
                    style={{background: indigo[600] , color: 'white'}}
                    onClick={() => {
                onClick();
            }}>
                Cancelar
            </Button>
        </Box>
    )
}

const ButtonRegister = ({onClick}) => {
    const [isDisabled, setDisabled] = useState(false);
    return (
        <Box display={'flex'} justifyContent={'flex-end'} style={{paddingRight: 50}}>
            <Button variant={'contained'}
                    style={{background: !isDisabled ? indigo[600] : 'grey' , color: 'white'}}
                    startIcon={< ExitToAppIcon/>} onClick={() => {
                setDisabled(true);
                onClick();
                setTimeout(() => setDisabled(false), 3000);
            }}
                    disabled={isDisabled}
            >
                Registrar
            </Button>
        </Box>
    )
}
const doRegister = async (user, email, password, secret, setSnackBar) => {
    doRegisterProvider(user, email, password, secret).then((res) => {
        console.log(res);
        if (!res.success) {
            if (res.message) return setSnackBar(true, res.message, 'error');
           return setSnackBar(true, `Value of ${res.errors[0].param} is a ${res.errors[0].msg}`, 'error');
        } else {
            return setSnackBar(true, 'Usuario registrado com sucesso!', 'success');
        }
    }).catch(e => {
        console.error(e.message)
    })
};


export const renderSignUpForm = (handleUser, handleEmail, handlePassword, handleSecret, user, email, password, secret, setSnackBar, setFormToShow) => {
    return (
        <Box>
            <Paper elevation={0} style={{height: 500, width: 400}}>
                <Box display={'flex'} flexDirection={'column'} style={{height: '100%'}} justifyContent={'center'}>
                    <Typography variant={'h4'} align={'center'}
                                style={{paddingBottom: 70, color: '#5a5c69', fontFamily: 'nunito'}}>
                        Cadastre-se
                    </Typography>
                    <Box display={'flex'} flexDirection={'column'}
                         style={{paddingLeft: 50, paddingRight: 50, paddingTop: 5, paddingBottom: 5}}>
                        <TextField label={'Digite seu usuario'} variant={'outlined'}
                                   onChange={(event) => handleUser(event.target.value)}/>
                    </Box>
                    <Box display={'flex'} flexDirection={'column'}
                         style={{paddingLeft: 50, paddingRight: 50, paddingTop: 5, paddingBottom: 5}}>
                        <TextField
                            label={'Digite seu email'}
                            variant={'outlined'}
                            type={'email'}
                            onChange={(event) => handleEmail(event.target.value)}/>
                    </Box>
                    <Box display={'flex'} flexDirection={'column'}
                         style={{paddingLeft: 50, paddingRight: 50, paddingTop: 5, paddingBottom: 5}}>
                        <TextField label={'Digite sua senha'}
                                   type={'password'}
                                   onChange={async (event) => {
                                       const value = event.target.value;
                                       handlePassword(value);
                                   }}
                                   variant={'outlined'}/>
                    </Box>
                    <Box display={'flex'} flexDirection={'column'}
                         style={{paddingLeft: 50, paddingRight: 50, paddingTop: 5, paddingBottom: 5}}>
                        <TextField label={'Digite o passe'} type={'text'}
                                   onChange={(event) => handleSecret(event.target.value)}
                                   variant={'outlined'}/>
                    </Box>
                    <Box display={'flex'} flexDirection={'row'}  style={{marginTop: 20}} justifyContent={'flex-end'}>
                        <ButtonCancel onClick={() => {setFormToShow('login')}} />
                        <ButtonRegister
                            onClick={() => {
                                setFormToShow('login');
                                doRegister(user, email, password, secret, setSnackBar);
                            }} />
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
};
