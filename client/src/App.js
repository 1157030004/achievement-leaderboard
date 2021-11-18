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
import { useAuthStore } from "./store";
import Welldone from "./modules/Welldone";

function App() {
	const user = useAuthStore((state) => state.user);
	const { isLoggedIn } = user;
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route
					path="login"
					element={isLoggedIn ? <Achievements /> : <Login />}
				/>
				<Route
					path="register"
					element={isLoggedIn ? <Achievements /> : <Register />}
				/>
				<Route
					path="achievements"
					element={isLoggedIn ? <Achievements /> : <Login />}
				/>
				<Route
					path="achievements/new"
					element={isLoggedIn ? <NewAchievement /> : <Login />}
				/>
				<Route
					path="achievements/:id"
					element={isLoggedIn ? <AchievementDetail /> : <Login />}
				/>
				<Route path="profile" element={isLoggedIn ? <Profile /> : <Login />} />
				<Route path="welldone" element={<Welldone />} />
				<Route path="*" element={<NoMatch />} />
			</Route>
		</Routes>
	);
}

export default App;
