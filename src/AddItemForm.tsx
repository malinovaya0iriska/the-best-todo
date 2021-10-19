import React, {useState} from "react";

type PropsType = {
    addItem: (title: string) => void
}
export const AddItemForm: React.FC<PropsType> = ({addItem}) => {
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
        setError(null)
        if (e.key === 'Enter') {
            onAddTaskClickHandler()
        }
    }
    return (
        <div>
            <input className={error ? 'error' : ''}
                   onChange={onTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   value={title}
            />
            <button onClick={onAddTaskClickHandler}>+</button>

            {error && <div className={'error'}>{error}</div>}
        </div>
    );
};

