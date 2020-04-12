import IconButton from "@material-ui/core/IconButton";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import Tooltip from "@material-ui/core/Tooltip";
import React, {Component} from "react";
import {withStyles} from "@material-ui/styles";

let styles = theme => ({
    root: {
        position: 'fixed',
        right: '1rem',
        bottom: '1rem',
        width: '2.75rem',
        height: '2.75rem',
        textAlign: 'center',
        color: '#fff',
        backgroundColor: 'rgba(90,92,105,.5)',
        lineHeight: '46px',
        '&:hover': {
            backgroundColor: '#5a5c69'
        },
    },
});

class ScrollToTopButton extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div style={{display: this.props.scrollToTop ? 'block' : 'none'}}>
                <Tooltip title={'scroll-to-top'}>
                    <IconButton className={classes.root}>
                        <ArrowUpwardIcon />
                    </IconButton>
                </Tooltip>
            </div>
        )
    }
}

export default withStyles(styles)(ScrollToTopButton);
