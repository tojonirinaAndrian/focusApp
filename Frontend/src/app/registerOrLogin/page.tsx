'use client';
import { useState, useTransition } from "react";

export default function Page() {
    const [isContinuing, startContinuing] = useTransition();
    const onContinuingClick = () => {
        startContinuing (() => {
            // await from the backend   
        });
    }
    const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [emailErrors, setEmailErrors] = useState<string[]>(['Email errors']);
    const [passwordErrors, setPasswordErros] = useState<string[]>(['Password errors']);
    const [isThereErrors, setIsThereErrors] = useState<boolean>(true);
    const continuingConditions: boolean = ((email.length > 0) && (password.length > 0) && (isThereErrors === false));
    
    return <>
    <div className="w-full p-5 bg-beigeAccent min-h-[100dvh] h-full flex items-center">
        <div className="m-auto rounded-sm bg-white shadow-sm md:w-[30%] sm:w-[60%] w-[95%] p-5 space-y-5">
            <div className="text-center px-5">
                <h3 className="text-3xl">FOCUS</h3>
                <p className="text-black/80">Focus will never be a struggle again.</p>
            </div>
            <div className="space-y-2">
                <div className="space-y-1">
                    <label htmlFor="email" className="text-black/80">Email : </label>
                    <input 
                        type="text" name="email" 
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded-sm p-1 px-2 w-full"
                    />
                    <ul className="mx-2 text-sm text-red-500">
                        {emailErrors.map((error, i) => {
                            return <li key={i}>* {error}</li>
                        })}
                    </ul>
                </div>
                <div className="">
                    <label htmlFor="password" className="text-black/80">Password : </label>
                    <div className="flex gap-2 items-center">
                        <input 
                            type={!visiblePassword ? "password" : "text"} 
                            name="password" 
                            onChange={(e) => (e.target.value.length > 0) && setPassword(e.target.value)}
                            className="border rounded-sm p-1 px-2 w-full"
                        />
                        <span 
                            className="text-sm cursor-pointer text-black/80"
                            onClick={() => setVisiblePassword(!visiblePassword)}
                        >
                            {visiblePassword ? "Hide" : "See"}
                        </span>
                    </div>
                    <ul className="mx-2 text-sm text-red-500">
                        {passwordErrors.map((error, i) => {
                            return <li key={i}>* {error}</li>
                        })}
                    </ul>
                </div>
            </div>
            <button 
                className={`bg-beigeAccent/60 hover:bg-beigeAccent/80 w-full p-2 rounded-sm cursor-pointer ${(continuingConditions === false) && "opacity-30"}`}
                onClick={() => {
                    if (continuingConditions) {
                        onContinuingClick();
                    }
                }}
            >Continue</button>
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