import React, { useState } from "react";
import { Container } from '../../components/ui/Container'
import { Typo } from '../../components/ui/Typo'
import { Form } from '../../components/ui/Form'
import { Field } from '../../components/ui/Field'
import { Input } from '../../components/ui/Input'
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";

const SUCCESSED_TEXT = 'Вы успешно зарегистрировались'
const FAILED_TEXT = 'Пользователь с таким email уже существует'

export const RegistrationPage = () => {
    const navigate = useNavigate()
    const [formValues, setFormValues] = useState({name: '', surname: '', email: '', password: ''})
    const disabled = !formValues.email || !formValues.password
    const [showModal, setShowModal] = useState(false)
    const [modalText, setModalText] = useState('')


    const onSubmit = (e) => {
        e.preventDefault() 

        const userId = Date.now()
        const newUser = {id: userId, ...formValues}
        try {
            const users = JSON.parse(localStorage.getItem('users'))
            if (!users) {
                localStorage.setItem('users', JSON.stringify([newUser]))
                setModalText(SUCCESSED_TEXT)
                setShowModal(true)
                return
            }

            if (users.find((user) => user.email === formValues.email)) {
                setModalText(FAILED_TEXT)
                setShowModal(true)
                return
            }

            users.push(newUser)

            localStorage.setItem('users', JSON.stringify(users))
            setModalText(SUCCESSED_TEXT)
            setShowModal(true)            

        } catch(e) {
            console.log(e)
        }
    }

    const onChange = (name, value) => {
        setFormValues({...formValues, [name]: value})
    }

    const onHandleClose = () => {
        if (modalText === SUCCESSED_TEXT) {
            navigate('/auth')

        }
        setShowModal(false)
    }

    return (
        <Container>
            {showModal && <Modal text={modalText} buttons={<Button onClick={() => onHandleClose()}>ОК</Button>}/>}
            <Typo>Страница регистрации</Typo>
            <Form onSubmit={onSubmit}>
                <Field>
                    <Input 
                    type="text"
                    name="name" 
                    value={formValues.name}
                    placeholder="Имя" 
                    onChange={(e) => onChange(e.target.name, e.target.value)}/>
                </Field>
                <Field>
                    <Input 
                    type="text"
                    name="surname" 
                    value={formValues.surname}
                    placeholder="Фамилия" 
                    onChange={(e) => onChange(e.target.name, e.target.value)}/>
                </Field>
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
                <Button type="submit" disabled={disabled}>Регистрация</Button>
            </Form>
        </Container>
    )
}

