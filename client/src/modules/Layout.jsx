import React from "react";
import { Outlet } from "react-router";
import Helmet from "react-helmet";
import Main from "../components/Main";
import Header from "../components/Header";

const Layout = () => {
	return (
		<Main>
			<Helmet>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="author" content="Ariq D. Irfanudin" />
				<meta name="author" content="ariqshd" />
				<link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
				<link rel="icon" type="image/png" href="/favicon/favicon.png" />
				<title>Leaderboard Aktivis Salman</title>
				<meta
					name="description"
					content="Ekosistem Prestasi Aktivis Masjid Salman ITB"
				/>
			</Helmet>
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
