import React from "react";
import { Outlet, useNavigate } from 'react-router-dom'
import * as SC from "./styles";
import { Container } from "../ui/Container";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { Button } from "../ui/Button";

export const Root = () => {
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onClickExitBtn = () => {
        dispatch(logout())
        navigate('/auth')
    }

    return (
        <>
            <Container>
            <SC.Menu>
                <SC.MenuItem to={'/'}>Главная</SC.MenuItem>
                <SC.MenuItem to={'/posts'}>Список постов</SC.MenuItem>
                {user && <SC.MenuItem to={'/posts/add'}>Добавление поста</SC.MenuItem>}
                {!user && <SC.MenuItem to={'/auth'}>Авторизация</SC.MenuItem>}
                {!user && <SC.MenuItem to={'/registration'}>Регистрация</SC.MenuItem>}
                {user && <Button onClick={onClickExitBtn}>Выход</Button>}
            </SC.Menu>
            </Container>    
            <Outlet />
        </>
    )
}


