"use client";

import { useGlobalStore } from "@/store/use-global-store";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useRef } from "react";

export default function PomodoroComponent () {
    const { 
        isBreakOrSession, setIsBreakOrSession, setStartModalVisible,
        defaultSessionDuration, pomodoroIsPlaying, setIsPlaying, 
        currentPomodoroMinutes, currentPomodoroSeconds, setPomodoro,
        setIsPaused, isPaused, setTodaysAccumulatedSeconds, todaysAccumulatedSeconds,
        resetTimer
    } = useGlobalStore();
    const interval = useRef<any>(null);
    useEffect(() => {
        if (pomodoroIsPlaying === false) {
            clearInterval(interval.current);
        } else {
            let mockSec: number = (currentPomodoroSeconds <= 0) ? 60 : currentPomodoroSeconds;
            let mockMin: number = currentPomodoroMinutes;
            interval.current = setInterval (() => {
                if (mockSec === 0) {
                    mockSec = 60;
                }
                mockSec--;
                if (isBreakOrSession === "session") {
                    setTodaysAccumulatedSeconds(todaysAccumulatedSeconds + 1);
                }
                if (mockSec === 59) {
                    mockMin--;
                };
                setPomodoro(mockMin, mockSec);
                if (mockMin === 0 && mockSec === 0) {
                    clearInterval(interval.current);
                    setIsPlaying(false);
                    setStartModalVisible(true);
                };
            }, 1000)
        }
    }, [pomodoroIsPlaying]);

    return (<>
    <div className="w-full h-full flex items-center justify-center">
        <div className="w-fit flex flex-col gap-5">
            <div className="flex font-medium text-9xl gap-5">
                <p>
                    {String(currentPomodoroMinutes).length === 1 ? "0" : ""}
                    {currentPomodoroMinutes}
                </p>
                <p>:</p>
                <p>
                    {String(currentPomodoroSeconds).length === 1 ? "0" : ""}
                    {currentPomodoroSeconds}
                </p>
            </div>
            <div className="flex m-auto ">
                <nav className="shadow-md *:hover:bg-beigeAccent/80 *:p-2 *:cursor-pointer flex gap-1 *:flex *:gap-1 *:items-center *:bg-beigeAccent/30 text-black *:rounded-sm p-2 rounded-md bg-white">
                    {pomodoroIsPlaying ? <>
                    <button 
                        onClick={() => {
                            setIsPlaying(false);
                            setIsPaused(true);
                        }}
                        className="">
                            <Pause size={20}/>
                    </button>
                    </> : <>
                    <button 
                        onClick={() => {
                            setIsPlaying(true);
                            setIsPaused(false);
                        }}
                        className="">
                            <Play size={20}/>
                    </button>                
                    </>}
                    {isBreakOrSession === "break" ? <button onClick={() => {
                        setIsPlaying(false);
                        setIsPaused(true);
                        setStartModalVisible(true);
                    }} >
                        End break
                    </button> : <button className={(pomodoroIsPlaying ? " opacity-20 " : "") + "hover:!bg-red-200 hover:text-red-600"} onClick={
                        () => !pomodoroIsPlaying && resetTimer()
                    }>
                        <RotateCcw size={20}/>
                    </button>}
                </nav>
            </div>
        </div>
        
    </div>        
    </>)
}