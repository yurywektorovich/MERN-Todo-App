import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Box, Paper, Button } from "@material-ui/core";

const Header = (props) => {
	const renderAuth = () => {
		switch (props.auth) {
			case null:
				return;
			case false:
				return (
					<a href={"/auth/google"} style={{ textDecoration: "none" }}>
						<Button size="large">Login With Google</Button>
					</a>
				);
			default:
				return [
					<a key={1} href={"/auth/logout"} style={{ textDecoration: "none" }}>
						<Button size="large">Logout</Button>
					</a>,
				];
		}
	};

	return (
		<Paper>
			<Box mt={1} align="center">
				<Box display="flex" style={{ justifyContent: "space-between" }}>
					<Box>
						{/* <Link style={{ textDecoration: "none" }} to={"/news"}>
							<Button size="large">NEWS</Button>
						</Link> */}
						<Link style={{ textDecoration: "none" }} to={"/todos"}>
							<Button size="large">TODOS</Button>
						</Link>
						{/* <Link style={{ textDecoration: "none" }} to={"/notes"}>
							<Button size="large">NOTES</Button>
						</Link> */}
					</Box>
					<Box>{renderAuth()}</Box>
				</Box>
			</Box>
		</Paper>
	);
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Header);
