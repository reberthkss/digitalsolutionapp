import React, {Component} from 'react'
import Typography from "@material-ui/core/Typography";
import OverViewOfSystemCards from "../components/overViewOfSystemCards";
import EntryValueButtons from "../components/entryValueButtons";
import EntriesTable from "../components/entriesTable";

class BodyComponent extends Component {
    render() {
        return (
            <div>
                <Typography variant={"h4"} style={{fontFamily:'nunito', color:'#5a5c69', margin: 30}}>Dashboard</Typography>
                <OverViewOfSystemCards/>
                <Typography variant={"h4"} style={{fontFamily:'nunito', color:'#5a5c69', margin: 30}}>Lançamentos</Typography>
                <EntryValueButtons/>
                <EntriesTable />
            </div>
        )
    }
}

export default BodyComponent
