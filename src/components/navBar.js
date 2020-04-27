import React, {Component} from 'react'
import {withStyles} from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar';
import { useMediaQuery } from 'react-responsive'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Box  from '@material-ui/core/Box'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

const style = {
    root: {
        height: '4.375rem'
    }
}

const Mobile = ({children}) =>{
    const isMobile = useMediaQuery({maxWidth: 768})
    return (isMobile ? children : null)
};
const Desktop = ({children}) => {
    const isDesktop = useMediaQuery({minWidth:769})
    return (isDesktop ? children : null)
};
class NavBar extends Component {
    render() {
        const {classes} = this.props
        return (
            <div style={{ width: '100%' }}>
                <AppBar position={'static'} style={{backgroundColor:'white'}}>
                    <Mobile>
                       <Box display={'flex'} flexDirection={'row'}>
                          <Box flexGrow={1} m={1}>
                             <IconButton onClick={() => this.props.menuIconClick()} edge={'start'} aria-label={'menu'}>
                                <MenuIcon style={{color:'#224abe'}}/>
                             </IconButton>
                          </Box>
                          <Box m={1}>
                              <Avatar>{this.props.user.substring(0,2)}</Avatar>
                          </Box>
                       </Box>
                    </Mobile>
                    <Desktop>
                        <Box display={'flex'} flexDirection={'row'} justifyContent={'flex-end'}>
                            <Box m={1.5}>
                                <div style={{height:'80%', borderLeft: '1px solid #e3e6f0', color:'rgba(0,0,0,0)'}}> | </div>
                            </Box>
                            <Box m={1.5}>
                                <span style={{color:'red'}}>{this.props.user}</span>
                            </Box>
                            <Box m={1}>
                                <Avatar>{this.props.user.substring(0,2)}</Avatar>
                            </Box>
                        </Box>
                    </Desktop>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(style)(NavBar)
