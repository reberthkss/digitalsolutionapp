import Typography from "@material-ui/core/Typography";
import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {style} from "../styles/mainStyles";
import {withStyles} from "@material-ui/styles";
import EntriesTable from "../components/entriesTable";
import AddProductForms from "../components/AddProductForms";
import {connect} from 'react-redux'
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {deleteProduct} from "../redux/actions";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import {removeDataDb} from "../services/removeDataDb";
import ModalBody from "../components/ModalBody";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import theme from "../themes/tableTheme";
import {ThemeProvider} from "@material-ui/core";
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import Fab from "@material-ui/core/Fab";
import {renderLoading} from "../utils/loading";

const columnsProducts = ['Nome', 'Marca', 'Quantidade em estoque', 'Preço de custo', 'Preço de venda', 'Ações'];
class ProductsScreen extends Component {
    state = {
        showSnackBar: false,
        addProduct: false,
        message: '',
    };

    handleClose = () => {
        this.setState({addProduct: false})
    }

    renderBody = () => {
        const {classes} = this.props
        return (
            <div>
                <Typography variant={"h4"} style={{fontFamily:'nunito', color:'#5a5c69', margin: 30}}>Produtos</Typography>
                <Grid container>
                    <Grid item xs={12}>
                        <ThemeProvider theme={theme}>
                            <EntriesTable maxHeight={565} columns={columnsProducts}>
                                {this.props.listOfProducts ? this.props.listOfProducts.map(product => {
                                    return (
                                        <TableRow key={product.nome}>
                                            <TableCell component={'th'} scope={'row'}>{product.name}</TableCell>
                                            <TableCell component={'th'} scope={'row'}>{product.brand}</TableCell>
                                            <TableCell component={'th'} scope={'row'} align={'center'}>{product.amount}</TableCell>
                                            <TableCell component={'th'} scope={'row'}>R$ {product.priceCost}</TableCell>
                                            <TableCell component={'th'} scope={'row'}>R$ {product.priceSell}</TableCell>
                                            <TableCell component={'th'} scope={'row'} style={{width: 170}}>
                                                <Box display={'flex'} justifyContent={'flex-start'}>
                                                    <IconButton onClick={() => {
                                                        product.type = 'update_product';
                                                        this.setState({addProduct: true, data: product})
                                                    }}>
                                                        <EditIcon />
                                                    </IconButton>

                                                    <IconButton onClick={() => {
                                                        removeDataDb('product', 'remove_product', product.id, this.props.token);
                                                        this.props.removeProduct(product.id);
                                                        this.setState({...this.state,
                                                            showSnackbar: true,
                                                            message: 'Produto deletado com sucesso!',
                                                            addProduct: false})
                                                    }}>
                                                        <CloseIcon />
                                                    </IconButton>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }) : null}
                            </EntriesTable>
                        </ThemeProvider>
                    </Grid>
                </Grid>

                <Fab className={classes.FloatEnterButton} onClick={()=>this.setState({addProduct: true})}>
                    <AddBoxRoundedIcon />
                </Fab>

                <Snackbar open={this.state.showSnackbar} autoHideDuration={2000} onClose={() => this.setState({...this.state, showSnackbar: false})}>
                    <MuiAlert onClose={() => this.setState({...this.state, showSnackbar: false})} severity={'success'} variant={'filled'}>
                        {this.state.message}
                    </MuiAlert>
                </Snackbar>

                <ModalBody open={this.state.addProduct} onClose={this.handleClose}>
                    <AddProductForms
                        data={this.state.data}
                        onSuccess={(action) => this.setState({...this.state, showSnackbar: true, message: `Produto ${action} com sucesso!`})}
                        update={() => this.setState({addProduct: false})}
                        onCancel={()=>this.setState({...this.state, addProduct: false})}/>
                </ModalBody>
            </div>
        )
    }
    render() {
        return this.props.loading ? renderLoading() : this.renderBody();
    }
}

const mapStateToProps = state => {
    return {
        token: state.session.token,
        listOfProducts: state.listProducts,
        loading: state.loadAllData,
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

