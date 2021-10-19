import React from 'react';

type ButtonPropsType = {
    title: string
    onClickHandler: () => void
    style?: boolean
}

export const ButtonCustom = (props: ButtonPropsType) => {
    const callback = () => props.onClickHandler()
    return (
        <button className={props.style ? 'active-filter' : ''} onClick={callback}>{props.title}</button>
    );
};

