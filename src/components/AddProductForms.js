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
import {addProduct, updateProduct} from "../redux/actions";
import {connect} from "react-redux";
import {formatCurrencie} from "../utils/globalFunctions";

class AddProductForms extends Component {

    state = {
        id: this.props.data ? this.props.data.id : null,
        type: this.props.data ? this.props.data.type : 'insert_product',
        name: this.props.data ? this.props.data.name : true,
        brand: this.props.data ? this.props.data.brand : true,
        amount: this.props.data ? this.props.data.amount : null,
        priceCost: this.props.data ? this.props.data.priceCost : null,
        priceSell: this.props.data ? this.props.data.priceSell : null,
    };

    onCancel = () => {
        this.props.onCancel()
    };

    onSuccess = () => {
        const newProduct = this.state;
        manageDataInDb('product', newProduct, this.props.token).then(id => {
            newProduct.id = id;
            if (this.state.type === 'insert_product') {
                this.props.onSuccess('adicionado');
                this.props.insertData(newProduct);
            } else {
                this.props.onSuccess('atualizado');
                this.props.updateData(newProduct)
            }
        })

        this.props.update()
    };

    render() {
        return (
            <ModalContainer height={'55vh'}>
                <Typography>
                    Novo Produto
                </Typography>
                <form style={{height: '40vh'}} onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        this.onSuccess()
                        e.preventDefault()
                    }
                }}>
                    <Box style={{height: '40vh'}} display={'flex'} flexDirection={'column'}>
                        <Box display={'flex'} flexDirection={'column'} style={{height: '40vh'}}
                             justifyContent={'center'}>
                            <TextField
                                required
                                error={!this.state.name}
                                label={'Nome'}
                                value={this.state.name}
                                onChange={event => this.setState({...this.state, name: event.target.value})}/>
                            <TextField
                                required
                                error={!this.state.brand}
                                label={'Marca'}
                                value={this.state.brand}
                                onChange={event => this.setState({...this.state, brand: event.target.value})}/>
                            <TextField label={'Quantidade'} value={this.state.amount} type={'number'}
                                       onChange={event => this.setState({...this.state, amount: !event.target.value ? '0' : event.target.value })}/>
                            <CostOfService label={'Preço de custo'} value={this.state.priceCost}
                                           onChange={(value) => this.setState({
                                               ...this.state,
                                               priceCost: formatCurrencie(value)
                                           })}/>
                            <CostOfService label={'Preço de venda'} value={this.state.priceSell}
                                           onChange={(value) => this.setState({
                                               ...this.state,
                                               priceSell: formatCurrencie(value)
                                           })}/>
                        </Box>
                    </Box>
                    <Box display={'flex'} alignItems={'flex-end'} justifyContent={'flex-end'} style={{marginTop: 5}}>
                        <CancelAndSaveButtons success={this.onSuccess} cancel={this.onCancel}/>
                    </Box>
                </form>
            </ModalContainer>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.session.token,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        insertData: (product) => {
            dispatch(addProduct(product))
        },
        updateData: (product) => {
            dispatch(updateProduct(product))
        }

    }
}

const APF = withStyles(style)(AddProductForms);
export default connect(mapStateToProps, mapDispatchToProps)(APF)
