import { useGlobalStore } from "@/store/use-global-store"

export default function HistoryComponent () {
    const {todaysAccumulatedSeconds} = useGlobalStore();
    const fromSecondsToMinutes = (seconds: number) => {
        let convertedToMins = 0;
        while (seconds <= 0) {
            convertedToMins += 1;
            seconds -= 60;
        }
        return seconds;
    } 
    return (<div className="w-full h-full flex justify-center items-center">
        <div className="p-2 h-[80dvh] w-[80dvh] bg-white shadow-md rounded-md mt-10 space-y-1 overflow-auto">
            <div className="w-full rounded-sm flex justify-between p-3 bg-blueAccent/10 text-black/80">
                <p>{"Today's session"}</p>
                <p>{fromSecondsToMinutes(todaysAccumulatedSeconds)} minutes</p>
            </div>
        </div>
    </div>)
}