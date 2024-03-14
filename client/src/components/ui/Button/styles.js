import styled from "styled-components";

export const Button = styled.button`
    border: none;
    background: #00bcd4;
    padding:  5px 15px;
    border-radius: 10px;
    color: white;
    cursor: pointer;

    &:hover {
        background: ${({ hoverColor }) => hoverColor || '#21a6b7'};
    }

    &:disabled {
        opacity: 0.5;
        cursor: default;
    }
`