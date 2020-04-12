import React, {Component} from 'react'
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";

export default class ModalContainer extends Component {
    render() {
        return (
            <Card style={{minHeight:this.props.height ? this.props.height : '65vh', minWidth:'50vh'}}>
                <CardContent>
                    {this.props.children}
                </CardContent>
            </Card>
        )
    }
}
