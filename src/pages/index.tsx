import { LogInHandler } from "@/types";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";

const pages = [
    {
        name : 'home',
        path : 'home',
        mustAuth : true,
        elem : () => (<HomePage />)
    },
    {
        name : 'loginpage',
        path : '*',
        mustAuth : false,
        elem : ({ logInHandler}: LogInHandler) => (<LoginPage logInHandler={logInHandler}/>)
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