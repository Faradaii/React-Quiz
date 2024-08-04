import { useEffect, useState } from 'react';
import Layout from './layouts';
import { getPages } from './pages';
import { useQuizStore, useUserStore } from './stores/store';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { User } from './types';
import { getQuiz } from './services/api';

function App() {
  const { user, setUser, clearUser } = useUserStore((state) => ({user: state.user, setUser: state.setUser, clearUser: state.clearUser}));
  const { quiz, setQuiz } = useQuizStore((state) => ({quiz: state.quiz, setQuiz: state.setQuiz}));
  const [isResumed, setIsResumed] = useState(() => quiz.length > 0);
  const [ pages, setPages ] = useState(() => getPages(false));
  const [ initializing, setInitializing ] = useState(true);
  const navigate = useNavigate();

  const logOutHandler = () => {
      setPages(getPages(false));
      clearUser();
  };

  const logInHandler = (u: User) => {
    setPages(getPages(true));
    setUser(u);
    navigate('/');
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      setInitializing(false);
      return;
    }

    if (quiz.length === 0) {
      setIsResumed(false);
    }
    
    setPages(getPages(true));
    setInitializing(false);
  }, [user, navigate, quiz]);

  const startQuizHandler = async () => {
    console.log(quiz);
    if (quiz.length === 0) {
      const newQuiz = await getQuiz();
      setQuiz(newQuiz);
    }
    navigate('/quiz');
  }

  return (
    <Routes>
      <Route path='/*' element={<Layout user={user} logoutHandler={logOutHandler}/>}>
        {initializing ?
        null
        :
          pages.map((page) => (
            <Route 
              key={page.name}
              path={page.path}
              element={page.elem({ logInHandler, startQuizHandler, isResumed })}
            />
          ))
        
      }
      </Route>
    </Routes>
  );
}

export default App;