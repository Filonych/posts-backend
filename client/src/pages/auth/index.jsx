import React, { useState } from "react";
import { Container } from '../../components/ui/Container'
import { Typo } from '../../components/ui/Typo'
import { Form } from '../../components/ui/Form'
import { Field } from '../../components/ui/Field'
import { Input } from '../../components/ui/Input'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";

export const AuthPage = () => {
    const navigate = useNavigate()
    const [formValues, setFormValues] = useState({email: '', password: ''})
    const disabled = !formValues.email || !formValues.password
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault() 

        try {
            const users = JSON.parse(localStorage.getItem('users'))
            if (!users) {
                setShowModal(true)
                return
            }
    
            const currentUser = users.find((user) => user.email === formValues.email && user.password === formValues.password)
    
            if (!currentUser) {
                setShowModal(true)
                return
            }
    
            dispatch(login(currentUser))
            navigate('/')
    
        } catch(e) {
            console.log(e)
        }
    }

    const onChange = (name, value) => {
        setFormValues({...formValues, [name]: value})
    }

    

    return (
        <Container>
            {showModal && <Modal text='Данный пользователь не найден' buttons={<Button onClick={() => setShowModal(false)}>ОК</Button>}/>}
            <Typo>Страница авторизации</Typo>
            <Form onSubmit={onSubmit}> 
                <Field>
                    <Input 
                    type="email"
                    name="email" 
                    value={formValues.email}
                    placeholder="E-mail"
                    onChange={(e) => onChange(e.target.name, e.target.value)}/>
                </Field>
                <Field>
                    <Input 
                    type="password"
                    name="password" 
                    value={formValues.password}
                    placeholder="Пароль" 
                    onChange={(e) => onChange(e.target.name, e.target.value)}/>
                </Field>
                <Button type="submit" disabled={disabled}>Авторизация</Button>
            </Form>
        </Container>
    )
}