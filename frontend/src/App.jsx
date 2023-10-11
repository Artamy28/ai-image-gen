import React from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

import { logo } from "./assets/exportAssets";
import { Home, Create } from "./pages/exportPages.js";

const App = () => {
	return (
		<BrowserRouter>
			<header className="w-full flex items-center justify-between bg-[#f7ad82] px-4 py-4 border-b border-b-[#474747] sm:px-8">
				<Link to="/" className="">
					<img src={logo} alt="OpenAI logo" className="w-28 object-contain" />
				</Link>
				<div className="flex items-center">
					<Link to="/" className="mr-10 font-inter font-bold text-lg">
						Home
					</Link>
					<Link
						to="/create"
						className="font-inter font-medium bg-[#ce5b5b] text-white px-4 py-2 rounded-lg"
					>
						Create
					</Link>
				</div>
			</header>

			<main className="w-full bg-[#9aa7d8] px-4 py-8 min-h-[calc(100vh-73px)]">
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/create" element={<Create />}></Route>
				</Routes>
			</main>
		</BrowserRouter>
	);
};

export default App;
