import React, { useEffect, useState } from 'react'
import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import Loading from '../layouts/Loading';
import Container from '../layouts/Container';
import ProjectForm from './../project/ProjectForm';
import Message from './../layouts/Message';
import ServiceForm from './../services/ServiceForm';
import { parse, v4 as uuidv4 } from 'uuid'
const Project = () => {
    const { id } = useParams();
    const [project, setProject] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [showServiceForm, setShowServiceForm] = useState("");

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((resp) => resp.json()).then((data) => setProject(data)).catch((err) => console.log(err))
    }, [id]);

    function editPost(project) {
        setMessage("");
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
    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    function createService(project) {
        setMessage("");
        const lastService = project.service[project.service.length - 1];
        lastService.id = uuidv4();
        const lastServiceCost = lastService.cost;
        const newCost = parseFloat(project.costs) + parseFloat(lastService.cost);

        //max value validation
        if (newCost > parseFloat(project.budget)) {
            setMessage("Orçamento ultrapassado, verifique o valor do serviço");
            setMessageType("error");
            project.service.pop();
            return false;
        }

        //add service cost to project total cost
        project.cost = newCost;

        //update project
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        }).then((resp) => resp.json()).then((data) => {
            //show services
        }).catch((err) => console.log(err))

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
                                <p><span>Total Utilizado </span>R$ {project.costs}</p>
                            </div>
                        ) : (
                            <div className={styles.project_info}>
                                <ProjectForm handleSubmit={editPost} btnText={"Salvar"} projectData={project} />
                            </div>
                        )}
                    </div>
                    <div className={styles.service_form_container}>
                        <h2>Adicione um serviço</h2>
                        <button onClick={toggleServiceForm} className={styles.btn}>{!showServiceForm ? "Adicionar serviço" : "Fechar"}</button>
                        <div className={styles.project_info}>
                            {showServiceForm && (<div>
                                <ServiceForm
                                    handleSubmit={createService}
                                    btnText="Adicionar Serviço"
                                    projectData={project}
                                ></ServiceForm>
                            </div>)}
                        </div>
                    </div>
                    <h2>Serviços</h2>
                    <Container customClass="start">
                        <p>Itens</p>
                    </Container>
                </Container>
            ) : (<Loading />)}
        </>
    )
}

export default Project