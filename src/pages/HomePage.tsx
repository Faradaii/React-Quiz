import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

function HomePage({ startQuizHandler, isResumed }: {startQuizHandler: () => void, isResumed: boolean}) {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
    }, []);
    return (
        <section className="flex flex-col justify-center items-center h-screen">
            <h1 className={`text-sm md:text-md font-semibold text-green-500 uppercase ${animate ? 'fade-in-top' : ''}`}>{!isResumed ? 'ayo mulai quiz sekarang!' : 'ayo lanjutkan quiz sekarang!'}</h1>
            <h1 className={`text-xl md:text-4xl font-bold capitalize ${animate ? 'fade-in-top' : ''}`}>{!isResumed ? 'selamat datang di Re-quizy' : 'quiz ditunda saat ini'}</h1>
            <div className={`px-4 py-4 md:w-2/4 w-5/6 text-center ${animate ? 'fade-in-bottom' : ''}`}>
                <p className="text-sm md:text-base">{!isResumed ? 'Siap menguji pengetahuan Anda dengan cara yang menyenangkan dan menantang? Coba Re-quizy untuk mengasah kemampuanmu. Kami menyediakan kuis yang tak terduga dengan pertanyaan mengenai sains dan teknologi.' : 'Kuis Anda sebelumnya belum selesai. Silakan lanjutkan kuis yang tertunda untuk menguji pengetahuan Anda dengan cara yang menyenangkan dan menantang. Kami menyediakan kuis acak dengan pertanyaan tentang sains dan teknologi.'}</p>
            </div>
            <div className="px-3 py-5">
                <Button className={`rounded-full ${animate ? 'fade-in-bottom' : ''}`} variant={"dotTone"} onClick={startQuizHandler}>{!isResumed ? 'Mulai Quiz' : 'Lanjutkan Quiz'}</Button>
            </div>
        </section>
    );

}

export default HomePage;