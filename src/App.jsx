import { chat } from "./Api/geminiAI";
import MesssageCard from "./components/MessageCard";
import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
	const mesgContainerRef = useRef(null);
	const [chatHistory, setChatHistory] = useState([]);
	const [userInput, setUserInput] = useState("");
	const [loading, setLoading] = useState(false);

	const addMessageToHistory = (role, message) => {
		setChatHistory((prevState) => [...prevState, { role, parts: message }]);
	};

	const fecthAPI = async () => {
		try {
			setLoading(true);
			addMessageToHistory("user", userInput);

			const result = await chat.sendMessage(userInput);

			const text = result.response.text();

			addMessageToHistory("model", text);
		} catch (e) {
			return;
		} finally {
			setLoading(false);
		}
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
		<main className="w-full h-screen flex  items-center ">
			<aside className="w-80 flex h-full flex-col itens-center ">
				<header className="w-full flex flex-col items-center justify-center p-4 ">
					<h1 className="text-4xl font-bold  text-blue-500">Chatbot</h1>
					<a href="https://www.instagram.com/abrahamsjz" target="blank">
						<span className="text-sm font-semibold text-[#fff] hover:text-blue-500 duration-200 transition-all">
							by Sulba Dev
						</span>
					</a>
				</header>
			</aside>
			<article className="w-full h-full flex flex-col items-center justify-center p-2">
				<main className="gap-4 w-full h-full flex flex-col items-center justify-center bg-[#131212] rounded-lg p-4">
					<section
						ref={mesgContainerRef}
						id="mcontainer"
						className="scrollbar rounded-lg p-2 w-[70%] h-full flex flex-col items-center gap-4 overflow-y-auto scroll-smooth"
					>
						{chatHistory.map((message, index) => (
							<MesssageCard key={index} message={message} />
						))}

						{loading && (
							<div className="w-full flex items-center justify-start">
								<strong className="text-sm text-[#444]">...</strong>
							</div>
						)}
					</section>

					<section className="w-full flex flex-col items-center justify-center gap-2">
						<form
							className="bg-[#222] gap-2 w-[400px] h-[60px] rounded-xl  flex p-2 items-center justify-center"
							action=""
							onSubmit={handleSubmit}
						>
							<input
								className="h-10 flex-1 px-2 text-[#eee] text-md focus:outline focus:outline-[#444] font-medium border-[#444] border-1 rounded-xl bg-[#131212]"
								type="text"
								placeholder="Type your message here..."
								value={userInput}
								onChange={(e) => setUserInput(e.target.value)}
								id="prompt"
							/>

							<button
								className="bg-blue-700 hover:bg-blue-800 px-1 font-medium text-lg rounded shadow duration-200 transition-all"
								type="submit"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									width={24}
									height={24}
									strokeWidth={2}
								>
									{" "}
									<path d="M17 11v6l-5 -4l-5 4v-6l5 -4z"></path>{" "}
								</svg>
							</button>
						</form>
					</section>
				</main>
			</article>
		</main>
	);
}

export default App;
