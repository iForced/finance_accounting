import React, {useEffect, useState} from 'react';
import {db, ITransaction} from "../../../database/database";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

const AllDays = () => {
    const [transactions, setTransactions] = useState<Array<ITransaction>>([])

    useEffect(() => {
        db.table('transactions').toArray().then(data => setTransactions(data))
    }, [transactions])

    return (
        <TableContainer component={Paper}>
            <Table style={{minWidth: 650}}>
                <TableHead>
                    <TableRow>
                        <TableCell>День</TableCell>
                        <TableCell>Тип операции</TableCell>
                        <TableCell>Значение</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map(row =>
                        <TableRow key={row.id}>
                            <TableCell>{row.addDate}</TableCell>
                            <TableCell>{row.type}</TableCell>
                            <TableCell>{row.value}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AllDays;