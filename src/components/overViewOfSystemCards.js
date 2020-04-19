import Grid from "@material-ui/core/Grid";
import React, {Component} from "react";
import StatOfSystemCard from "./statOfSystemCard";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWalletRounded";
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';
import MoneyOffRoundedIcon from '@material-ui/icons/MoneyOffRounded';

class OverViewOfSystemCards extends Component {

    getValuePayed = (listValues) => {
        if (listValues.length === 0) return '0,00';
        return listValues.map((value) => value.price).reduce((a, b) => parseFloat(a)+parseFloat(b));
    };

    state = {
        valuePayed: this.props.data ? this.getValuePayed(this.props.data.payed) : '0,00',
        valueUnpayed: this.props.data ? this.getValuePayed(this.props.data.opened.concat(this.props.data.unpayed)) : '0,00',
    }

    render() {
        const valuePayed = this.getValuePayed(this.props.data.payed);
        const valueUnpayed = this.getValuePayed(this.props.data.opened.concat(this.props.data.unpayed));
        let isNewValue = valuePayed > this.state.valuePayed;
        if (isNewValue) this.setState({...this.state, valuePayed: valuePayed});
        isNewValue = valueUnpayed > this.state.valueUnpayed;
        if  (isNewValue) this.setState({...this.state, valueUnpayed: valueUnpayed});
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Grid container justify={'space-around'} style={{padding:30}}>
                        <StatOfSystemCard title={'SALDO ATUAL'} textColor='#4e73df' minHeightCard={100} marginCard={5} borderLeft={'.30rem solid #4e73df'} value={this.state.valuePayed} icon={<AttachMoneyRoundedIcon fontSize={'large'}/>}/>
                        <StatOfSystemCard title={'INADIMPLENTES'} textColor='#36b9cc' minHeightCard={100} marginCard={5} borderLeft={'.30rem solid #36b9cc'} value={this.state.valueUnpayed} icon={<MoneyOffRoundedIcon fontSize={'large'}/>}/>
                        <StatOfSystemCard title={'RESERVA ACUMULADA'} textColor='#1cc88a' minHeightCard={100} marginCard={5} borderLeft={'.30rem solid #1cc88a'} value={50000} icon={<AccountBalanceWalletIcon fontSize={'large'}/>} />
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default OverViewOfSystemCards
