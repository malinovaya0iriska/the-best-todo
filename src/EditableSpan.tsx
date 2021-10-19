import React, {useState} from "react";

type PropsType = {
    value: string
    onChange: (value: string) => void
}

export const EditableSpan: React.FC<PropsType> = ({value, onChange}) => {
    const [title, setTitle] = useState<string>(value)
    const [editMode, setEditMode] = useState<boolean>(false)
    const onDoubleClickHandler = () => {
        setEditMode(true)
    }
    const setViewMode = () => {
        setEditMode(false)
        onChange(title)
    }
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (

        editMode
            ? <input type={'text'} autoFocus value={title} onChange={onChangeHandler} onBlur={setViewMode}/>
            : <span onDoubleClick={onDoubleClickHandler}>{value}</span>
    )
        ;
};

