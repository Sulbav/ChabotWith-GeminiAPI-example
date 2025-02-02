

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
					"max-w-80 rounded-2xl shadow-2xl gap-4 p-2 " +
					(message.role === "model"
						? " bg-[#7d9ffa] justify-start"
						: " bg-[#323bbf] justify-end")
				}
			>
				<p className={"font-medium text-md text-start "+(message.role === "model" ? " text-[#222]" : " text-[#ddd]")}>
				<strong className="text-lg">{ message.role === "user" ? "Tu: " : "Chatbot: " }</strong>
				
				{message.parts}
				</p>
			</div>
		</div>
	);
}
