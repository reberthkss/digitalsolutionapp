import React, {Component} from "react";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";


export default class ModalBody extends Component {
    render() {
        return (
            <Modal open={this.props.open} onClose={() => this.props.onClose()}>
                <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                   <div style={{padding: 10}}>
                       {this.props.children}
                   </div>
               </div>
            </Modal>
        )
    }
}
