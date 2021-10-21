import React from 'react';
import s from './DataTable.module.css'
import {useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {Card, Paper} from "@material-ui/core";
import moment from "moment";
// import {UnitType} from "../../store/inputsReducer";

const DataTable = () => {
    const now = moment().format('DD MM YYYY')

    const incomes = useSelector<AppStateType, Array<number>>(state => state.inputsReducer[now].incomes)
    const incomesSummary = incomes.reduce((acc, cur) => {
        return acc + cur
    }, 0)
    const outcomes = useSelector<AppStateType, Array<number>>(state => state.inputsReducer[now].outcomes)
    const outcomesSummary = outcomes.reduce((acc, cur) => {
        return acc + cur
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