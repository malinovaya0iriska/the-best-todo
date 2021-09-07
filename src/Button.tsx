import React from 'react';

type ButtonPropsType = {
    title: string
    onClickHandler: () => void
}

export const Button = (props: ButtonPropsType) => {
    const callback = () => props.onClickHandler()
    return (
        <button onClick={callback}>{props.title}</button>
    );
};

