import React, {Component} from 'react'
import AppBar from "@material-ui/core/AppBar";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Box from '@material-ui/core/Box'
import DashboardIcon from '@material-ui/icons/Dashboard';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {Link} from 'react-router-dom'
import GroupIcon from '@material-ui/icons/Group';
import BuildIcon from '@material-ui/icons/Build';
import ComputerIcon from '@material-ui/icons/Computer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {doLogout} from "../redux/actions";
import {connect} from "react-redux";









class NavBarMobile extends Component {
    render() {
        return (
            <div style={{height: this.props.height, width: '6.5rem'}}>
                <AppBar style={{height: this.props.height}} position={'static'}>
                    <Box style={{height: this.props.height}} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} style={{marginBottom:50}}>
                            <Link to={'/dashboard'} onClick={()=> this.props.setPage('mainScreen')}>
                                <Box display={'flex'} justifyContent={'center'}>
                                    <DashboardIcon style={{color:'#fff'}}/>
                                </Box>
                                <span style={{padding: 1, color:'#fff'}}>Dashboard</span>
                            </Link>
                        </Box>
                        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} style={{marginBottom:50}}>
                            <Link to={'/customers'} onClick={()=> this.props.setPage('customers')}>
                                <Box display={'flex'} justifyContent={'center'}>
                                    <GroupIcon style={{color:'#fff'}}/>
                                </Box>
                                <span style={{padding: 1, color:'#fff'}}>Clientes</span>
                            </Link>
                        </Box>
                        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} style={{marginBottom:50}}>
                            <Link to={'/services'}>
                                <Box display={'flex'} justifyContent={'center'}>
                                    <BuildIcon style={{color:'#fff'}}/>
                                </Box>
                                <span style={{padding: 1, color:'#fff'}}>Serviços</span>
                            </Link>
                        </Box>
                        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} style={{marginBottom:50}}>
                            <Link to={'/products'}>
                                <Box display={'flex'} justifyContent={'center'}>
                                    <ComputerIcon style={{color:'#fff'}}/>
                                </Box>
                                <span style={{padding: 1, color:'#fff'}}>Produtos</span>
                            </Link>
                        </Box>
                        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} style={{marginBottom:50}}>
                            <Link to={'/'} onClick={() =>  {this.props.doLogout()}}>
                                <Box display={'flex'} justifyContent={'center'}>
                                    <ExitToAppIcon style={{color: '#fff'}}/>
                                </Box>
                                <span style={{padding: 1, color: '#fff'}}>Logout</span>
                            </Link>
                        </Box>
                    </Box>
                </AppBar>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        doLogout: () => {
            dispatch(doLogout())
        }
    }
}

export default connect(null, mapDispatchToProps)(NavBarMobile)
