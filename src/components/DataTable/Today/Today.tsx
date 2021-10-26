import React from 'react';
import {Card} from "@material-ui/core";
import s from "../DataTable.module.css";
import {db} from "../../../database/database";
import {useLiveQuery} from "dexie-react-hooks";
import {now} from "../../../store/inputsReducer";

const Today = () => {

    const incomes = useLiveQuery(
        () => db
            .table('transactions')
            .where('type')
            .equals('income')
            .toArray()
    )
    const outcomes = useLiveQuery(
        () => db
            .table('transactions')
            .where('type')
            .equals('outcome')
            .toArray()
    )
    if (!incomes || !outcomes) return null

    const incomesSum = incomes.filter(inc => inc.addDate === now).reduce((acc, cur) => {
        return acc + cur.value
    }, 0)
    const outcomesSum = outcomes.filter(out => out.addDate === now).reduce((acc, cur) => {
        return acc + cur.value
    }, 0)
    const diff = incomesSum - outcomesSum

    return (
        <>
            <Card raised className={s.outputCard}>
                <h3 className={s.cardTitle}>
                    Всего заработано
                </h3>
                <div className={s.cardValue}>
                    {incomesSum}
                </div>
            </Card>
            <Card raised className={s.outputCard}>
                <h3 className={s.cardTitle}>
                    Всего потрачено
                </h3>
                <div className={s.cardValue}>
                    {outcomesSum}
                </div>
            </Card>
            <Card raised className={s.outputCard}>
                <h3 className={s.cardTitle}>
                    Разница
                </h3>
                <div className={s.cardValue}>
                    {diff}
                </div>
            </Card>
        </>
    );
};

export default Today;