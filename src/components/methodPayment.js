import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import React, {Component} from "react";
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 48 * 4.5 + 8,
            width: 250,
        },
    },
};

export default class MethodPayment extends Component {
    state = {
        payment: this.props.paymentMethod ? this.props.paymentMethod : ''
    };

    render() {
        return (
            <div>
                <FormControl>
                    <InputLabel id={'methodPayment'}>Forma de Pagamento</InputLabel>
                    <Select
                        labelId={'methodPayment'}
                        id={'methodPaymentSelect'}
                        value={this.state.payment}
                        MenuProps={MenuProps}
                        input={<Input />}
                        onChange={event => {
                            this.setState({payment: event.target.value});
                            this.props.onChange(event.target.value);
                        }}
                        style={{width: 350}}
                    >
                        <MenuItem value={null} style={{height: 20}}></MenuItem>
                        <MenuItem value={'vista'}>A Vista</MenuItem>
                        <MenuItem value={'parcelado'}>Parcelado</MenuItem>
                    </Select>
                </FormControl>
            </div>
        )
    }
}
