import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/passwordInput';
import {QuizWelcome} from '@/lib/image';
import { LogInHandler } from '@/types';
import { Label } from '@radix-ui/react-label';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';

function LoginPage({logInHandler}:LogInHandler) {
    const [ email, setEmail ] = useState("");
    const [ pass, setPass ] = useState("");

    const responseMessage = (response:CredentialResponse) => {
        logInHandler(jwtDecode(response.credential as string));
    };
    const errorMessage = () => {
        console.log("error");
    };

    const onsubmitHandler = (e: React.FormEvent ) => {
        e.preventDefault();
        const u = {email, pass};
        logInHandler(u);
    }

    return (
        <div className="w-screen grid md:grid-cols-2 gap-3 max-md:flex flex-col items-end h-screen max-md:h-fit max-md:absolute bottom-0 py-10">
            <div className="m-auto flex flex-col max-md:w-full w-4/6 max-md:h-fit">
                <img src={QuizWelcome} className="m-auto md:w-5/6 md:h-5/6 w-2/4" />
                <p className="text-center text-gray-500 w-3/4 m-auto max-md:hidden">Coba asah kemampuanmu akan pengetahuan tertentu dan tunjukan hasilnya di dalam Re-quizy!</p>
            </div>
            <form className="m-auto" onSubmit={onsubmitHandler}>
                <Card className="mx-auto my-auto max-w-sm max-sm:max-w-xs max-md:border-none">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">Re-quizy</CardTitle>
                        <CardDescription className="text-center">Silahkan masukan email dan password untuk memulai quiz yang menyenangkan!</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="myemail@example.com" onChange={(e) => setEmail(e.target.value)} value={email} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <PasswordInput id="password" placeholder="••••••••" onChange={(e) => setPass(e.target.value)} value={pass} required />
                            </div>
                            <Button type="submit" className="w-full" variant={"dotTone"}>
                                Login
                            </Button>
                            <div className="relative">
                                <span className="text-center text-sm absolute -top-1 left-1/2 -translate-x-1/2 bg-white z-1 px-3">atau</span>
                                <div className="flex-grow border-b border-gray-300 h-2">
                                </div>
                            </div>
                            <GoogleLogin useOneTap={true} containerProps={{className: "w-full flex justify-center w-full"}} width={"320"} text="continue_with" onSuccess={responseMessage} onError={errorMessage}/>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}

export default LoginPage

