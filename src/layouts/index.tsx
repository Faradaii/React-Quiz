import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { User } from '@/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Outlet, useLocation } from 'react-router-dom';

function Layout({ user, logoutHandler }: {user: User | null, logoutHandler: () => void}) {
    const location = useLocation();
    return (
        <div className="h-screen overflow-auto flex flex-col items-center gap-5 bg-transparent text-white">
            {
                ((location.pathname !== '/result') && (location.pathname !== '/quiz')) ? 
                (
                    <header className="fixed top-0 z-40 w-full ">
                        <div className="opacity-90 pt-6 mb-3">
                            <div className={`flex flex-nowrap ${user === null ? 'justify-center' : 'justify-between'} sm:gap-6 mt-4 sm:mt-0 text-xl px-10 text-center`}>
                                <div className={`pb-4 col-span-7 ${user === null ? 'text-center' : ''} text-start`}>
                                    <h1 className="text-2xl font-bold">Re-Quizy</h1>
                                </div>
                                <div className="">
                                    {   user !== null && 
                                    <>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                            <Avatar>
                                                <AvatarImage src="https://github.com/faradaii.png" />
                                            </Avatar>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56 bg-white rounded-lg text-black" align='end'>
                                                <DropdownMenuLabel>~{user.name}</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                >
                                                <Button variant={'default'} className="w-full h-full" onClick={logoutHandler}>Logout</Button>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </>
                                    }
                                </div>
                            </div>
                        </div>
                    </header>
                ) : null
            }
            
            <main className="w-full grow bg-black text-white h-full">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout;