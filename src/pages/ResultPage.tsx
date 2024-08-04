import { Button } from "@/components/ui/button";
import { useQuizStore } from "@/stores/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import finishmusic from "../assets/finishmusic.mp3";

function ResultPage() {
    const { quiz, countAnswers, countCorrectAnswers, countIncorrectAnswers, clearQuiz } = useQuizStore((state) => ({ quiz: state.quiz, countAnswers: state.countAnswers, countCorrectAnswers: state.countCorrectAnswers, countIncorrectAnswers: state.countIncorrectAnswers, clearQuiz: state.clearQuiz}));
    const [animate, setAnimate] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (quiz.length == 0) {
            navigate('/');
        }
    });

    useEffect(() => {
        setAnimate(true);
    }, []);

    return (
        <section className="flex flex-col justify-center items-center h-screen">
        <audio autoPlay src={finishmusic} muted={false}></audio>
            <section className="h-3/5 md:w-2/4 m-auto flex flex-col items-center">
                <h3 className={`font-bold text-3xl text-center mx-auto ${animate ? 'fade-in-top' : ''}`}>Quiz Telah Berakhir!</h3>
                <div className="flex flex-col gap-2 m-auto">
                    <table className="table-auto m-auto grow border-gray-300">
                        <tbody>
                            <tr>
                                <td className={`px-4 py-2 text-lg font-base ${animate ? 'fade-in-bottom' : ''}`}>Jawaban Benar</td>
                                <td className={`px-4 py-2 text-lg font-base text-center ${animate ? 'fade-in-bottom' : ''}`}>{countCorrectAnswers()}</td>
                            </tr>
                            <tr>
                                <td className={`px-4 py-2 text-lg font-base ${animate ? 'fade-in-bottom' : ''}`}>Jawaban Salah</td>
                                <td className={`px-4 py-2 text-lg font-base text-center ${animate ? 'fade-in-bottom' : ''}`}>{countIncorrectAnswers()}</td>
                            </tr>
                            <tr>
                                <td className={`px-4 py-2 text-lg font-base ${animate ? 'fade-in-bottom' : ''}`}>Total Soal Terjawab</td>
                                <td className={`px-4 py-2 text-lg font-base text-center ${animate ? 'fade-in-bottom' : ''}`}>{countAnswers()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Button variant={'outline'} className="md:w-1/4 rounded-full" onClick={clearQuiz}>Akhiri Quiz</Button>
            </section>
        </section>
    );
}

export default ResultPage;