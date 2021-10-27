import React, {useState} from "react";
import IconButton from "@mui/material/IconButton/IconButton";
import TextField from "@mui/material/TextField/TextField";
import {AddBox} from "@mui/icons-material/";

type PropsType = {
    addItem: (title: string) => void
}
export const AddItemForm: React.FC<PropsType> =React.memo(({addItem}) => {

    const [title, setTitle] = useState<string>('')

    const [error, setError] = useState<string | null>(null)

    const onTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onAddTaskClickHandler = () => {
        if (title.trim()) {
            addItem(title.trim())
            setTitle('')
        } else setError('Heading is required!')
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        error && setError(null)
        if (e.key === 'Enter') {
            onAddTaskClickHandler()
        }
    }
    return (
        <div>
            <TextField error={!!error}
                       variant={'outlined'}
                       className={error ? 'error' : ''}
                       onChange={onTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       value={title}
                       label={'enter you heading...'}
                       helperText={error}
            />
            <IconButton color={'primary'} size={'large'} onClick={onAddTaskClickHandler}>
                <AddBox/>
            </IconButton>
        </div>
    );
})

