

export default function MessageCard({ message }) {
	return (
		<div
			className={
				"w-full flex items-center" +
				(message.role === "model" ? " justify-start" : " justify-end")
			}
		>
			<div
				className={
					"max-w-80 rounded-2xl shadow-xl gap-4 p-2 " +
					(message.role === "model"
						? " bg-blue-300 text-start"
						: " bg-blue-500 justify-end")
				}
			>
				<p className="font-medium text-md text-[#222]">
					{message.parts}
				</p>
			</div>
		</div>
	);
}
