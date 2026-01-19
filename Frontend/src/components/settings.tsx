"use client";

import { useGlobalStore } from "@/store/use-global-store";

export default function SettingsComponent () {
    const { setDefaultSessionDuration, isPaused,
        defaultSessionDuration, resetTimer, 
        setDefaultBreakDuration, defaultBreakDuration,
        cycleNumber, setCycleNumber,
        defaultLongBreakDuration, setDefaultLongBreakDuration
    } = useGlobalStore();
    return (<div className="rounded-md p-2 bg-white shadow-md gap-1 flex flex-col">
        {isPaused && <div className="w-full p-2 text-center rounded-sm bg-beigeAccent/50">
            Paused
        </div>}
        <div className="space-y-1 bg-beigeAccent/20 rounded-sm p-2">
            <p className="">Session duration</p>
            <div className="flex gap-2 items-center">
                <input min={1} className="w-[100px] px-2 py-0.5 border-black/50 border rounded-md" type="number" defaultValue={defaultSessionDuration} 
                onChange={(e) => {
                    if (Number(e.target.value) < 1) {
                        setDefaultSessionDuration(1);
                    } else {
                        setDefaultSessionDuration(Number(e.target.value));
                    }
                    !isPaused && resetTimer();
                }}/>
                <p className="text-sm text-black/80">minutes</p>
            </div>
        </div>
        <div className="space-y-1 bg-blueAccent/10 rounded-sm p-2">
            <p className="">Break duration</p>
            <div className="flex gap-2 items-center">
                <input min={1} className="w-[100px] px-2 py-0.5 border-black/50 border rounded-md" type="number" defaultValue={defaultBreakDuration} 
                onChange={(e) => {
                    if (Number(e.target.value) < 1) {
                        setDefaultBreakDuration(1);
                    } else {
                        setDefaultBreakDuration(Number(e.target.value));
                    }
                    !isPaused && resetTimer();
                }}/>
                <p className="text-sm text-black/80">minutes</p>
            </div>
        </div>
        <div className="space-y-1 bg-blueAccent/10 rounded-sm p-2">
            <p className="">Cycle Number</p>
            <div className="flex gap-2 items-center">
                <input min={1} className="w-[100px] px-2 py-0.5 border-black/50 border rounded-md" type="number" defaultValue={cycleNumber} 
                onChange={(e) => {
                    if (Number(e.target.value) < 1) {
                        setCycleNumber(1);
                    } else {
                        setCycleNumber(Number(e.target.value));
                    }
                    !isPaused && resetTimer();
                }}/>
            </div>
        </div>
        <div className="space-y-1 bg-blueAccent/10 rounded-sm p-2">
            <p className="">Long Break duration</p>
            <div className="flex gap-2 items-center">
                <input min={1} className="w-[100px] px-2 py-0.5 border-black/50 border rounded-md" type="number" defaultValue={defaultLongBreakDuration} 
                onChange={(e) => {
                    if (Number(e.target.value) < 1) {
                        setDefaultLongBreakDuration(1);
                    } else {
                        setDefaultLongBreakDuration(Number(e.target.value));
                    }
                    !isPaused && resetTimer();
                }}/>
                <p className="text-sm text-black/80">minutes</p>
            </div>
        </div>
    </div>)
}