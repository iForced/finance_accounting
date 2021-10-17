import React from 'react';
import s from './DataTable.module.css'
import {useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {Card, Paper} from "@material-ui/core";
import {UnitType} from "../../store/inputsReducer";

const DataTable = () => {

    const incomes = useSelector<AppStateType, Array<UnitType>>(state => state.inputsReducer.incomes)
    const incomesSummary = incomes.reduce((acc, cur) => {
        return acc + cur.value
    }, 0)
    const outcomes = useSelector<AppStateType, Array<UnitType>>(state => state.inputsReducer.outcomes)
    const outcomesSummary = outcomes.reduce((acc, cur) => {
        return acc + cur.value
    }, 0)
    const difference = incomesSummary - outcomesSummary

    return (
        <div className={s.table}>
            <Paper elevation={8} className={s.outputs}>
                <Card raised className={s.outputCard}>
                    <h3 className={s.cardTitle}>
                        Всего заработано
                    </h3>
                    <div className={s.cardValue}>
                        {incomesSummary}
                    </div>
                </Card>
                <Card raised className={s.outputCard}>
                    <h3 className={s.cardTitle}>
                        Всего потрачено
                    </h3>
                    <div className={s.cardValue}>
                        {outcomesSummary}
                    </div>
                </Card>
                <Card raised className={s.outputCard}>
                    <h3 className={s.cardTitle}>
                        Разница
                    </h3>
                    <div className={s.cardValue}>
                        {difference}
                    </div>
                </Card>
            </Paper>
        </div>
    );
};

export default DataTable;