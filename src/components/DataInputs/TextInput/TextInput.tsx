import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import s from './TextInput.module.css'
import {Button, TextField} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";
import {ActionsType} from "../../../store/inputsReducer";

type PropsType = {
    addValue: (value: number) => ActionsType
}

const TextInput = (props: PropsType) => {

    // const [error, setError] = useState<string>('')
    const [value, setValue] = useState<number>(0)
    const dispatch = useDispatch<Dispatch>()

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        Number(e.currentTarget.value) ? setValue(+e.currentTarget.value) : setValue(0)
        // setError('')
    }
    const onValueAdd = () => {
        dispatch(props.addValue(+value))
        setValue(0)
    }
    const onEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            dispatch(props.addValue(+value))
            setValue(0)
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
        </div>
    );
};

export default TextInput;