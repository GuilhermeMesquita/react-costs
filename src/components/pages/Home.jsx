import styles from './Home.module.css';
import savings from '../../img/savings.svg';
import LinkButton from '../layouts/LinkButton'

const Home = () => {
    return (
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>costs</span>.</h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <LinkButton to="/NewProject" text="Criar projeto"></LinkButton>
            <img src={savings} alt="Costs" />
        </section>
    )
}

export default Home