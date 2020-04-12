import React, {Component} from 'react'
import {withStyles} from "@material-ui/styles";
import {style} from "../styles/mainStyles";
import ModalContainer from "./modalContainer";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {TextField} from "@material-ui/core";
import CostOfService from "./CostOfService";
import CancelAndSaveButtons from "./cancelAndSaveButtons";
import {manageDataInDb} from "../services/insertDataDb";

class AddProductForms extends Component {

    state = {
        type: this.props.data ? this.props.data.type : 'insert_product',
        name: this.props.data ? this.props.data.name : null,
        brand: this.props.data ? this.props.data.brand : null,
        amount: this.props.data ? this.props.data.amount : null,
        priceCost: this.props.data ? this.props.data.priceCost : null,
        priceSell: this.props.data ? this.props.data.priceSell : null,
    };

    onCancel = () =>{
        this.props.onCancel()
    };

    onSuccess = () => {
        const newProduct = this.state;
        manageDataInDb(newProduct);
        this.props.updateState();
    };

    render() {
        return (
            <ModalContainer>
                <Typography>
                    Novo produto
                </Typography>
                <form style={{height:'55vh'}}>
                    <Box  style={{height:'55vh'}}display={'flex'} flexDirection={'column'}>
                        <Box display={'flex'} flexDirection={'column'} style={{height:'50vh'}} justifyContent={'center'}>
                            <TextField label={'Name'} value={this.state.name} onChange={event => this.setState({...this.state, name: event.target.value})}/>
                            <TextField label={'Marca'} value={this.state.brand} onChange={event => this.setState({...this.state, brand: event.target.value})}/>
                            <TextField label={'Quantidade'} value={this.state.amount} type={'number'} onChange={event => this.setState({...this.state, amount: event.target.value})}/>
                            <CostOfService label={'Preço de custo'} price={this.state.priceCost} onChange={(event) => this.setState({...this.state, priceCost: event.target.value})}/>
                            <CostOfService label={'Preço de venda'} price={this.state.priceSell} onChange={(event) => this.setState({...this.state, priceSell: event.target.value})}/>
                        </Box>
                        <Box display={'flex'} alignItems={'flex-end'} justifyContent={'flex-end'}>
                            <CancelAndSaveButtons success={this.onSuccess} cancel={this.onCancel} />
                        </Box>
                    </Box>
                </form>
            </ModalContainer>
        )
    }
}

export default withStyles(style)(AddProductForms);
