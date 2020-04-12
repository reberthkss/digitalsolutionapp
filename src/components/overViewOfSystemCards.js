import Grid from "@material-ui/core/Grid";
import React, {Component} from "react";
import StatOfSystemCard from "./statOfSystemCard";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWalletRounded";
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';
import MoneyOffRoundedIcon from '@material-ui/icons/MoneyOffRounded';

class OverViewOfSystemCards extends Component {
    render() {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Grid container justify={'space-around'} style={{padding:30}}>
                        <StatOfSystemCard title={'SALDO ATUAL'} textColor='#4e73df' minHeightCard={100} marginCard={5} borderLeft={'.30rem solid #4e73df'} value={40000} icon={<AttachMoneyRoundedIcon fontSize={'large'}/>}/>
                        <StatOfSystemCard title={'RESERVA ACUMULADA'} textColor='#1cc88a' minHeightCard={100} marginCard={5} borderLeft={'.30rem solid #1cc88a'} value={50000} icon={<AccountBalanceWalletIcon fontSize={'large'}/>} />
                        <StatOfSystemCard title={'INADIMPLENTES'} textColor='#36b9cc' minHeightCard={100} marginCard={5} borderLeft={'.30rem solid #36b9cc'} value={60000} icon={<MoneyOffRoundedIcon fontSize={'large'}/>}/>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default OverViewOfSystemCards
