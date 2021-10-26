import React from 'react';
import s from './DataTable.module.css'
import {Paper} from "@material-ui/core";
import {NavLink, Route} from "react-router-dom";
import Today from "./Today/Today";
import AllDays from "./AllDays/AllDays";

const DataTable = () => {

    return (
        <div className={s.table}>
            <nav className={s.navbar}>
                <NavLink to={'/'} exact className={s.navLink} activeClassName={s.activeLink}>Сегодня</NavLink>
                <NavLink to={'/all'} className={s.navLink} activeClassName={s.activeLink}>Все дни</NavLink>
            </nav>
            <Paper elevation={8} className={s.outputs} style={{backgroundColor: '#3f51b545'}}>
                <Route path={'/'} exact render={() => <Today/>}/>
                <Route path={'/all'} exact render={() => <AllDays/>}/>
            </Paper>
        </div>
    );
};

export default DataTable;