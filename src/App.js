import React, {Component} from 'react';
import 'typeface-roboto'
import 'bootstrap/dist/css/bootstrap.min.css';
import ScrollToTopButton from "./components/scrollToTopButton";
import NavBar from "./components/navBar";
import NavBarMobile from "./components/navBarMobile";
import Box from '@material-ui/core/Box'
import MainScreen from "./screens/mainScreen";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'
import GetDataDbProvider from "./services/getDataDbProvider";
import {saveDataFromDb} from "./redux/actions";
import {connect} from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';
import LoginScreen from "./screens/loginScreen";
import CustomersScreen from "./screens/CustomersScreen";
import ServicesScreen from "./screens/ServicesScreen";
import ProductsScreen from "./screens/ProductsScreen";
import {validationTokenProvider} from './services/validationTokenProvider'

class App extends Component {
    state = {
        loading: false,
        scrollToTop: false,
        showDrawerMenu: false,
        authenticated: false,
        screen: 'loginScreen'
    };
    componentDidMount(): void {
        this.validToken().then(isValid => {
            console.log(isValid)
        })
    }

    showMenu = () => {
        this.setState({...this.state, showDrawerMenu: !this.state.showDrawerMenu})
    };

    setPage = (screen) => {
        this.setState({...this.state, screen: screen})
    };

    validToken = async () => {
        if (this.props.token) {
            const stillValid = await validationTokenProvider(this.props.token);
            console.log(stillValid);
        }
    }
    renderLoginScreen =  () => {
        return (
            <Switch>
                <Route exact path={'/'} component={LoginScreen}/>
                <Box display={'flex'}>
                    {this.state.showDrawerMenu ?
                        <NavBarMobile height={this.state.height} setPage={this.setPage}/> : null}
                    <div style={{width: '100%'}}>
                        <NavBar menuIconClick={this.showMenu} user={this.props.user}/>
                        <Route exact path={'/dashboard'} component={MainScreen}/>
                        <Route exact path={'/customers'} component={CustomersScreen}/>
                        <Route exact path={'/services'} component={ServicesScreen}/>
                        <Route exact path={'/products'} component={ProductsScreen}/>
                    </div>
                </Box>
            </Switch>
        )
    }



    render() {
        window.onload = ev => window.innerWidth >= 769 ? this.setState({
            scrollToTop: this.state.scrollToTop,
            showDrawerMenu: true,
            height: '100vh'
        }) : this.setState({scrollToTop: this.state.scrollToTop, showDrawerMenu: true, height: 1000})
        window.onscroll = (ev => (window.scrollY >= window.innerHeight * 0.7) ? this.setState({scrollToTop: true}) : this.setState({scrollToTop: false}))
        window.onresize = ev => window.innerWidth >= 769 ? this.setState({
            scrollToTop: this.state.scrollToTop,
            showDrawerMenu: true,
            height: '100vh'
        }) : this.setState({scrollToTop: this.state.scrollToTop, showDrawerMenu: false, height: 1000})

        return (
            <Router>
                {
                    !this.state.authenticated ? this.renderLoginScreen() : null
                }
            </Router>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        token: state.session.token,
        user: state.session.user
    }
}
export default connect(mapStateToProps)(App)
