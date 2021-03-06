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
import {deleteProduct, saveDataFromDb} from "../redux/actions";
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
import GetDataDbProvider from "../services/getDataDbProvider";
import {validationTokenProvider} from "../services/validationTokenProvider";

export const loadProductData = async (saveData, token) => {
    const allProductsFromDb = await GetDataDbProvider.loadDataProvider('product', 'get_products', token);
    await saveData('getProducts', allProductsFromDb);
    return {loaded: true}
}

const columnsProducts = ['Nome', 'Marca', 'Quantidade em estoque', 'Preço de custo', 'Preço de venda', 'Ações'];
class ProductsScreen extends Component {
    state = {
        showSnackBar: false,
        addProduct: false,
        message: '',
    };

    componentDidMount(): void {
//TODO
        // Insert conditional to handle when this.props.rememberMe is true
        // e.g send this.props.user and this.props.rememberMe to API, then
        // API genenrates the token;
        if (this.props.token) {
            validationTokenProvider(this.props.token).then((checkedToken) => {
                if (!checkedToken.isValid) {
                    this.props.history.push('/');
                    return;
                }
                loadProductData(this.props.saveData, this.props.token).then((res) => {
                    if (res.loaded) {
                        this.setState({...this.state, loading: false})
                    }
                })
            })
        } else {
            this.props.history.push('/')
        }


    }

    handleClose = () => {
        this.setState({...this.state, addProduct: false, data: null})
    }

    renderBody = () => {
        const {classes} = this.props
        return (
            <Grid container style={{height: '93.5%'}} direction={'column'} alignItems={"flex-start"}>
                <Grid item style={{height: '10%', width: '100%'}}>
                    <Typography variant={"h4"} style={{fontFamily:'nunito', color:'#5a5c69', margin: 30}}>Produtos</Typography>
                </Grid>
                <Grid item style={{height: '90%', width: '100%'}}>
                    <ThemeProvider theme={theme}>
                        <EntriesTable maxHeight={'100%'} columns={columnsProducts}>
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
            </Grid>
        )
    };
    render() {
        return this.props.loading  || this.state.loading? renderLoading() : this.renderBody();
    }
}

const mapStateToProps = state => {
    return {
        token: state.session.token,
        listOfProducts: state.listProducts,
        loading: state.loadAllData,
        rememberMe: state.session.rememberMe,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeProduct: (productId) => {
            dispatch(deleteProduct(productId))
        },
        saveData: (type, payload) => {
            dispatch(saveDataFromDb({type, payload}))
        }
    }
}
const PS = withStyles(style)(ProductsScreen);

export default connect(mapStateToProps, mapDispatchToProps)(PS)

