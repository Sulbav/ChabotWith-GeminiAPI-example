import { chat } from "./Api/geminiAI";
import MesssageCard from "./components/MessageCard";
import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
	const mesgContainerRef = useRef(null);
	const [chatHistory, setChatHistory] = useState([]);
	const [userInput, setUserInput] = useState("hola");

	const addMessageToHistory = (role, message) => {
		setChatHistory(prevState=>[...prevState, { role, parts: message }]);
	};

	const fecthAPI = async () => {
		addMessageToHistory("user", userInput);

		const result = await chat.sendMessage(userInput);
		
		
		setUserInput("")
		const text = result.response.text();

		addMessageToHistory(
			"model",
			text
				.replace(/\*([^*]+)\*/g, "$1")
		);
		
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		
		fecthAPI();
		
	};

	useEffect(() => {
		mesgContainerRef.current.scrollTop = mesgContainerRef.current.scrollHeight;
	}, [chatHistory]);

	return (
		<>
			<main className="w-2xl py-6 backdrop-blur-3xl flex flex-col gap-4 items-center justify-center rounded-xl shadow-2xl">
				<div
					ref={mesgContainerRef}
					id="mcontainer"
					className="  bg-blue-100 rounded-xl p-2 w-[85%] h-96 flex flex-col items-center gap-4 overflow-y-auto scroll-smooth"
				>
					{chatHistory.map((message, index) => (
						<MesssageCard key={index} message={message} />
					))}
				</div>
				<form
					className="bg-blue-100 w-[85%] rounded-2xl h-14 drop-shadow-2xl flex gap-4 p-2 items-center justify-center"
					action=""
					onSubmit={handleSubmit}
				>
					<label className="text-[#222] text-xl font-medium " htmlFor="prompt">
						Prompt
					</label>
					<input
						className="flex-1 px-2 text-[#222] text-md focus:outline focus:outline-blue-500 font-medium border-blue-500 border-1 rounded-xl"
						type="text"
						value={userInput}
						onChange={(e) => setUserInput(e.target.value)}
						id="prompt"
					/>

					<button
						className="bg-blue-600 p-1 font-medium text-xl rounded-xl"
						type="submit"
					>
						Enviar
					</button>
				</form>
			</main>
		</>
	);
}

export default App;
