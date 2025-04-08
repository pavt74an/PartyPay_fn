import React from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";

const Header = ({ onLoginClick }) => {
	return (
		<header className="bg-white shadow">
			<div className="container mx-auto px-4 py-4">
				<div className="flex justify-between items-center">
					<Link to="/" className="flex items-center">
						<span className="text-2xl font-bold text-blue-600">
							Party Pay
						</span>
					</Link>

					<button
						onClick={onLoginClick}
						className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
					>
						<User size={18} />
						<span>เข้าสู่ระบบ</span>
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
