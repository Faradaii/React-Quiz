import { Button } from "@/components/ui/button";
import { useQuizStore } from "@/stores/store";
import { Quiz } from "@/types";
import { decodeBase64, numToTime, shuffleArray } from "@/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function QuizPage() {
    const [ count, setCount ] = useState(0);
    const [animate, setAnimate] = useState(false);
    const { quiz, updateQuiz, timer, setTimer } = useQuizStore((state) => ({quiz: state.quiz, updateQuiz: state.updateQuiz, timer: state.timer, setTimer: state.setTimer }));
    const [ currentQuestion, setCurrentQuestion ] = useState({} as Quiz);
    const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
    const [ countdown, setCountdown ] = useState(timer);
    const navigate = useNavigate();

    const finishQuiz = () => {
        navigate('/result');
    }

    const nextQuestion = () => {
        setCount(count + 1);
        setCurrentQuestion(quiz[count]);
    }   
    
    useEffect(() => {
        setAnimate(true);
    }, []);

    useEffect(() => {
        if (countdown <= 0 || count == quiz.length) {
            finishQuiz();
        }
    }, [count, countdown, finishQuiz, quiz.length]);
    
    useEffect(() => {
        if (quiz.length > 0 && count < quiz.length) {
            if ((currentQuestion.answer !== undefined) && (count < quiz.length)) {
                setCount(count + 1);
            }
            const allAnswers = [
                currentQuestion?.correct_answer,
                ...(currentQuestion?.incorrect_answers?.map((answer) => answer) || [])
            ];
            setShuffledAnswers(shuffleArray(allAnswers));
        }
    }, [currentQuestion]);

    useEffect(() => {
        setCurrentQuestion(quiz[count]);
    }, [quiz, count]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown(countdown - 1);
        }, 1000);

        return () => {
            setTimer(countdown);
            clearInterval(interval);
        };
    }, [countdown, setTimer]);

    const updateAnswerHandler = (a: string | null) => {
        const updateQ = { ...currentQuestion, answer: a }
        updateQuiz(updateQ);
        nextQuestion();
    }

    return (
        <section className="flex flex-col justify-center items-center h-screen">
        {currentQuestion ? (
            <section className="h-3/4 w-3/4 m-auto flex flex-col" key={currentQuestion.question}>
                <div className="absolute top-3 left-1/2 -translate-x-1/2">
                    <h2 className="font-medium text-xl text-center">Time Remaining</h2>
                    <h2 className="font-medium text-xl text-center">{numToTime(countdown)}</h2>
                </div>
                <div className="flex flex-col justify-evenly grow">
                    <h3 className={`font-bold text-lg text-center md:w-2/4 w-full mx-auto my-10 grow ${animate ? 'fade-in-top' : ''}`}>{decodeBase64(currentQuestion?.question)}</h3>
                    <div className="flex flex-col gap-2 md:w-2/4 w-full m-auto">
                        {
                            shuffledAnswers.map(
                                (answer: string, index: number) => 
                                    <Button className={animate ? 'fade-in-bottom' : ''} variant={'outline'} key={index} onClick={() => updateAnswerHandler(answer)}>{decodeBase64(answer)}</Button>
                            )
                        }
                        <Button className={animate ? 'fade-in-bottom' : ''} variant={'outline'} onClick={() => updateAnswerHandler(null)}>{"I Don't Know"}</Button>
                    </div>
                    <h5 className="font-semibold text-md text-center mt-10">Question {count + 1} of {quiz.length}</h5>
                </div>
            </section>
        ) : (
            null
        )}
        </section>
    );
}

export default QuizPage;