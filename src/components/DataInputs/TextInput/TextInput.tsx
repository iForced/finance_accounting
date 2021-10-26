import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import s from './TextInput.module.css'
import {Button, TextField} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";
import {ActionsType, now} from "../../../store/inputsReducer";
import {db} from "../../../database/database";
import {v1} from "uuid";

type PropsType = {
    addValue: (value: number, day: string) => ActionsType
    type: 'income' | 'outcome'
}

const TextInput = (props: PropsType) => {

    const [value, setValue] = useState<number>(0)
    const [date, setDate] = useState<string>(now)

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        Number(e.currentTarget.value) ? setValue(+e.currentTarget.value) : setValue(0)
    }
    const onValueAdd = () => {
        if (value) {
            const newItem = {id: v1(), type: props.type, value: value, addDate: date}
            db.transactions.add(newItem)
            setValue(0)
        }
    }
    const onEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onValueAdd()
        }
    }

    return (
        <div className={s.textInput}>
            <TextField
                variant='outlined'
                onChange={onValueChange}
                value={value}
                onKeyPress={onEnterPress}
            />
            <Button
                variant='contained'
                color='primary'
                onClick={onValueAdd}
            >Добавить
            </Button>
            <div className={s.datePick}>
                <h3>Выбери дату</h3>
                <input type="date" value={date} onChange={(e) => setDate(e.currentTarget.value)}/>
            </div>
        </div>
    );
};

export default TextInput;