import React from "react";
import { Outlet } from "react-router";
import Main from "../components/Main";
import Header from "../components/Header";

const Layout = () => {
	return (
		<Main>
			{/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
			<Header />

			<hr />

			{/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
			<Outlet />
		</Main>
	);
};

export default Layout;
