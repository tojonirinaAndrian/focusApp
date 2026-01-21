import { useGlobalStore } from "@/store/use-global-store"

interface cycleResetInterface {
    setCycleReset: (arg0: boolean) => void
}

export default function CycleResetComponent (props: cycleResetInterface) {
    const {setCurrentDoneCycle, resetTimer, setIsPlaying, setIsPaused, currentDoneCycle, cycleNumber} = useGlobalStore()
    return <>
    <div className="w-full h-[100dvh] top-0 fixed z-5 bg-black/80 flex items-center">
        <div className="bg-white w-[85%] md:w-[30vw] space-y-5 rounded-md m-auto p-3 shadow-md text-center">
            <div className="">
                <p className=" text-xl uppercase">WHAT ?</p>
                <div className="w-[50%] h-[1px] bg-black/70 m-auto"></div>
            </div>
            <p className="text-black/80">
                Do you really want to reset your current cycle streak {`(${currentDoneCycle}/${cycleNumber})`} ?
            </p>
            <div className={`flex w-full gap-1 *:rounded-sm *:p-2 *:cursor-pointer`}>
                <button className="bg-beigeAccent/50 hover:bg-beigeAccent/80 w-full"
                onClick={() => {
                    setIsPaused(false);
                    setIsPlaying(true);
                    props.setCycleReset(false);
                }}
                >Cancel</button>
                <button className="text-red-600 hover:bg-red-200 w-full bg-red-100"
                onClick={() => {
                    setCurrentDoneCycle(0);
                    resetTimer();
                    props.setCycleReset(false);
                }}
                >Reset cycle streak</button>
            </div>
        </div>
    </div>
    </>
}