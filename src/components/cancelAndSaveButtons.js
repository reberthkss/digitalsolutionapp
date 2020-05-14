import {Button} from "@material-ui/core";
import React, {Component} from "react";
import {style} from "../styles/mainStyles";
import {withStyles} from "@material-ui/styles";
import makeStyles from "@material-ui/styles/makeStyles";
const useStyles = makeStyles(style)
const CancelAndSaveButtons = ({success, cancel}) => {
    const classes = useStyles()
    return (
        <div>
            <Button className={classes.SuccessButton} onClick={() => success()}>Salvar</Button>
            <Button className={classes.CancelButton} onClick={() => cancel()}>Cancelar</Button>
        </div>
    )
}
export default CancelAndSaveButtons
