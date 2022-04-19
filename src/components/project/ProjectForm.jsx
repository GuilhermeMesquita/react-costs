import React, { useEffect, useState } from 'react'
import styles from './ProjectForm.module.css'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'


const ProjectForm = ({ btnText, handleSubmit, projectData }) => {

    const [categories, setCategories] = useState([]);
    const [project, setProjects] = useState(projectData || {});

    useEffect(() => {
        fetch('http://localhost:5000/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setCategories(data)
            })
    }, []);

    const submit = (e) => {
        e.preventDefault();
        handleSubmit(project);
    }

    const handleChange = (e) => {
        setProjects({ ...project, [e.target.name]: e.target.value });
    }
    const handleCategory = (e) => {
        setProjects({
            ...project, category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex]
            }
        });
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <div>
                <Input type="text" text="Nome do projeto" name="name" placeholder="Insira o nome do projeto" handleOnChange={handleChange} value={project.name ? project.name : ""} />
            </div>
            <div>
                <Input type="number" text="Orçamento" name="budget" placeholder="Insira o orçamento total" handleOnChange={handleChange} value={project.budget ? project.budget : ""} />
            </div>
            <div>
                <Select name="category_id" text="Selecione uma categoria" options={categories} handleOnChange={handleCategory} value={project.category ? project.category.id : ""} />
            </div>
            <div>
                <SubmitButton text={btnText} />
            </div>
        </form>
    )
}

export default ProjectForm