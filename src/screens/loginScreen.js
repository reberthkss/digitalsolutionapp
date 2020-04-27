import React, {useState} from 'react'
import {indigo} from "@material-ui/core/colors";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Checkbox from '@material-ui/core/Checkbox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {useMediaQuery} from "react-responsive";
import {listImages} from "../utils/listImages";
import {useHistory} from 'react-router-dom'
import {doLoginProvider} from "../services/doLoginProvider";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {markAsAuthenticated} from "../redux/actions";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {renderLoginFormCard} from "../components/loginFormCard";
import {renderSignUpForm} from "../components/signUpFormCard";

const Desktop = ({children}) => {
    const isDesktop = useMediaQuery({
        minWidth: 769
    });
    return (isDesktop ? children : null)
};


const img = Math.floor(Math.random() * ((listImages.length - 1) + 1));

const renderImageCard = () => {
    return (
        <Desktop>
            <Box>
                <Paper style={{height: 500, width: 400}}>
                    <img src={listImages[img].url} style={{height: '100%', width: '100%'}}/>
                </Paper>
            </Box>
        </Desktop>
    )
}


const renderSnackBar = (open, message, severity, setSnackBar) => {
    console.log(open, message, severity);
    return (
        <Snackbar open={open} autoHideDuration={2000} onClose={() => setSnackBar(false, null, null)}>
            <MuiAlert severity={severity} variant={'filled'}
                      onClose={() => setSnackBar(false, null, null)}> {message} </MuiAlert>
        </Snackbar>
    )
}

const renderBody = (history, handleUser, handleEmail, handlePassword, handleSecret, user, email, password, secret, dispatch, setSnackBar, setFormToShow, formToShow) => {
    return (
        <Box display={'flex'} flexDirection={'row'}>
            {renderImageCard()}
            {
                formToShow === 'login' ?
                    renderLoginFormCard(history, handleUser, handlePassword, user, password, dispatch, setSnackBar, setFormToShow) :
                    renderSignUpForm(handleUser, handleEmail, handlePassword,  handleSecret, user, email, password, secret, setSnackBar, setFormToShow)
            }
        </Box>
    )
};

const LoginScreen = () => {
    const [snackBar, setSnackBar] = useState({open: false, message: null, severity: null});
    const [formToShow, setFormToShow] = useState('login');
    const history = useHistory();
    const dispatch = useDispatch();
    let [user, setUser] = useState(null);
    let [password, setPassword] = useState(null);
    let [secretPass, setSecret] = useState(null);
    let [email, setEmail] = useState(null);
    return (
        <div style={{width: '100%', height: '100vh', background: indigo['A400']}}>
            <Box display={'flex'} flexDirection={'column'} style={{height: '100%', width: '100%'}}
                 justifyContent={'center'} alignItems={'center'}>
                {renderBody(history,
                    (user) => {
                        setUser(user)
                    },
                    (email) => {
                        setEmail(email)
                    },
                    (password) => {
                        setPassword(password)
                    },
                    (secret) => {
                        setSecret(secret)
                    },
                    user,
                    email,
                    password,
                    secretPass,
                    dispatch,
                    (open, message, severity) => setSnackBar({open, message, severity}),
                    (formToShow) => setFormToShow(formToShow),
                    formToShow
                )}
                {snackBar.open && renderSnackBar(snackBar.open, snackBar.message, snackBar.severity, (open, message, severity) => setSnackBar({
                    open,
                    message,
                    severity
                }))}
                <Desktop>
                    <Box style={{width: 800}}>
                        <span>{listImages[img].about()}</span>
                    </Box>
                </Desktop>
            </Box>
        </div>
    )
}

export default LoginScreen;

