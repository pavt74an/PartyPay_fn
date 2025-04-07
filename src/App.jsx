import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import BillSplitter from "./components/bill/BillSplitter";
import LoginModal from "./components/auth/LoginModal";
import Footerr from "./components/layout/Footer";
import "./App.css";
import './index.css';;

function App() {
	const [showLogin, setShowLogin] = useState(false);

	return (
		<Router>
			<div className="min-h-screen flex flex-col bg-gray-50">
				<Header onLoginClick={() => setShowLogin(true)} />
				<main className="flex-grow container mx-auto px-4 py-6">
					<Routes>
						<Route path="/" element={<BillSplitter />} />
					</Routes>
				</main>
				<Footerr />
				{showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
			</div>
		</Router>
	);
}

export default App;
