import teal from "@material-ui/core/colors/teal";
import red from '@material-ui/core/colors/red';
export const style = {
    SuccessButton: {
        color: '#ffffff !important',
        background: teal[500],
        margin:5,
        '&:hover': {
            background:teal[300] + '!important',
        }
    },
    CancelButton: {
        color: '#ffffff !important',
        background: red[500],
        margin:5,
        '&:hover':{
            background: red[300] + '!important',
        }
    }
};

