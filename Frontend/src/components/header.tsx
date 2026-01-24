"use client";
import { useGlobalStore } from "@/store/use-global-store";
import { Calendar, History, Settings, Timer, X } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import SettingsComponent from "./settings";
import { useRouter } from "next/navigation";

export default function HeaderComponent () {
    const { setWhereIsGlobal, pomodoroIsPlaying, whereIsGlobal } = useGlobalStore();
    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
    const [accountOpen, setAccountOpen] = useState<boolean>(false);
    const [redirecting, startRedirecting] = useTransition();
    const router = useRouter();
    useEffect(() => {
        if (pomodoroIsPlaying) {
            setSettingsOpen(false);
            setAccountOpen(false);
        };
    }, [pomodoroIsPlaying]);

    return (
        <>
        <header className="p-5 w-full justify-between flex fixed top-0">
            <div className="flex items-center">
                <div className={`shadow-md items-center flex p-2 rounded-md bg-white gap-1 relative ${pomodoroIsPlaying && "opacity-10"}`}>
                    <div 
                    onClick={() => !pomodoroIsPlaying && setAccountOpen(!accountOpen)}
                    className="w-[30px] h-[30px] rounded-full border border-black cursor-pointer"></div>
                     {(accountOpen) ? <div className="absolute top-14 left-0">
                        <div className="p-2 rounded-md bg-white w-[200px] space-y-1 *:hover:cursor-pointer shadow-md">
                            <button className={"p-2 rounded-sm bg-beigeAccent/30 w-full hover:bg-beigeAccent/80 " + (redirecting && " opacity-30 ")}
                            onClick={() => {
                                startRedirecting(async () => {
                                    router.push("/registerOrLogin");
                                });
                            }}
                            >Sign up or Log in</button>
                            <button className="p-2 rounded-sm bg-blueAccent/10 w-full hover:bg-blueAccent/60">Invite someone</button>
                        </div>
                    </div> : <></>}
                </div>
            </div>
            <nav className={(pomodoroIsPlaying ? " opacity-20 " : "" ) + "shadow-md *:hover:bg-beigeAccent/80 *:p-2 *:cursor-pointer flex gap-1 *:flex *:gap-1 *:items-center text-black *:rounded-sm p-2 rounded-md bg-white"}>
                <div className={whereIsGlobal === "pomodoro" ? "bg-beigeAccent/80" : "bg-beigeAccent/30"} onClick={() => {
                    !pomodoroIsPlaying && setWhereIsGlobal("pomodoro");
                }}>
                    <Timer size={20}/>Timer
                </div>
                <div className={whereIsGlobal === "calendar" ? "bg-beigeAccent/80" : "bg-beigeAccent/30"} onClick={() => {
                    !pomodoroIsPlaying && setWhereIsGlobal("calendar")
                }}>
                    <Calendar size={20}/>Calendar
                </div>
                <div className={whereIsGlobal === "history" ? "bg-beigeAccent/80" : "bg-beigeAccent/30"} onClick={() => {
                    !pomodoroIsPlaying && setWhereIsGlobal("history")
                }}>
                    <History size={20}/>History
                </div>
            </nav>
            <div className="flex items-center relative">
                <div className={!pomodoroIsPlaying ? `whiteButton` : "whiteButton opacity-20"}
                onClick={() => {
                    !pomodoroIsPlaying && setSettingsOpen(!settingsOpen)
                }}
                >   
                    {!settingsOpen ? <Settings size={20}/> : <X size={20}/>}
                </div>
                {(settingsOpen) ? <div className="absolute top-14 right-0">
                    <SettingsComponent />
                </div> : <></>}
            </div>
        </header>
        </>
    )
}