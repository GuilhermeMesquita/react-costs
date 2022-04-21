import React, { useEffect, useState } from 'react'
import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import Loading from '../layouts/Loading';
import Container from '../layouts/Container';
import ProjectForm from './../project/ProjectForm';
import Message from './../layouts/Message';

const Project = () => {
    const { id } = useParams();
    const [project, setProject] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((resp) => resp.json()).then((data) => setProject(data)).catch((err) => console.log(err))
    }, [id]);

    function editPost(project) {
        if (project.budget < project.cost) {
            setMessage("O orçamento não pode ser menor que o custo do projeto!");
            setMessageType("error");
            return false;
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        }).then((resp) => resp.json()).then((data) => {
            setProject(data);
            setShowProjectForm(false);
            setMessage("Projeto atualizado!");
            setMessageType("success");
        }).then((err) => console.log(err))
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }


    return (
        <>
            {project.name ? (
                <Container customClass="column">
                    {message && <Message type={messageType} msg={message} />}
                    <div className={styles.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button onClick={toggleProjectForm} className={styles.btn}>{!showProjectForm ? "Editar projeto" : "Fechar"}</button>
                        {!showProjectForm ? (
                            <div className={styles.project_info}>
                                <p><span>Categoria: </span>{project.category.name}</p>
                                <p><span>Total do Orçamento: </span>R$ {project.budget}</p>
                            </div>
                        ) : (
                            <div className={styles.project_info}>
                                <ProjectForm handleSubmit={editPost} btnText={"Salvar"} projectData={project} />
                            </div>
                        )}
                    </div>
                </Container>
            ) : (<Loading />)}
        </>
    )
}

export default Project