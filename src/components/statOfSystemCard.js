import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import React, {Component} from "react";

class StatOfSystemCard extends Component {
    render() {
        return (
            <Grid item style={{minWidth:350, marginBottom:15}}>
                <Card  elevation={10} style={{borderLeft:this.props.borderLeft}}>
                    <CardContent>
                        <Grid container direction={'row'}  justify={'space-between'}>
                            <Grid item>
                                <Typography style={{color:this.props.textColor, fontSize:'1rem', fontWeight:700}}>{this.props.title}</Typography>
                                <Typography variant={'h5'} component={'h5'} style={{color:'#5a5c69',fontWeight:700}}>${this.props.value}</Typography>
                            </Grid>
                            <Grid item style={{marginTop:10}}>
                                {this.props.icon}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        )
    }
}

export default StatOfSystemCard
