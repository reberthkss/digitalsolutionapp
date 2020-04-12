import TextField from "@material-ui/core/TextField";
import React, {Component} from "react";
import moment from "moment";


export default class DateFieldComponent extends Component {
    render() {
        return (
            <TextField
                name={'date'}
                InputLabelProps={{shrink: true, required: true }}
                label={this.props.label}
                defaultValue={moment(this.props.date).format('YYYY-MM-DD')}
                type={'date'}
            />
        )
    }
}
