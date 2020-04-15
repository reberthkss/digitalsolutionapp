import React, {Component} from 'react';
import 'typeface-roboto'
import 'bootstrap/dist/css/bootstrap.min.css';
import ScrollToTopButton from "./components/scrollToTopButton";
import NavBar from "./components/navBar";
import NavBarMobile from "./components/navBarMobile";
import Box from '@material-ui/core/Box'
import MainScreen from "./screens/mainScreen";
import {BrowserRouter as Router,
    Switch,
    Route,
    Link} from 'react-router-dom'
import CustomersScreen from "./screens/CustomersScreen";
import ServicesScreen from "./screens/ServicesScreen";
import ProductsScreen from "./screens/ProductsScreen";
import GetDataDbProvider from "./services/getDataDbProvider";
import {saveDataFromDb} from "./redux/actions";
import {connect} from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from "@material-ui/core/LinearProgress";

class App extends Component {
    state = {
        loading: true,
        scrollToTop: false,
        showDrawerMenu: false,
    };


    loadData = async () => {
        const allCreditsFromDb = await GetDataDbProvider.loadDataProvider('getCredit');
        await this.props.saveData('saveCreditsDebits', allCreditsFromDb);

        const allCustomersFromDb = await GetDataDbProvider.loadDataProvider('getCustomers');
        await this.props.saveData('getCustomers', allCustomersFromDb);

        const allServicesFromDb = await GetDataDbProvider.loadDataProvider('get_services');
        console.log(`ALL SERVICES => ${JSON.stringify(allServicesFromDb)}`)
        await this.props.saveData('getServices', allServicesFromDb);

        const allProductsFromDb = await GetDataDbProvider.loadDataProvider('get_products');
        await this.props.saveData('getProducts', allProductsFromDb);
    };
    componentDidMount() {
        this.loadData().then(() => {
            this.setState({...this.state, loading: false})
        })
    };

    showMenu = () => {
        this.setState({...this.state, showDrawerMenu: !this.state.showDrawerMenu})
    };

    setPage = (screen) => {
        this.setState({...this.state, screen: screen})
        console.log(`new state = ${JSON.stringify(this.state)}`)
    };

    renderLoading = () => {
        return (
              <Box display={'flex'} alignItems={'center'} justifyContent={'center'} style={{height: '100%'}}>
                    <CircularProgress />
              </Box>
        )
    }

    render() {
        window.onload = ev =>  window.innerWidth >= 769 ? this.setState({scrollToTop: this.state.scrollToTop, showDrawerMenu: true, height: '100vh'}) : this.setState({scrollToTop: this.state.scrollToTop, showDrawerMenu: true, height: 1000})
        window.onscroll = (ev => (window.scrollY >= window.innerHeight*0.7) ? this.setState({scrollToTop: true}) : this.setState({scrollToTop: false}) )
        window.onresize = ev => window.innerWidth >= 769 ? this.setState({scrollToTop: this.state.scrollToTop, showDrawerMenu: true, height: '100vh'}) : this.setState({scrollToTop: this.state.scrollToTop, showDrawerMenu: false, height: 1000})

        if (this.state.loading) {
            return (
                <Router>
                    <div id="wrapper" >
                        <Box display={'flex'}>
                            { this.state.showDrawerMenu ? <NavBarMobile height={this.state.height} setPage={this.setPage}/> : null }
                            <div style={{width:'100%'}}>
                                <NavBar menuIconClick = {this.showMenu} />
                                <Switch>
                                    <Route exact path={'/'} component={this.renderLoading} />
                                    <Route exact path={'/customers'} component={this.renderLoading} />
                                    <Route exact path={'/services'} component={this.renderLoading} />
                                    <Route exact path={'/products'} component={this.renderLoading} />
                                </Switch>
                            </div>
                            <ScrollToTopButton scrollToTop={this.state.scrollToTop} />
                        </Box>
                    </div>
                </Router>
            )
        }
        return (

            <Router>
                <div id="wrapper" >
                    <Box display={'flex'}>
                        { this.state.showDrawerMenu ? <NavBarMobile height={this.state.height} setPage={this.setPage}/> : null }
                        <div style={{width:'100%'}}>
                            <NavBar menuIconClick = {this.showMenu} />
                            <Switch>
                                <Route exact path={'/'} component={MainScreen} />
                                <Route exact path={'/customers'} component={CustomersScreen} />
                                <Route exact path={'/services'} component={ServicesScreen} />
                                <Route exact path={'/products'} component={ProductsScreen} />
                            </Switch>
                        </div>
                        <ScrollToTopButton scrollToTop={this.state.scrollToTop} />
                    </Box>
                </div>
            </Router>

        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        saveData: (type, data) => {
            dispatch(saveDataFromDb({type: type, payload: data}))
        },
    }
};


export default connect(null, mapDispatchToProps)(App)
