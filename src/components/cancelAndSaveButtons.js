import {Button} from "@material-ui/core";
import React, {Component} from "react";
import {style} from "../styles/mainStyles";
import {withStyles} from "@material-ui/styles";

class CancelAndSaveButtons extends Component {
    render() {
        const {classes} = this.props
        return (
            <div style={{float:'right', marginTop: 10}}>
                <Button className={classes.SuccessButton} onClick={()=>this.props.success()}>Save</Button>
                <Button className={classes.CancelButton} onClick={()=>this.props.cancel()}>Cancel</Button>
            </div>
        )
    }
}
export default withStyles(style)(CancelAndSaveButtons)
