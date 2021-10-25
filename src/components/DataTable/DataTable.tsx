import React from 'react';
import s from './DataTable.module.css'
import {useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {Card, Paper} from "@material-ui/core";
import moment from "moment";
import {ITransaction} from "../../database/database";
import {NavLink, Route} from "react-router-dom";
import Today from "./Today/Today";
import AllDays from "./AllDays/AllDays";

const DataTable = () => {

    const incomes = useSelector<AppStateType, Array<ITransaction>>(state => state.inputsReducer.transactions
        .filter(tr => tr.type === 'income'))
    const outcomes = useSelector<AppStateType, Array<ITransaction>>(state => state.inputsReducer.transactions
        .filter(tr => tr.type === 'outcome'))


    return (
        <div className={s.table}>
            <nav>
                <NavLink to={'/'}>Сегодня</NavLink>
                <NavLink to={'/all'}>Все дни</NavLink>
            </nav>
            <Paper elevation={8} className={s.outputs}>
                <Route path={'/'} exact render={() =>
                    <Today
                        incomes={incomes}
                        outcomes={outcomes}
                    />}
                />
                <Route path={'/all'} render={() => <AllDays/>}/>
            </Paper>
        </div>
    );
};

export default DataTable;