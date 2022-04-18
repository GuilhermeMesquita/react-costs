import React from 'react'
import styles from './ProjectForm.module.css'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'


const ProjectForm = ({ btnText }) => {
    return (
        <form className={styles.form}>
            <div>
                <Input type="text" text="Nome do projeto" name="name" placeholder="Insira o nome do projeto" />
            </div>
            <div>
                <Input type="number" text="Orçamento" name="budget" placeholder="Insira o orçamento total" />
            </div>
            <div>
                <Select name="category_id" text="Selecione uma categoria" />
            </div>
            <div>
                <SubmitButton text={btnText} />
            </div>
        </form>
    )
}

export default ProjectForm