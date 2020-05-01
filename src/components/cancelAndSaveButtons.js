import {Button} from "@material-ui/core";
import React, {Component} from "react";
import {style} from "../styles/mainStyles";
import {withStyles} from "@material-ui/styles";

class CancelAndSaveButtons extends Component {
    render() {
        const {classes} = this.props
        return (
                <div>
                    <Button className={classes.SuccessButton} onClick={()=>this.props.success()}>Salvar</Button>
                    <Button className={classes.CancelButton} onClick={()=>this.props.cancel()}>Cancelar</Button>
                </div>
        )
    }
}
export default withStyles(style)(CancelAndSaveButtons)
