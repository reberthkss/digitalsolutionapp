import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import React, {Component} from "react";


export default class CostOfService extends Component {
    state = {
        value: !this.props.value ? '' : this.props.value,
    };


    render() {

        return (
            <div style={{marginTop: 20}}>
                <TextField
                    InputProps={{
                        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                    }}
                    required={this.props.required}
                    error={this.props.required &&  !this.props.value && true }
                    label={this.props.label}
                    placeholder={'0,00'}
                    onChange={(event) => {
                        this.setState({
                            value: event.target.value
                        });
                        this.props.onChange(event.target.value)
                    }}
                    type={'text'}
                    style={{width: 350}}
                    value={this.state.value === true ? null : this.state.value}
                />
            </div>
        )
    }
}
