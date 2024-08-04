import { Quiz } from "@/types";
import axios from "axios";

const quizUrlApi = "https://opentdb.com/api.php?amount=20&category=18&difficulty=hard&type=multiple&encode=base64";

async function getQuiz() : Promise<Quiz[]> {
    return axios.get(
        quizUrlApi)
        .then((response) => {
            return response.data.results;
        })
        .catch((error) => {
            console.log(error);
            return null;
        });
}

export { getQuiz };