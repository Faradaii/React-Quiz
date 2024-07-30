import { useEffect, useState } from 'react';
import Layout from './layouts';
import { getPages } from './pages';
import useUserStore from './stores/store';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { User } from './types';

function App() {
  const { user, setUser, clearUser } = useUserStore((state) => ({user: state.user, setUser: state.setUser, clearUser: state.clearUser}));
  const [ pages, setPages ] = useState(() => getPages(false));
  const [ initializing, setInitializing ] = useState(true);

const logOutHandler = () => {
    setPages(getPages(false));
    clearUser();
};

const logInHandler = (u: User) => {
    setPages(getPages(true));
    setUser(u);
};

const navigate = useNavigate();

useEffect(() => {
  if (!user) {
    navigate('/login');
    setInitializing(false);
    return;
  }
  setPages(getPages(true));
  setInitializing(false);
}, [user, navigate]);

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
            element={page.elem({ logInHandler: logInHandler })}
          />
        ))
      
    }

    </Route>
  </Routes>
);
}
export default App;