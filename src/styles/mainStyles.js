import teal from "@material-ui/core/colors/teal";
import red from '@material-ui/core/colors/red';
export const style = {
    SuccessButton: {
        color: '#ffffff !important',
        background: teal[500],
        '&:hover': {
            background:teal[300] + '!important',
        }
    },
    FloatEnterButton: {
        position: 'absolute',
        right: 15,
        bottom: 10,
        color: '#ffffff !important',
        background: `${teal[500]} !important`,
        margin:5,
        '&:hover': {
            background:teal[300] + '!important',
        }
    },
    FloatDebitButton: {
        position: 'absolute',
        bottom: 75,
        right: 15,
        color: '#ffffff !important',
        background: red[500] + '!important',
        margin:5,
        '&:hover':{
            background: red[300] + '!important',
        }
    },
    CancelButton: {
        color: '#ffffff !important',
        background: red[500],
        '&:hover':{
            background: red[300] + '!important',
        }
    }
};

