import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import React, {Component} from "react";

export default class CostOfService extends Component {
    render() {
        return (
            <div style={{marginTop: 20}}>
                <TextField
                    InputProps={{
                        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                    }}
                    label={this.props.label}
                    type={'number'}
                    onChange={(event) => this.props.onChange(event)}
                    style={{width: 350}}
                    value={this.props.price}
                />
            </div>
        )
    }
}
