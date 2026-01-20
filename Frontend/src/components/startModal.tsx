"use client";

import { useGlobalStore } from "@/store/use-global-store";

export default function StartBreakModalComponent () {
    const {setIsBreakOrSession, setIsPaused , setStartModalVisible, setIsPlaying} = useGlobalStore();
    return (<>
    <div className="w-full h-[100dvh] top-0 fixed z-5 bg-black/80 flex items-center">
        <div className="bg-white w-[85%] md:w-[30vw] space-y-5 rounded-md m-auto p-3 shadow-md text-center">
            <div className="">
                <p className=" text-xl uppercase">You made it !</p>
                <div className="w-[50%] h-[1px] bg-black/70 m-auto"></div>
            </div>
            <p className="text-black/80">Wanna take a break ?</p>
            <div className="flex w-full gap-1 *:rounded-sm *:p-2 *:cursor-pointer">
                <button className="bg-beigeAccent/50 hover:bg-beigeAccent/80 w-full"
                onClick={() => {
                    setIsBreakOrSession("break")
                    setStartModalVisible(false);
                    setIsPlaying(true);
                    setIsPaused(false);
                }}
                >Start short break</button>
                <button className="bg-red-100 text-red-600 hover:bg-red-200 w-full"
                onClick={() => {
                    setIsBreakOrSession("session")
                    setStartModalVisible(false);
                    setIsPaused(false);
                }}
                >End Session</button>
            </div>
        </div>
    </div>
    </>)
}
export function StartLongBreakModalComponent () {
    const {setIsBreakOrSession, setIsPaused , setStartModalVisible, setIsPlaying, setCurrentDoneCycle} = useGlobalStore();
    return (<>
    <div className="w-full h-[100dvh] top-0 fixed z-5 bg-black/80 flex items-center">
        <div className="bg-white w-[85%] md:w-[30vw] space-y-5 rounded-md m-auto p-3 shadow-md text-center">
            <div className="">
                <p className=" text-xl uppercase">You made it this far !</p>
                <div className="w-[50%] h-[1px] bg-black/70 m-auto"></div>
            </div>
            <p className="text-black/80">Wanna take a LONG break ?</p>
            <div className="flex w-full gap-1 *:rounded-sm *:p-2 *:cursor-pointer">
                <button className="bg-beigeAccent/50 hover:bg-beigeAccent/80 w-full"
                onClick={() => {
                    setCurrentDoneCycle(0);
                    setIsBreakOrSession("longBreak");
                    setStartModalVisible(false);
                    setIsPlaying(true);
                    setIsPaused(false);
                }}
                >Start long break</button>
                <button className="bg-red-100 text-red-600 hover:bg-red-200 w-full"
                onClick={() => {
                    setIsBreakOrSession("session")
                    setStartModalVisible(false);
                    setIsPaused(false);
                }}
                >End Session</button>
            </div>
        </div>
    </div>
    </>)
}
export function StartSessionModalComponent () {
    const {setIsBreakOrSession, setIsPaused, setStartModalVisible, setIsPlaying, currentPomodoroMinutes, currentPomodoroSeconds} = useGlobalStore();
    return (<>
    <div className="w-full h-[100dvh] top-0 fixed z-5 bg-black/80 flex items-center">
        <div className="bg-white w-[85%] md:w-[30vw] space-y-5 rounded-md m-auto p-3 shadow-md text-center">
            <div className="">
                <p className=" text-xl uppercase">Ouff !</p>
                <div className="w-[50%] h-[1px] bg-black/70 m-auto"></div>
            </div>
            <p className="text-black/80">Wanna start another session ?</p>
            <div 
                className={`flex w-full gap-1 *:rounded-sm *:p-2 *:cursor-pointer ${(currentPomodoroMinutes === 0 && currentPomodoroSeconds === 0) ? "" : " flex-col "}`}
            >
                <button className="bg-beigeAccent/50 hover:bg-beigeAccent/80 w-full"
                onClick={() => {
                    setIsBreakOrSession("session");
                    setStartModalVisible(false);
                    setIsPlaying(true);
                    setIsPaused(false);
                }}
                >Start new session</button>
                {(currentPomodoroMinutes === 0 && currentPomodoroSeconds === 0) ? <></> : 
                <button className="bg-beigeAccent/50 w-full hover:bg-beigeAccent/80"
                onClick={() => {
                    setStartModalVisible(false);
                    setIsPlaying(true);
                    setIsPaused(false);
                }}
                >Continue break</button>}
                <button className="bg-red-100 text-red-600 hover:bg-red-200 w-full"
                    onClick={() => {
                    setIsBreakOrSession("session");
                    setStartModalVisible(false);
                    setIsPaused(false);
                }}
                >End session</button>
            </div>
        </div>
    </div>
    </>)
}