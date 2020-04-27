import Grid from "@material-ui/core/Grid";
import React, {Component} from "react";
import StatOfSystemCard from "./statOfSystemCard";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWalletRounded";
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';
import MoneyOffRoundedIcon from '@material-ui/icons/MoneyOffRounded';
import {yellow, green, red, indigo} from "@material-ui/core/colors";
import {connect} from "react-redux";
import {formatCurrencie} from "../utils/globalFunctions";
import CallReceivedIcon from '@material-ui/icons/CallReceived';



class OverViewOfSystemCards extends Component {

    getValuePayed = (listValues) => {
        console.log(listValues);
        if (!listValues) return 0;
        if (listValues.length === 0) return 0;
        return listValues.map((value) => value.price).reduce((a, b) => parseFloat(a)+parseFloat(b));
    };

    render() {
        const totalValue = this.getValuePayed(this.props.listFilteredValues.payed);
        const toBank = totalValue * 0.1; // TODO -> USER WILL BE DEFINE THE %
        const valueTotalPayed = totalValue - toBank;
        const valueUnpayed = this.props.listFilteredValues.unpayed ? this.getValuePayed(this.props.listFilteredValues.unpayed) : 0;
        const valueOpened = this.props.listFilteredValues.opened ? this.getValuePayed(this.props.listFilteredValues.opened) : 0;

        return (
            <Grid container>
                <Grid item xs={12}>
                    <Grid container justify={'space-around'} style={{padding:30, paddingBottom: 10}}>
                        <StatOfSystemCard title={'SALDO ATUAL'} textColor={green['A700']} minHeightCard={100} marginCard={5} borderLeft={`.30rem solid #00c853`} value={formatCurrencie(valueTotalPayed)} icon={<AttachMoneyRoundedIcon fontSize={'large'}/>}/>
                        <StatOfSystemCard title={'EM ABERTO'} textColor={yellow[800]} minHeightCard={100} marginCard={5} borderLeft={`.30rem solid ${yellow[700]}`} value={formatCurrencie(valueOpened)} icon={<CallReceivedIcon fontSize={'large'}/>} />
                        <StatOfSystemCard title={'INADIMPLENTES'} textColor={red[500]} minHeightCard={100} marginCard={5} borderLeft={`.30rem solid ${red[500]}`} value={formatCurrencie(valueUnpayed)} icon={<MoneyOffRoundedIcon fontSize={'large'}/>}/>
                        <StatOfSystemCard title={'RESERVA ACUMULADA'} textColor={indigo[500]} minHeightCard={100} marginCard={5} borderLeft={`.30rem solid ${indigo[500]}`} value={formatCurrencie(toBank)} icon={<AccountBalanceWalletIcon fontSize={'large'}/>} />

                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        listFilteredValues: state.listFilteredValues,
    }
};

export default connect(mapStateToProps)(OverViewOfSystemCards)
