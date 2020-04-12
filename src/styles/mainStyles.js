import teal from "@material-ui/core/colors/teal";
import red from '@material-ui/core/colors/red';
export const style = {
    SuccessButton: {
        color: '#fff',
        background: teal[500],
        margin:5,
        '&:hover': {
            background:teal[300],
        }
    },
    CancelButton: {
        color: '#fff',
        background: red[500],
        margin:5,
        '&:hover':{
            background: red[300],
        }
    }
};

