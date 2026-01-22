'use client';
import LoginComponent from "@/src/components/registerOrLogin/login";
import RegisterComponent from "@/src/components/registerOrLogin/register";
import { ChangeEvent, useEffect, useState, useTransition } from "react";

export default function Page() {
    const [isContinuing, startContinuing] = useTransition();
    const [where, setWhere] = useState<"login" | "register"> ("login")
    const onContinuingClick = () => {
        startContinuing (() => {
            // await from the backend   
        });
    };

    return <>
    <div className="w-full p-10 bg-beigeAccent min-h-[100dvh] h-full flex items-center">
        <div className="m-auto rounded-sm bg-white shadow-sm md:w-[30%] sm:w-[60%] w-[95%] p-5 space-y-5">
            <div className="text-center px-5">
                <h3 className="text-3xl">FOCUS</h3>
                <p className="text-black/80">Focus will never be a struggle again.</p>
            </div>
            {where === "login" ? 
                <LoginComponent /> : 
                <RegisterComponent />
            }
            <div className="text-black/50 text-sm">
                {where === "login" ? <>
                    <p>Don't have an account yet ? <span className="underline cursor-pointer"
                    onClick={() => setWhere("register")}
                    >Sign up</span></p>
                    <p>Forgot password ? <span className="underline cursor-pointer">Reset</span></p>
                </> : <>
                <p>Already have an account ? <span className="underline cursor-pointer"
                    onClick={() => setWhere("login")}
                    >Log in</span></p>
                </>}
            </div>
            <div className="flex items-center gap-2">
                <div className="w-full h-[1px] bg-black/50"></div>
                <p className="text-black/80">OR</p>
                <div className="w-full h-[1px] bg-black/50"></div>
            </div>
            
            <div className="space-y-1">
                <button className="bg-black/10 hover:bg-beigeAccent/80 w-full p-2 rounded-sm cursor-pointer"
                onClick={onContinuingClick}
                >Continue with Google</button>
                <button className="bg-black/10 hover:bg-beigeAccent/80 w-full p-2 rounded-sm cursor-pointer"
                onClick={onContinuingClick}
                >Continue with Facebook</button>
                <button className="bg-black/10 hover:bg-beigeAccent/80 w-full p-2 rounded-sm cursor-pointer"
                onClick={onContinuingClick}
                >Continue with Apple</button>    
            </div>
        </div>
    </div>
    </>
}