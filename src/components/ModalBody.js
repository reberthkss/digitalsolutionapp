import React, {Component} from "react";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";


export default class ModalBody extends Component {
    render() {
        return (
            <Modal open={this.props.open} onClose={()=>this.props.onClose()} >
                <Box display={'flex'} justifyContent={'center'}>
                    <div style={{position:'absolute',top:'8.5%',bottom:'25%'}}>
                        <div style={{padding:10}}>
                            {this.props.children}
                        </div>
                    </div>
                </Box>
            </Modal>
        )
    }
}
