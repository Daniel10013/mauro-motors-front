import styles from '../../pages/Home_ComLogin/Home_ComLogin.module.css'
import quizzQuestion from '../../Pages/Home_ComLoginSemQuiz/images/quizzQuestion.png'
import { Link } from 'react-router-dom';

export default function QuizzPendente(){
    return(
        <div className={styles.SpaceQuiz}>
            <h1>Quer ver os carros que mais combinam com você?</h1>
            <div className={styles.division}>
                <div className={styles.Text}>
                    <p>
                        Responda esse breve <span>quizz</span> para receber anúncios personalizados baseados nos seus gostos!                   
                    </p>
                    <p>
                        Isso vai te garantir uma melhor experiência na nossa plataforma!
                    </p>
                    <Link to={"/quizz"}>
                        <button className={styles.buttonParaQuizz}>Iniciar Quizz</button>
                    </Link>
                </div>
                <div>
                    <img src={quizzQuestion} className={styles.imgQuiz} alt="" />
                </div>
            </div>
        </div>
    );
}