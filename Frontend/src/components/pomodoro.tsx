"use client";

import { useGlobalStore } from "@/store/use-global-store";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function PomodoroComponent () {
    const { 
        isBreakOrSession, setIsBreakOrSession, setStartModalVisible,
        defaultSessionDuration, pomodoroIsPlaying, setIsPlaying, 
        currentPomodoroMinutes, currentPomodoroSeconds, setPomodoro,
        setIsPaused, isPaused, setTodaysAccumulatedSeconds, todaysAccumulatedSeconds,
        setCurrentDoneCycle, currentDoneCycle, cycleNumber, setCycleNumber,
        resetTimer
    } = useGlobalStore();

    const interval = useRef<any>(null);
    
    const convertToMinutes = (seconds: number) => {
        let convertedToMins: number = 0;
        while (seconds >= 0) {
            seconds -= 60;
            if (seconds < 0) break;
            convertedToMins++;
        }
        return convertedToMins;
    };

    const [todaysStreak, setTodaysStreak] = useState<number>(convertToMinutes(todaysAccumulatedSeconds));
    
    useEffect(() => {    
        setTodaysStreak(convertToMinutes(todaysAccumulatedSeconds));
    }, [todaysAccumulatedSeconds]);

    useEffect(() => {
        if (pomodoroIsPlaying === false) {
            clearInterval(interval.current);
        } else {
            let mockSec: number = (currentPomodoroSeconds <= 0) ? 60 : currentPomodoroSeconds;
            let mockMin: number = currentPomodoroMinutes;
            let accumulated: number = todaysAccumulatedSeconds;
            interval.current = setInterval (() => {
                if (mockSec === 0) {
                    mockSec = 60;
                };
                mockSec--;
                if (isBreakOrSession === "session") {
                    accumulated++;
                    setTodaysAccumulatedSeconds(accumulated);
                };
                if (mockSec === 59) {
                    mockMin--;
                };
                setPomodoro(mockMin, mockSec);
                if (mockMin === 0 && mockSec === 0) {
                    clearInterval(interval.current);
                    setIsPlaying(false);
                    setStartModalVisible(true);
                    if (isBreakOrSession === "session") {
                        setCurrentDoneCycle(currentDoneCycle + 1);
                    }
                };
            }, 1000)
        }
    }, [pomodoroIsPlaying]);

    return (<>
    <div className="w-full h-full flex items-center justify-center">
        <div className="w-fit flex flex-col gap-5">
            <p className="text-center text-black/80">
                {isBreakOrSession === "longBreak" && `Long break`}
                {isBreakOrSession === "break" && `Short break`}
                {isBreakOrSession === "session" && `Cycle : ${currentDoneCycle}/${cycleNumber}`}
            </p>
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
                    {((isBreakOrSession === "break") || (isBreakOrSession === "longBreak")) ? <button onClick={() => {
                        setIsPlaying(false);
                        setIsPaused(true);
                        setStartModalVisible(true);
                    }}>
                        Skip break
                    </button> : <>
                        <button className={(pomodoroIsPlaying ? " opacity-20 " : "") + "hover:!bg-red-200 hover:text-red-600"} 
                        onClick = {
                            () => !pomodoroIsPlaying && resetTimer()
                        }>
                            <RotateCcw size={20}/>
                        </button>
                        {(currentDoneCycle > 0) && <>
                            <button className={(pomodoroIsPlaying ? " opacity-20 " : "") + "hover:!bg-red-200 hover:text-red-600"} 
                            onClick = {
                                () => {
                                    if (!pomodoroIsPlaying) {
                                        resetTimer();
                                        setCurrentDoneCycle(0);
                                    }
                                }
                            }>
                                End cycle streak
                            </button>
                        </>}
                    </>}
                </nav>
            </div>
        </div>
        
    </div>        
    </>)
}