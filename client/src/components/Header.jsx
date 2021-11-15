import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
	Briefcase,
	HambergerMenu,
	LoginCurve,
	UserCirlceAdd,
	Rank,
	LogoutCurve,
} from "iconsax-react";
import useStore from "../store";

const Header = () => {
	const user = useStore((state) => state.user);
	const logout = useStore((state) => state.logout);
	const { isLoggedIn } = user;

	const handleLogout = () => {
		logout();
	};
	return (
		<div className="navbar mb-2">
			<Link to="/" className="flex-1 px-2 mx-2 rounded-md cursor-pointer">
				<Rank size="32" color="#70abc7" variant="Outline" />
				<span className="text-lg font-bold">Leaderboard</span>
			</Link>
			<div className="flex-none hidden px-2 mx-2 lg:flex ">
				{isLoggedIn ? (
					<div className="flex items-stretch">
						<Link
							to="/achievements"
							className="btn btn-ghost btn-sm rounded-btn">
							<Briefcase size="15" color="#70abc7" variant="Outline" />
							<span className="pl-2 text-xs">Achievements</span>
						</Link>
						<Link
							to="/login"
							className="btn btn-ghost btn-sm rounded-btn"
							onClick={handleLogout}>
							<LogoutCurve size="15" color="#70abc7" variant="Outline" />
							<span className="pl-2 text-xs">Logout</span>
						</Link>
					</div>
				) : (
					<div className="flex items-stretch">
						<Link to="/login" className="btn btn-ghost btn-sm rounded-btn">
							<LoginCurve size="15" color="#70abc7" variant="Outline" />
							<span className="pl-2 text-xs">Login</span>
						</Link>
						<Link to="/register" className="btn btn-ghost btn-sm rounded-btn">
							<UserCirlceAdd size="15" color="#70abc7" variant="Outline" />
							<span className="pl-2 text-xs">Register</span>
						</Link>
					</div>
				)}
			</div>

			<div className="dropdown dropdown-end block lg:hidden">
				<div tabIndex="0" className="m-1 btn btn-primary">
					<HambergerMenu variant="Outline" />
				</div>
				{isLoggedIn ? (
					<ul
						tabIndex="0"
						className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
						<li>
							<Link to="/achievements">Achievements</Link>
						</li>
						<li>
							<Link to="/login" onClick={handleLogout}>
								Logout
							</Link>
						</li>
					</ul>
				) : (
					<ul
						tabIndex="0"
						className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
						<li>
							<Link to="/login">Login</Link>
						</li>
						<li>
							<Link to="/register">Register</Link>
						</li>
					</ul>
				)}
			</div>
		</div>
	);
};

export default Header;