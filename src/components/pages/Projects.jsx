import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Container from '../layouts/Container';
import LinkButton from '../layouts/LinkButton';
import Message from './../layouts/Message';
import styles from './Projects.module.css';
import ProjectCard from './../project/ProjectCard';

const Projects = () => {

    const [projects, setProjects] = useState([]);

    const location = useLocation();
    let msg = "";
    if (location.state) {
        msg = location.state.message
    }

    useEffect(() => {
        fetch('http://localhost:5000/projects', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((resp) => resp.json()
        ).then((data) => {
            setProjects(data)
        }).catch((err) => console.log(err))
    }, []);

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar projeto"></LinkButton>
            </div>
            {msg && <Message msg={msg} type="success" />}
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard name={project.name}
                            id={project.name}
                            budget={project.budget}
                            category={project?.category?.name}
                            key={project.id}
                        />
                    ))}
            </Container>
        </div>
    )
}

export default Projects