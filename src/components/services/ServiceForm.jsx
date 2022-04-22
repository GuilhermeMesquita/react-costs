import React, { useState } from 'react'
import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'
import styles from '../project/ProjectForm.module.css'

const ServiceForm = ({ handleSubmit, btnText, projectData }) => {

    const [service, setService] = useState({});

    function submit(e) {
        e.preventDefault();
        projectData.service.push(service);
        handleSubmit(projectData);
    }
    function handleChange(e) {
        setService({ ...service, [e.target.name]: e.target.value });
    }

    return (
        <form onSubmit={submit} className={styles.form}>

            <Input
                type="text"
                text="Nome do serviço"
                name="name"
                placeholder="Insira o nome do serviço"
                handleOnChange={handleChange}
            ></Input>
            <Input
                type="text"
                text="Custo do serviço"
                name="cost"
                placeholder="Insira o valor total"
                handleOnChange={handleChange}
            ></Input>
            <Input
                type="text"
                text="Descrição do serviço"
                name="description"
                placeholder="Descreva o serviço"
                handleOnChange={handleChange}
            ></Input>

            <SubmitButton text={btnText}></SubmitButton>

        </form>
    )
}

export default ServiceForm