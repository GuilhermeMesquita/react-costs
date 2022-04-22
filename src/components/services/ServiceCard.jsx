import React from 'react'
import styles from '../project/ProjectCard.module.css'
import { BsFillTrashFill } from 'react-icons/bs';

const ServiceCard = ({ id, name, cost, description, handleRemove }) => {

    const remove = () => {

    }

    return (
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Custo total: </span>R${cost}
            </p>
            <p>
                <span>Descrição: </span>{description}
            </p>
            <div className={styles.project_card_actions}>
                <button onClick={remove}>
                    <BsFillTrashFill /> Excluir
                </button>
            </div>
        </div>
    )
}

export default ServiceCard