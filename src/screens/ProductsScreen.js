import Typography from "@material-ui/core/Typography";
import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {style} from "../styles/mainStyles";
import {withStyles} from "@material-ui/styles";
import EntriesTable from "../components/entriesTable";
import Modal from '@material-ui/core/Modal'
import AddProductForms from "../components/AddProductForms";
import {connect} from 'react-redux'
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {addProduct, deleteProduct} from "../redux/actions";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import {removeDataDb} from "../services/removeDataDb";
import ModalBody from "../components/ModalBody";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';

const columnsProducts = ['', 'Nome', 'Marca', 'Quantidade em estoque', 'Preço de custo', 'Preço de venda'];
class ProductsScreen extends Component {
    state = {
        showSnackBar: false,
        addProduct: false,
        message: '',
    };

    handleClose = () => {
        this.setState({addProduct: false})
    }

    render() {
        const {classes} = this.props
        return (
            <div>
                <Typography variant={"h4"} style={{fontFamily:'nunito', color:'#5a5c69', margin: 30}}>Produtos</Typography>
                <Grid container>
                    <Grid item xs={12}>
                        <Box display={'flex'}  style={{padding:10, marginLeft: 36}}  flexDirection={'row'}>
                            <Button className={classes.SuccessButton} onClick={()=>this.setState({addProduct: true})}>Cadastrar produto</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <EntriesTable maxHeight={500} columns={columnsProducts}>
                            {this.props.listOfProducts ? this.props.listOfProducts.map(product => {
                                return (
                                    <TableRow key={product.nome}>
                                        <TableCell component={'th'} scope={'row'}>
                                            <Box display={'flex'} justifyContent={'space-around'}>
                                                <IconButton onClick={() => {
                                                    product.type = 'update_product';
                                                    this.setState({addProduct: true, data: product})
                                                }}>
                                                    <EditIcon />
                                                </IconButton>

                                                <IconButton onClick={() => {
                                                    removeDataDb('remove_product', product._id);
                                                    this.props.removeProduct(product._id);
                                                    this.setState({...this.state,
                                                        showSnackbar: true,
                                                        message: 'Produto deletado com sucesso!',
                                                        addProduct: false})
                                                }}>
                                                    <CloseIcon />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                        <TableCell component={'th'} scope={'row'}>{product.name}</TableCell>
                                        <TableCell component={'th'} scope={'row'}>{product.brand}</TableCell>
                                        <TableCell component={'th'} scope={'row'}>{product.amount}</TableCell>
                                        <TableCell component={'th'} scope={'row'}>R$ {product.priceCost}</TableCell>
                                        <TableCell component={'th'} scope={'row'}>R$ {product.priceSell}</TableCell>
                                    </TableRow>
                                )
                            }) : null}
                        </EntriesTable>
                    </Grid>
                </Grid>

                <Snackbar open={this.state.showSnackbar} autoHideDuration={2000} onClose={() => this.setState({...this.state, showSnackbar: false})}>
                    <MuiAlert onClose={() => this.setState({...this.state, showSnackbar: false})} severity={'success'} variant={'filled'}>
                        {this.state.message}
                    </MuiAlert>
                </Snackbar>

                <ModalBody open={this.state.addProduct} onClose={this.handleClose}>
                    <AddProductForms
                        data={this.state.data}
                        onSuccess={(action) => this.setState({...this.state, showSnackbar: true, addProduct: false, message: `Produto ${action} com sucesso!`})}
                        updateState={() => this.setState({addProduct: false})}
                        onCancel={()=>this.setState({...this.state, addProduct: false})}/>
                </ModalBody>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        listOfProducts: state.listProducts,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeProduct: (productId) => {
            dispatch(deleteProduct(productId))
        }
    }
}
const PS = withStyles(style)(ProductsScreen);

export default connect(mapStateToProps, mapDispatchToProps)(PS)

