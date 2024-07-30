import { User } from '@/types';
import { Outlet } from 'react-router-dom';

function Layout({ user, logoutHandler }: {user: User | null, logoutHandler: () => void}) {
    return (
        <div className="h-screen overflow-auto flex flex-col items-center gap-5 bg-white-light dark:bg-white-dark text-black-light dark:text-black-dark">
            <header className="fixed top-0 z-40 w-full bg-white-light dark:bg-white-dark">
            <div className="opacity-90 font-geologica pt-6 mb-3">
            <div className="flex sm:flex-row flex-nowrap flex-col sm:gap-6 mt-4 sm:mt-0 text-xl px-10 text-center">
                <div className="pb-4 col-span-7 sm:text-start text-center sm:grow grow-0">
                </div>
                <div className="flex sm:flex-row flex-wrap mt-4 sm:gap-8">
                    {   user !== null && 
                    <>
                        <div className="order-3 w-1/3 sm:w-fit"><button className="flex justify-center items-center m-auto gap-2" onClick={logoutHandler}><span>{user?.name}</span>Logout</button></div>
                    </>
                    }
                </div>
            </div>
            
        </div>
            </header>
            <main className="w-full grow">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout;