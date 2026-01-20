'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface useStoreProps {
	whereIsGlobal: string,
	isPaused: boolean, 
	setIsPaused: (arg0: boolean) => void,
	setWhereIsGlobal : (arg0: string) => void,
	defaultSessionDuration: number,
	setDefaultSessionDuration: (arg0: number) => void,
	pomodoroIsPlaying: boolean,
	currentPomodoroMinutes: number,
	currentPomodoroSeconds: number,
	setPomodoro: (arg0: number, arg1: number) => void,
	setIsPlaying: (arg0: boolean) => void,
	resetTimer: () => void,
	defaultBreakDuration: number,
	setDefaultBreakDuration: (arg0: number) => void,
	isBreakOrSession: "break" | "session" | "longBreak",
	setIsBreakOrSession: (arg0: "break" | "session" | "longBreak") => void,
	startModalVisible: (boolean),
	setStartModalVisible: (arg0: boolean) => void,
	todaysAccumulatedSeconds: number,
	setTodaysAccumulatedSeconds: (arg0: number) => void,
	cycleNumber: number,
	setCycleNumber: (arg0: number) => void,
	defaultLongBreakDuration: number,
	setDefaultLongBreakDuration: (arg0: number) => void,
	currentDoneCycle: number,
	setCurrentDoneCycle: (arg0: number) => void
}

export const useGlobalStore = create<useStoreProps>() (
	persist (
		(set, get) => ({
			startModalVisible: false,
			setStartModalVisible: (visible: boolean) => {
				set(() => {
					return {
						startModalVisible: visible
					}
				})
			},
			isPaused: false,
			setIsPaused: (isIt: boolean) => {
				set(()=> {
					return {
						isPaused: isIt
					}
				})
			},
			whereIsGlobal: "pomodoro",
			isBreakOrSession: "session",
			defaultSessionDuration: 1,
			defaultBreakDuration: 1,
			setDefaultBreakDuration: (minutes) => {
				set(() => {
					return {
						defaultBreakDuration: minutes
					}
				})
			},
			defaultLongBreakDuration: 1,
			setDefaultLongBreakDuration: (minutes) => {
				set(() => {
					return {
						defaultLongBreakDuration: minutes
					}
				})
			},
			setWhereIsGlobal: (where: string) => {
				set(() => {
					return {
						whereIsGlobal: where
					}
				})
			},
			setDefaultSessionDuration: (minutes: number) => {
				set(() => {
					return {
						defaultSessionDuration: minutes
					}
				})
			},
			currentPomodoroMinutes: 1,
			currentPomodoroSeconds: 0,
			pomodoroIsPlaying: false,
			setIsPlaying: (isIt: boolean) => {
				set(() => {
					return {
						pomodoroIsPlaying: isIt
					}
				})
			},
			setPomodoro: (minutes: number, seconds: number) => {
				set(() => {
					return {
						currentPomodoroMinutes: minutes,
						currentPomodoroSeconds: seconds
					}
				})
			},
			resetTimer: () => {
				set(() => {
					get().setIsPaused(false);
					return {
						pomodoroIsPlaying: false,
						currentPomodoroMinutes: (get().isBreakOrSession === "session") ? get().defaultSessionDuration : get().defaultBreakDuration,
						currentPomodoroSeconds: 0
					}
				})
			},
			setIsBreakOrSession: (what: "break" | "session" | "longBreak") => {
				set(() => {
					if (what === "break") {
						return {
							pomodoroIsPlaying: false,
							isPaused:false,
							currentPomodoroMinutes: get().defaultBreakDuration,
							currentPomodoroSeconds: 0,
							isBreakOrSession: what
						}
					} else if (what === "longBreak") {
						return {
							pomodoroIsPlaying: false,
							isPaused:false,
							currentPomodoroMinutes: get().defaultLongBreakDuration,
							currentPomodoroSeconds: 0,
							isBreakOrSession: what
						}
					} else {
						return {
							isPaused:false,
							pomodoroIsPlaying: false,
							currentPomodoroMinutes: get().defaultSessionDuration,
							currentPomodoroSeconds: 0,
							isBreakOrSession: what
						}
					};
				})
			},
			todaysAccumulatedSeconds: 0,
			setTodaysAccumulatedSeconds: (howMuchTime: number) => {
				set(() => {
					return ({
						todaysAccumulatedSeconds: howMuchTime
					})
				})
			},
			cycleNumber: 2,
			setCycleNumber: (cycleNumber: number) => {
				set(() => {
					return ({
						cycleNumber: cycleNumber
					})
				})
			},
			currentDoneCycle: 0,
			setCurrentDoneCycle: (doneCycle: number) => {
				set(() => {
					return ({
						currentDoneCycle : doneCycle
					})
				})
			},
		}), {
			name : 'global'
		}
	)
)