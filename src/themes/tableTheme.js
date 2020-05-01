import { createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
    overrides: {
        MuiTableCell: {
            root: {  //This can be referred from Material UI API documentation.
                padding: '2px 8px',
                backgroundColor: "#fff",
            },
        },
    },
});

export default theme
