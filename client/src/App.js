import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./modules/Layout";
import Achievements from "./pages/Achievements";
import Profile from "./pages/Profile";
import NoMatch from "./pages/NoMatch";
import Home from "./pages/Home";
import NewAchievement from "./pages/NewAchievement";
import AchievementDetail from "./pages/AchievementDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuthStore, useStore } from "./store";
import Welldone from "./modules/Welldone";
import AdminHome from "./pages/AdminHome";

function App() {
	const user = useAuthStore((state) => state.user);
	const state = useAuthStore((state) => state);
	const { isLoggedIn } = state;
	const { isAdmin } = user;

	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="login" element={isLoggedIn ? <Home /> : <Login />} />
				<Route path="register" element={isLoggedIn ? <Home /> : <Register />} />
				{isAdmin ? (
					<>
						<Route
							path="admin"
							element={isLoggedIn && isAdmin ? <AdminHome /> : <Login />}
						/>
					</>
				) : (
					<>
						<Route
							path="achievements"
							element={isLoggedIn && !isAdmin ? <Achievements /> : <Login />}
						/>
						<Route
							path="achievements/new"
							element={isLoggedIn && !isAdmin ? <NewAchievement /> : <Login />}
						/>
						<Route
							path="academics/:id"
							element={
								isLoggedIn && !isAdmin ? <AchievementDetail /> : <Login />
							}
						/>
						<Route
							path="competitions/:id"
							element={
								isLoggedIn && !isAdmin ? <AchievementDetail /> : <Login />
							}
						/>
						<Route
							path="organizations/:id"
							element={
								isLoggedIn && !isAdmin ? <AchievementDetail /> : <Login />
							}
						/>
						<Route
							path="profile"
							element={isLoggedIn && !isAdmin ? <Profile /> : <Login />}
						/>
						<Route path="welldone" element={<Welldone />} />
					</>
				)}
				<Route path="*" element={<NoMatch />} />
			</Route>
		</Routes>
	);
}

export default App;
