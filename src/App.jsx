import { chat } from "./Api/geminiAI";
import MesssageCard from "./components/MessageCard";
import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
	const mesgContainerRef = useRef(null);
	const [chatHistory, setChatHistory] = useState([]);
	const [userInput, setUserInput] = useState("hola");

	const addMessageToHistory = (role, message) => {
		setChatHistory((prevState) => [...prevState, { role, parts: message }]);
	};

	const fecthAPI = async () => {
		addMessageToHistory("user", userInput);

		const result = await chat.sendMessage(userInput);

		
		const text = result.response.text();

		addMessageToHistory("model", text.replace(/\*([^*]+)\*/g, "$1"));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		fecthAPI();
		setUserInput("");
	};

	useEffect(() => {
		mesgContainerRef.current.scrollTop = mesgContainerRef.current.scrollHeight;
	}, [chatHistory]);

	return (
		<>
			<aside>
				<img
					src="https://miro.medium.com/v2/resize:fit:1024/1*Q_B5g9fIWoms17JbCKG5Mg.png"
					alt="logo"
					className="w-96 rounded-2xl shadow-2xl"
				/>
				<h1 className="text-3xl font-bold text-center text-[#222]">
					Chatbot 
				</h1>
			</aside>

			<main className="w-2xl p-6 backdrop-blur-3xl flex flex-col gap-4 items-center justify-center rounded-xl shadow-2xl">
				<div
					ref={mesgContainerRef}
					id="mcontainer"
					className="scrollbar   bg-blue-100 rounded-lg p-2 w-full h-96 flex flex-col items-center gap-4 overflow-y-auto scroll-smooth"
				>
					{chatHistory.map((message, index) => (
						<MesssageCard key={index} message={message} />
					))}
				</div>
				<form
					className="bg-blue-100 w-full rounded-xl h-14 drop-shadow-2xl flex gap-2 px-2 items-center justify-center"
					action=""
					onSubmit={handleSubmit}
				>
					<label className="text-[#222] text-xl font-medium " htmlFor="prompt">
						Pregunta
					</label>
					<input
						className="flex-1 px-2 text-[#222] text-md focus:outline focus:outline-blue-500 font-medium border-blue-500 border-2 rounded-xl"
						type="text"
						value={userInput}
						onChange={(e) => setUserInput(e.target.value)}
						id="prompt"
					/>

					<button
						className="bg-blue-600 px-1 font-medium text-lg rounded shadow"
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
