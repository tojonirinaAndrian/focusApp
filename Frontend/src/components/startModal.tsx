"use client";

import { useGlobalStore } from "@/store/use-global-store";

export default function StartBreakModalComponent () {
    const {setIsBreakOrSession, setIsPaused , setStartModalVisible, setIsPlaying} = useGlobalStore();
    return (<>
    <div className="w-full h-[100dvh] top-0 fixed z-5 bg-black/80 flex items-center">
        <div className="bg-white space-y-5 rounded-md m-auto p-3 shadow-md text-center">
            <div className="">
                <p className=" text-xl uppercase">You made it !</p>
                <div className="w-[50%] h-[1px] bg-black/70 m-auto"></div>
            </div>
            <p className="text-black/80">Wanna take a break ?</p>
            <div className="flex w-full gap-1 *:rounded-sm *:p-2 *:cursor-pointer">
                <button className="bg-beigeAccent/50 hover:bg-beigeAccent/80"
                onClick={() => {
                    setIsBreakOrSession("break")
                    setStartModalVisible(false);
                    setIsPlaying(true);
                    setIsPaused(false);
                }}
                >Start break</button>
                <button className="bg-red-100 text-red-600 hover:bg-red-200"
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
        <div className="bg-white space-y-5 rounded-md m-auto p-3 shadow-md text-center">
            <div className="">
                <p className=" text-xl uppercase">Ouff !</p>
                <div className="w-[50%] h-[1px] bg-black/70 m-auto"></div>
            </div>
            <p className="text-black/80">Wanna start another session ?</p>
            <div className="flex w-full gap-1 *:rounded-sm *:p-2 *:cursor-pointer">
                <button className="bg-beigeAccent/50 hover:bg-beigeAccent/80"
                onClick={() => {
                    setIsBreakOrSession("session");
                    setStartModalVisible(false);
                    setIsPlaying(true);
                    setIsPaused(false);
                }}
                >Start new session</button>
                {(currentPomodoroMinutes === 0 && currentPomodoroSeconds === 0) ? <></> : <button className="bg-beigeAccent/50 hover:bg-beigeAccent/80"
                onClick={() => {
                    setStartModalVisible(false);
                    setIsPlaying(true);
                    setIsPaused(false);
                }}
                >Continue break</button>}
                <button className="bg-red-100 text-red-600 hover:bg-red-200"
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