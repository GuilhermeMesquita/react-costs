import { FaFacebook, FaInstagram, FaLinkedin, FaHeart } from 'react-icons/fa'
import styles from './Footer.module.css'

function Footer() {
    return (
        <footer className={styles.footer}>
            <ul className={styles.social_list}>
                <li>
                    <FaFacebook />
                </li>
                <li>
                    <FaInstagram />
                </li>
                <li>
                    <FaLinkedin />
                </li>
            </ul>
            <p className={styles.copy_right}>
                <span>Costs</span> &copy; 2022 developed with <FaHeart style={{ color: "#FFA1A1" }} /> by Guilherme Rocha
            </p>
        </footer>
    )
}

export default Footer