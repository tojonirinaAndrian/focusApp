'use client'
import { useRouter } from "next/navigation";
import HeaderComponent from "../components/header";
import { useGlobalStore } from "@/store/use-global-store";
import PomodoroComponent from "../components/pomodoro";
import StartBreakModalComponent, { StartLongBreakModalComponent } from "../components/startModal";
import { StartSessionModalComponent } from "../components/startModal";
import HistoryComponent from "../components/history";

export default function Page() {
	const router = useRouter();
	const {whereIsGlobal, isBreakOrSession, startModalVisible,
		currentDoneCycle, cycleNumber
	} = useGlobalStore();
	// We should verify here if the last saved data of the person is from yesterday or not
	// If it is, the we setTodaysAccumulatedSeconds (0) and startSaving fromTodays.
	return(
		<>
		<div className="w-full flex flex-col md:flex-row gap-2 *:rounded-md *:w-full p-2 h-[100dvh]">
			<div className={`h-full ${isBreakOrSession === "session" ? "bg-beigeAccent" : `${isBreakOrSession === "break" ? "bg-blueAccent" : "bg-greenAccent"}`}`}>
				<div className={`w-full relative h-full`}>
					<HeaderComponent />
					{whereIsGlobal === "pomodoro" && <>
						<PomodoroComponent />
					</>}
					{whereIsGlobal === "history" && <>
						<HistoryComponent />
					</>}
				</div>
				{(currentDoneCycle === cycleNumber) ? <>
					{(isBreakOrSession === "session" && startModalVisible) && <StartLongBreakModalComponent/>}
				</> : <>
					{(isBreakOrSession === "longBreak" && startModalVisible) && <StartSessionModalComponent />}
					{(isBreakOrSession === "session" && startModalVisible) && <StartBreakModalComponent />}	
					{(isBreakOrSession === "break" && startModalVisible) && <StartSessionModalComponent />}
				</>}
			</div>
			<div className="">
				
			</div>
		</div>
		
		</>
	)
}
