import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import React, {Component} from "react";


export default class CostOfService extends Component {
    state = {
        price: this.props.value,
    }
    render() {
        return (
            <div style={{marginTop: 20}}>
                <TextField
                    InputProps={{
                        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                    }}
                    required
                    error={!this.props.value}
                    label={this.props.label}
                    placeholder={'0,00'}
                    onChange={(event) => {
                        this.setState({
                            price: event.target.value
                        });
                        this.props.onChange(event.target.value)
                    }}
                    type={'text'}
                    style={{width: 350}}
                    value={this.state.price === true ? null : this.state.price}
                    helperText={!this.props.value ? 'Digite o Valor' : null}
                />
            </div>
        )
    }
}
