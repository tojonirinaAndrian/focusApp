'use client';
import { ChangeEvent, useEffect, useState, useTransition } from "react";
import { z } from "zod";

const emailSchema = z
.string()
.trim()
.toLowerCase()
.refine((email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email), "Invalid email address");

const passwordSchema = z
.string()
.min(8, "Password must be at least 8 characters")
.max(64, "Password is too ling")
.refine((val) => /[a-z]/.test(val), "Password must contain a lowercase letter")
.refine((val) => /[A-Z]/.test(val), "Password must contain an uppercase letter")
.refine((val) => /\d/.test(val), "Password must contain a number")
.refine((val) => /[^A-Za-z0-9]/.test(val), "Password must contain a special character");

export default function Page() {
    const [isContinuing, startContinuing] = useTransition();
    const onContinuingClick = () => {
        startContinuing (() => {
            // await from the backend   
        });
    };

    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        // setEmailErrors if errors;
        const value: string = e.target.value;
        const result = emailSchema.safeParse(value);
        if (result.success) {
            setEmailErrors(false);
            setEmail(value);
        } else {
            setEmailErrors(true);
            setEmail("");
        }
    }

    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value: string = e.target.value;
        const result = passwordSchema.safeParse(value);
        if (result.success) {
            setPasswordErrors([]);
            setPassword(value);
        } else {
            setPassword("");
            const messages: string[] = result.error.issues.map((err) => err.message);
            setPasswordErrors(messages);
        }
    }

    const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [emailErrors, setEmailErrors] = useState<boolean>(false);
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
    const [isThereErrors, setIsThereErrors] = useState<boolean>(false);
    const continuingConditions: boolean = ((email.length > 0) && (password.length > 0) && (isThereErrors === false));
    useEffect(() => {
        !(emailErrors && passwordErrors.length > 0) && setIsThereErrors(false);
    }, [email, password])

    return <>
    <div className="w-full p-10 bg-beigeAccent min-h-[100dvh] h-full flex items-center">
        <div className="m-auto rounded-sm bg-white shadow-sm md:w-[30%] sm:w-[60%] w-[95%] p-5 space-y-5">
            <div className="text-center px-5">
                <h3 className="text-3xl">FOCUS</h3>
                <p className="text-black/80">Focus will never be a struggle again.</p>
            </div>
            <div className="space-y-2">
                <div className="space-y-1">
                    <label htmlFor="email" className="text-black/80">Email : </label>
                    <input 
                        type="email" name="email" 
                        onChange={(e) => onEmailChange(e)}
                        className="border rounded-sm p-1 px-2 w-full"
                    />
                    {emailErrors && <p className="mx-2 text-sm text-red-500">
                        * Invalid email 
                    </p>}
                </div>
                <div className="">
                    <label htmlFor="password" className="text-black/80">Password : </label>
                    <div className="flex gap-2 items-center">
                        <input 
                            type={!visiblePassword ? "password" : "text"} 
                            name="password" 
                            onChange={(e) => onPasswordChange(e)}
                            className="border rounded-sm p-1 px-2 w-full"
                        />
                        <span 
                            className="text-sm cursor-pointer text-black/80"
                            onClick={() => setVisiblePassword(!visiblePassword)}
                        >
                            {visiblePassword ? "Hide" : "See"}
                        </span>
                    </div>
                    {passwordErrors.length > 0 && <ul className="mx-2 text-sm text-red-500">
                        {passwordErrors.map((error, i) => {
                            return <li key={i}>* {error}</li>
                        })}
                    </ul>}
                </div>
            </div>
            <button 
                className={`bg-beigeAccent/60 hover:bg-beigeAccent/80 w-full p-2 rounded-sm cursor-pointer ${(!continuingConditions || isContinuing) && "opacity-30"}`}
                onClick={() => {
                    if (continuingConditions) {
                        onContinuingClick();
                    }
                }}
            >{isContinuing ? "Continuing" : "Continue"}</button>

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