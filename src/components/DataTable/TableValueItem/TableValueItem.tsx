import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
    value: number
    id: string
    onSetValue: (id: string, newValue: number) => void
}

const TableValueItem = (props: PropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [value, setValue] = useState<number>(props.value)

    const onEditOn = () => {
        setEditMode(true)
    }
    const onEditOff = () => {
        props.onSetValue(props.id, value)
        setEditMode(false)
    }
    const onValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(+e.currentTarget.value)
    }
    const onEnterPress = (e: KeyboardEvent) => {
        e.key === 'Enter' && onEditOff()
    }

    return (
        <div>
            {editMode
                ? <input
                    type="text"
                    value={value}
                    onChange={onValueChangeHandler}
                    onBlur={onEditOff}
                    onKeyPress={onEnterPress}
                    autoFocus
                />
                : <span onDoubleClick={onEditOn}>{value}</span>
            }
        </div>
    );
};

export default TableValueItem;