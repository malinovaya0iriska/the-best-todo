import React, {useState} from "react";
import TextField from "@mui/material/TextField/TextField";

type PropsType = {
    value: string
    onChange: (value: string) => void
    disabled: boolean
}

export const EditableSpan: React.FC<PropsType> = React.memo(({value, onChange, disabled}) => {
        const [title, setTitle] = useState<string>(value)
        const [editMode, setEditMode] = useState<boolean>(false)
        const onDoubleClickHandler = () => {
            !disabled && setEditMode(true)
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
                ? <TextField variant={'outlined'} type={'text'} autoFocus value={title} onChange={onChangeHandler}
                             onBlur={setViewMode}/>
                : <span onDoubleClick={onDoubleClickHandler}>{value}</span>
        )

    }
)

