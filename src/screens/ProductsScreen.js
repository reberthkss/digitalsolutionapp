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
import {addProduct} from "../redux/actions";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import {removeDataDb} from "../services/removeDataDb";
import ModalBody from "../components/ModalBody";
const columnsProducts = ['', 'Nome', 'Marca', 'Quantidade em estoque', 'Preço de custo', 'Preço de venda'];

class ProductsScreen extends Component {
    state = {
        addProduct: false,
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
                        <Box display={'flex'}  style={{padding:10}}justifyContent='flex-end' flexDirection={'row'}>
                            <Button className={classes.SuccessButton} onClick={()=>this.setState({addProduct: true})}>Cadastrar produto</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <EntriesTable columns={columnsProducts}>
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
                                                    removeDataDb('remove_product', product.id);
                                                    this.setState({addProduct: false})
                                                }}>
                                                    <CloseIcon />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                        <TableCell component={'th'} scope={'row'}>{product.name}</TableCell>
                                        <TableCell component={'th'} scope={'row'}>{product.brand}</TableCell>
                                        <TableCell component={'th'} scope={'row'}>{product.amount}</TableCell>
                                        <TableCell component={'th'} scope={'row'}>{product.priceCost}</TableCell>
                                        <TableCell component={'th'} scope={'row'}>{product.priceSell}</TableCell>
                                    </TableRow>
                                )
                            }) : null}
                        </EntriesTable>
                    </Grid>
                </Grid>

                <ModalBody open={this.state.addProduct} onClose={this.handleClose}>
                    <AddProductForms
                        data={this.state.data}
                        onSuccess={this.props.addProduct}
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

const PS = withStyles(style)(ProductsScreen);

export default connect(mapStateToProps)(PS)

