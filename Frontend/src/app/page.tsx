'use client'
import { useRouter } from "next/navigation";
import HeaderComponent from "../components/header";
import { useGlobalStore } from "@/store/use-global-store";
import PomodoroComponent from "../components/pomodoro";
import StartBreakModalComponent from "../components/startModal";
import { StartSessionModalComponent } from "../components/startModal";
import HistoryComponent from "../components/history";

export default function Page() {
	const router = useRouter();
	const {whereIsGlobal, isBreakOrSession, startModalVisible,
		setTodaysAccumulatedSeconds
	} = useGlobalStore();
	// We should verify here if the last saved data of the person is from yesterday or not
	// If it is, the we setTodaysAccumulatedSeconds (0) and startSaving fromTodays.
	return(
		<>
		<div className={"w-full h-[100dvh] " + (isBreakOrSession === "session" ? "bg-beigeAccent" : "bg-blueAccent ")}>
			<HeaderComponent />
			{whereIsGlobal === "pomodoro" && <>
				<PomodoroComponent />
			</>}
			{whereIsGlobal === "history" && <>
				<HistoryComponent />
			</>}
		</div>
		{(isBreakOrSession === "session" && startModalVisible) && <StartBreakModalComponent />}	
		{(isBreakOrSession === "break" && startModalVisible) && <StartSessionModalComponent />}
		</>
	)
}
