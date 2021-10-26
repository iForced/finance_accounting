import React, {ChangeEvent, useState} from 'react';
import {db} from "../../../database/database";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@material-ui/core";
import {now} from "../../../store/inputsReducer";
import {useLiveQuery} from "dexie-react-hooks";
import TableValueItem from "../TableValueItem/TableValueItem";

const AllDays = () => {

    const [date, setDate] = useState<string>(now.slice(0, now.lastIndexOf('-')))
    const [tablePage, setTablePage] = useState<number>(0)
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)

    const transactions = useLiveQuery(
        () => db
            .table('transactions')
            .where('addDate').startsWith(date)
            .toArray(),
        [date])
    if (!transactions) return null

    const emptyRows = tablePage > 0 ? Math.max(0, (1 + tablePage) * rowsPerPage - transactions?.length) : 0

    const incomesSum = transactions.filter(tr => tr.type === 'income').reduce((acc, cur) => {
        return acc + cur.value
    }, 0)
    const outcomesSum = transactions.filter(tr => tr.type === 'outcome').reduce((acc, cur) => {
        return acc + cur.value
    }, 0)
    const diff = incomesSum - outcomesSum

    const onChangeTablePage = (e: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setTablePage(newPage)
    }
    const onChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(e.target.value, 10))
        setTablePage(0)
    }
    const onTransactionDelete = (id: string) => {
        db.table('transactions').delete(id)
    }
    const onSetValue = (id: string, newValue: number) => {
        db.table('transactions').update(id, {value: newValue})
    }

    return (
        <>
            <div>
                <span>Выбери месяц </span>
                <input type="month" value={date} onChange={e => setDate(e.currentTarget.value)}/>
            </div>
            <TableContainer component={Paper} style={{backgroundColor: '#3f51b545'}}>
                <Table style={{minWidth: 650}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>День (ГГГГ-ММ-ДД)</TableCell>
                            <TableCell>Доход/расход</TableCell>
                            <TableCell>Значение</TableCell>
                            <TableCell>Удалить</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/*Counting number of transactions per table page when change page*/}
                        {(rowsPerPage > 0
                                ? transactions.slice(tablePage * rowsPerPage, tablePage * rowsPerPage + rowsPerPage)
                                : transactions
                        ).map(row => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    {row.addDate}
                                </TableCell>
                                <TableCell>
                                    {row.type === 'income' ? 'Доход' : 'Расход'}
                                </TableCell>
                                <TableCell>
                                    <TableValueItem value={row.value} onSetValue={onSetValue} id={row.id}/>
                                </TableCell>
                                <TableCell>
                                    <button onClick={() => onTransactionDelete(row.id)}>X</button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {/*Add empty rows on last page for not to jump height of table*/}
                        {emptyRows > 0 && (
                            <TableRow style={{height: 53 * emptyRows}}>
                                <TableCell colSpan={6}/>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component={'div'}
                count={transactions.length}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, {label: 'All', value: -1}]}
                page={tablePage}
                onPageChange={onChangeTablePage}
                onRowsPerPageChange={onChangeRowsPerPage}
            />
            <span>Всего прибыль за месяц: {diff}</span>
        </>
    );
};

export default AllDays;