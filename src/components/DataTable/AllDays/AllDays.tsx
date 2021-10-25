import React, {useState} from 'react';
import {db} from "../../../database/database";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {now} from "../../../store/inputsReducer";
import {useLiveQuery} from "dexie-react-hooks";

const AllDays = () => {
    const [date, setDate] = useState<string>(now.slice(0, now.lastIndexOf('-')))
    const transactions = useLiveQuery(
        () => db
            .table('transactions')
            .where('addDate')
            .equals(date + now.slice(-3)).toArray(),
        [date])
    if (!transactions) return null

    const incomesSum = transactions.filter(tr => tr.type === 'income').reduce((acc, cur) => {
        return acc + cur.value
    }, 0)
    const outcomesSum = transactions.filter(tr => tr.type === 'outcome').reduce((acc, cur) => {
        return acc + cur.value
    }, 0)
    const diff = incomesSum - outcomesSum

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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map(row =>
                            <TableRow key={row.id}>
                                <TableCell>{row.addDate}</TableCell>
                                <TableCell>{row.type === 'income' ? 'Доход' : 'Расход'}</TableCell>
                                <TableCell>{row.value}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <span>Всего доход за месяц: {diff}</span>
        </>
    );
};

export default AllDays;