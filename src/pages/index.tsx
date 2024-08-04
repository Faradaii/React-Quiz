import { LogInHandler } from "@/types";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import QuizPage from "./QuizPage";
import ErrorPage from "./ErrorPage";
import ResultPage from "./ResultPage";

const pages = [
    {
        name : 'quiz',
        path : 'quiz',
        mustAuth : true,
        elem : () => (<QuizPage />)
    },
    {
        name : 'result',
        path : 'result',
        mustAuth : true,
        elem : () => (<ResultPage />)
    },
    {
        name : 'home',
        path : '/*',
        mustAuth : true,
        elem : ({ startQuizHandler, isResumed }: {startQuizHandler: () => void, isResumed: boolean}) => (<HomePage startQuizHandler={startQuizHandler} isResumed={isResumed} />)
    },
    {
        name : 'login',
        path : '*',
        mustAuth : false,
        elem : ({ logInHandler}: LogInHandler) => (<LoginPage logInHandler={logInHandler}/>)
    },
    {
        name : 'error',
        path : '*',
        mustAuth : true,
        elem : () => (<ErrorPage />)
    },
    
];

const getPages = (mustAuth: boolean) => {
    if (mustAuth) {
        return pages.filter((page) => page.mustAuth == true);
    } 
    else {
        return pages.filter((page) => page.mustAuth == false);
    }
}

export { getPages };