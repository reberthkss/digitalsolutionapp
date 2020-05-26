import theme from "../themes/tableTheme";
import EntriesTable from "./entriesTable";
import moment from "moment";
import TableRow from "@material-ui/core/TableRow";
import {formatCurrencie, getColorByStatus, getTextByStatus} from "../utils/globalFunctions";
import {TableCell, ThemeProvider} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import {removeDataDb} from "../services/removeDataDb";
import CloseIcon from "@material-ui/icons/Close";
import React, {useState} from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 48 * 4.5 + 8,
            width: 100,
        },
    },
};

const selectDate = (selectedDate, handleDate) => {
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return (
        <FormControl style={{maxWidth: 125}}>
            <InputLabel id={'listMonths'}>Mes</InputLabel>
            <Select
                labelId={'listMonths'}
                id={'listMonthsSelect'}
                value={selectedDate}
                onChange={event => handleDate(event.target.value)}
                input={<Input />}
                multiple
                MenuProps={MenuProps}
                renderValue={(selected) => selected.join(', ')}
                style={{width: 200}}>
                <MenuItem value={null} style={{height: 30}}>    </MenuItem>
                {
                    months.map(month => {
                        return (
                            <MenuItem key={month} value={month}>
                                <Box display={'flex'} style={{width: '100%'}} flexDirection={'row'} justifyContent={'flex-start'}>
                                    <Checkbox checked={selectedDate.indexOf(month) > -1} />
                                    <span style={{margin:2}}>{month}</span>
                                </Box>
                            </MenuItem>
                        )
                    })
                }
            </Select>
        </FormControl>
    )
}

const ColumnsEntries = (selectedDate, handleDate) => {
    return [selectDate(selectedDate, handleDate), 'Valor', 'Cliente', 'Serviço/Produto', 'Forma de pagamento', 'Status', 'Observação', 'Ações'
    ];
};


export const ValuesOfTable = ({props}: {listCreditsDebits: any, handleDeleteButtonClick: any}) => {
    const [selectedDate, setSelectedDate] = useState([moment().format('MMMM')]);
    return (
        <ThemeProvider theme={theme}>
            <EntriesTable
                columns={ColumnsEntries(
                    selectedDate,
                    (selectDate) => setSelectedDate(selectDate))
                }>
                {
                    props.listCreditsDebits ?
                        props.listCreditsDebits
                            .filter(value => selectedDate.indexOf(moment(value.date).format('MMMM')) > -1)
                            .map(value => {
                                return (
                                    <TableRow key={value.id} style={{borderLeft: `.30rem solid ${getColorByStatus(value.status)} !important`}}>
                                        <TableCell
                                            component={'th'}
                                            scope={'row'}
                                            style={{borderLeft: `.3rem solid ${getColorByStatus(value.status)}`}}
                                        >{moment(value.date).format('DD/MM/YYYY')}
                                        </TableCell>
                                        <TableCell style={{height: 'auto !important'}} component={'th'} scope={'row'}>R$ {value.price}</TableCell>
                                        <TableCell style={{height: 'auto !important'}} component={'th'} scope={'row'}>{value.selectedCustomer === 'true' || value.selectedCustomer === 'carteira' ? null : value.selectedCustomer}</TableCell>
                                        <TableCell style={{height: 'auto !important'}} component={'th'} scope={'row'}>
                                            {
                                                value.isService && value.isProduct ? `${value.selectedService} - ${value.selectedProduct}` :
                                                    value.isService ? `${value.selectedService}` :
                                                        value.isProduct ? `${value.selectedProduct}` : ''
                                            }
                                        </TableCell>
                                        <TableCell style={{height: 'auto !important'}} component={'th'} scope={'row'}>{value.paymentMethod === 'vista' ? 'A vista' : value.paymentMethod}</TableCell>
                                        <TableCell style={{height: 'auto !important'}} component={'th'} scope={'row'}>{getTextByStatus(value.status)}</TableCell>
                                        <TableCell style={{height: 'auto !important'}} component={'th'} scope={'row'}>{value.ref}</TableCell>
                                        <TableCell style={{height: 'auto !important', width:175}} component={'th'} scope={'row'}>
                                            <Box display={'flex'} flexDirection={'row'}  justifyContent={'flex-start'}>
                                                <IconButton onClick={() => this.showSelectedValue(value)}>
                                                    <EditIcon/>
                                                </IconButton>
                                                <IconButton onClick={() => props.handleDeleteButtonClick(value)}>
                                                    <CloseIcon/>
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                )
                            }) : null
                }
                <TableRow key={'totalValue'} style={{height: 10}} >
                    <TableCell/>
                    <TableCell align={"left"} colspan={4} component={'th'} scope={'row'} style={{height: 'auto !important'}}>
                        Total $ {formatCurrencie( props.listCreditsDebits.length ? props.listCreditsDebits.map((val) => val.price).reduce((a, b) => a+b) : 0)}
                    </TableCell>
                </TableRow>
            </EntriesTable>
        </ThemeProvider>
    )
}