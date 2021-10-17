import React from 'react';
import s from './DataInputs.module.css'
import TextInput from "./TextInput/TextInput";
import {addIncomes, addOutcomes} from "../../store/inputsReducer";

const DataInputs = () => {

    return (
        <main className={s.main}>
            <section className={s.incomeValue}>
                <h3>Доходы</h3>
                <TextInput addValue={addIncomes}/>
            </section>
            <section className={s.outcomeValue}>
                <h3>Расходы</h3>
                <TextInput addValue={addOutcomes}/>
            </section>
        </main>
    );
};

export default DataInputs;