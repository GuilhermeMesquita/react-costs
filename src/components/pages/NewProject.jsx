import React from 'react'
import styles from './NewProject.module.css'
import ProjectForm from './../project/ProjectForm';
import { useNavigate } from 'react-router-dom'


const NewProject = () => {

    const history = useNavigate();

    function createPost(project) {
        // Initialize costs and services
        project.costs = 0;
        project.service = [];

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project)
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                //redirect
                history('/projects', { state: { message: "Projeto criado com sucesso!" } });
            })
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar projeto" />
        </div>
    )
}

export default NewProject