import React from 'react';
import {Card} from "@material-ui/core";
import s from "../DataTable.module.css";
import {ITransaction} from "../../../database/database";
import {now} from "../../../store/inputsReducer";

type PropsType = {
    incomes: Array<ITransaction>
    outcomes: Array<ITransaction>
}

const Today = (props: PropsType) => {

    const {incomes, outcomes} = props

    const incomesToday = incomes.filter(inc => inc.addDate === now)
    const outcomesToday = outcomes.filter(out => out.addDate === now)

    const incomesSummary = incomesToday.reduce((acc, cur) => {
        return acc + cur.value
    }, 0)
    const outcomesSummary = outcomesToday.reduce((acc, cur) => {
        return acc + cur.value
    }, 0)
    const difference = incomesSummary - outcomesSummary

    return (
        <div>
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
        </div>
    );
};

export default Today;