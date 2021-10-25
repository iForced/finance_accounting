import React from 'react';
import s from './DataTable.module.css'
import {Paper} from "@material-ui/core";
import {NavLink, Route} from "react-router-dom";
import Today from "./Today/Today";
import AllDays from "./AllDays/AllDays";

const DataTable = () => {

    return (
        <div className={s.table}>
            <nav>
                <NavLink to={'/'}>Сегодня</NavLink>
                <NavLink to={'/all'}>Все дни</NavLink>
            </nav>
            <Paper elevation={8} className={s.outputs}>
                <Route path={'/'} exact render={() =>
                    <Today/>}
                />
                <Route path={'/all'} render={() => <AllDays/>}/>
            </Paper>
        </div>
    );
};

export default DataTable;