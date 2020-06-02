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
            <div style={this.props.style}>
                <FormControl style={{width: '100%'}}>
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
                        style={{width: '100%'}}
                    >
                        <MenuItem value={null} style={{height: 20}}></MenuItem>
                        <MenuItem value={'boleto'}>Boleto</MenuItem>
                        <MenuItem value={'c-credito'}>C. Crédito</MenuItem>
                        <MenuItem value={'c-debito'}>C. Débito</MenuItem>
                        <MenuItem value={'Cheque'}>Cheque</MenuItem>
                        <MenuItem value={'transferencia'}>Transferência</MenuItem>
                        <MenuItem value={'vista'}>Dinheiro</MenuItem>
                    </Select>
                </FormControl>
            </div>
        )
    }
}
