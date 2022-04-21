import React, { useEffect, useState } from 'react'
import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import Loading from '../layouts/Loading';
import Container from '../layouts/Container';

const Project = () => {
    const { id } = useParams();
    const [project, setProject] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((resp) => resp.json()).then((data) => setProject(data)).catch((err) => console.log(err))
    }, [id]);

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }


    return (
        <>
            {project.name ? (
                <Container customClass="column">
                    <div className={styles.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button onClick={toggleProjectForm} className={styles.btn}>{!showProjectForm ? "Editar projeto" : "Fechar"}</button>
                        {!showProjectForm ? (
                            <div className={styles.project_info}>
                                <p><span>Categoria: </span>{project.category.name}</p>
                                <p><span>Total do Orçamento: </span>R$ {project.budget}</p>
                            </div>
                        ) : (
                            <div className={styles.project_info}></div>
                        )}
                    </div>
                </Container>
            ) : (<Loading />)}
        </>
    )
}

export default Project