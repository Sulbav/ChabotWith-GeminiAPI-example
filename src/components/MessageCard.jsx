import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import "./card.css";

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
					"max-w-[70%] rounded-2xl  gap-4 p-2 " +
					(message.role === "model"
						? " justify-start"
						: " bg-[#222] border-2 border-[#444] justify-end")
				}
			>
				<div className="msgbox flex  flex-col  text-ls  gap-4">
					<Markdown remarkPlugins={[remarkGfm]}>
						{message.parts}
					</Markdown>
				</div>
			</div>
		</div>
	);
}
