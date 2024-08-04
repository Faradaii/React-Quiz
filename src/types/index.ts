interface LogInHandler {
    logInHandler: (u: User ) => void;
}

interface User {
    name?: string;
    email: string;
}

interface UserState {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
}

interface Quiz {
    type: string,
    difficulty: string,
    category: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[],
    answer?: string | null,
}

interface QuizState {
    quiz: Quiz[];
    timer: number;
    setQuiz: (quiz: Quiz[]) => void;
    updateQuiz: (updatedQuiz: Quiz) => void;
    countAnswers: () => number;
    countCorrectAnswers: () => number;
    countIncorrectAnswers: () => number;
    setTimer: (timer: number) => void;
    clearQuiz: () => void;
}

export type { User, UserState, LogInHandler, Quiz, QuizState };