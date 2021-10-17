import React from 'react';
import s from './DataTable.module.css'
import {useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {Card, Paper} from "@material-ui/core";

const DataTable = () => {

    const incomes = useSelector<AppStateType, number>(state => state.inputsReducer.incomes)
    const outcomes = useSelector<AppStateType, number>(state => state.inputsReducer.outcomes)

    return (
        <div className={s.table}>
            <Paper elevation={8} className={s.outputs}>
                <Card raised className={s.outputCard}>
                    <h3 className={s.cardTitle}>
                        Всего заработано
                    </h3>
                    <div className={s.cardValue}>
                        {incomes}
                    </div>
                </Card>
                <Card raised className={s.outputCard}>
                    <h3 className={s.cardTitle}>
                        Всего потрачено
                    </h3>
                    <div className={s.cardValue}>
                        {outcomes}
                    </div>
                </Card>
                <Card raised className={s.outputCard}>
                    <h3 className={s.cardTitle}>
                        Разница
                    </h3>
                    <div className={s.cardValue}>
                        {incomes - outcomes}
                    </div>
                </Card>
            </Paper>
        </div>
    );
};

export default DataTable;