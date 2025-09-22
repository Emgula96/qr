"use client"

import { useMemo } from "react"

type KeyboardProps = {
	value: string
	onChange: (next: string) => void
	onEnter?: () => void
	mode?: "email" | "text"
}

const LETTER_ROWS = [
	["q","w","e","r","t","y","u","i","o","p"],
	["a","s","d","f","g","h","j","k","l"],
	["z","x","c","v","b","n","m"],
]

export default function OnScreenKeyboard({ value, onChange, onEnter, mode = "text" }: KeyboardProps) {
	const emailRow = useMemo(() => (mode === "email" ? ["@", ".", "-", "_", ".com"] : []), [mode])

	const insert = (text: string) => {
		onChange(value + text)
	}

	const backspace = () => {
		onChange(value.slice(0, -1))
	}

	const space = () => insert(" ")

	return (
		<div className="bg-white border border-gray-300 rounded-lg shadow-lg mt-6">
			<div className="max-w-5xl mx-auto p-4 select-none">
				<div className="mb-2">
					<div className="text-sm text-gray-600 text-center">On-screen keyboard</div>
				</div>

				{LETTER_ROWS.map((row, i) => (
					<div key={i} className="flex gap-2 justify-center mb-2">
						{row.map((k) => (
							<button
								key={k}
								type="button"
								className="h-14 min-w-10 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 text-lg font-medium"
								onClick={() => insert(k)}
							>
								{k}
							</button>
						))}
					</div>
				))}

				{emailRow.length > 0 && (
					<div className="flex gap-2 justify-center mb-2">
						{emailRow.map((k) => (
							<button
								key={k}
								type="button"
								className="h-12 px-3 rounded bg-blue-50 hover:bg-blue-100 text-base"
								onClick={() => insert(k)}
							>
								{k}
							</button>
						))}
					</div>
				)}

				<div className="flex gap-2 justify-center">
					<button type="button" className="h-12 px-4 rounded bg-gray-100 hover:bg-gray-200" onClick={backspace}>
						Backspace
					</button>
					<button type="button" className="h-12 px-10 rounded bg-gray-100 hover:bg-gray-200" onClick={space}>
						Space
					</button>
					{onEnter && (
						<button type="button" className="h-12 px-6 rounded bg-blue-600 text-white hover:bg-blue-700" onClick={onEnter}>
							Enter
						</button>
					)}
				</div>
			</div>
		</div>
	)
}


