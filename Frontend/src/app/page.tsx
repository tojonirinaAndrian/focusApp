'use client'
import { useRouter } from "next/navigation";
import HeaderComponent from "../components/header";
import { useGlobalStore } from "@/store/use-global-store";
import PomodoroComponent from "../components/pomodoro";
import StartBreakModalComponent from "../components/startModal";
import { StartSessionModalComponent } from "../components/startModal";

export default function Page() {
	const router = useRouter();
	const {whereIsGlobal, isBreakOrSession, startModalVisible} = useGlobalStore();
	return(
		<>
		<div className={"w-full h-[100dvh] " + (isBreakOrSession === "session" ? "bg-beigeAccent" : "bg-blueAccent ")}>
			<HeaderComponent />
			{whereIsGlobal === "pomodoro" && <>
				<PomodoroComponent />
			</>}
		</div>
		{(isBreakOrSession === "session" && startModalVisible) && <StartBreakModalComponent />}	
		{(isBreakOrSession === "break" && startModalVisible) && <StartSessionModalComponent />}
		</>
	)
}
