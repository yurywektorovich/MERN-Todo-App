import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Todo from "./Todo/Todo";
import Notes from "./Notes/Notes";
import HackerPosts from "./HackerPosts/HackerPosts";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline, Container, IconButton } from "@material-ui/core";
import { cyan, red } from "@material-ui/core/colors";

import Brightness3Icon from "@material-ui/icons/Brightness3";
import Brightness7Icon from "@material-ui/icons/Brightness7";

export const light = {
	overrides: {
		MuiIconButton: { root: { color: "#757575" } },
	},
	palette: {
		type: "light",
	},
};

export const dark = {
	overrides: {
		MuiIconButton: { root: { color: "#96aacb" } },
		MuiInput: {
			root: {
				"& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button": {
					display: "none",
				},
			},
			underline: { "&:before": { borderBottomColor: "#3a495e" } },
		},
		MuiInputBase: { root: { "& fieldset": { borderColor: "#3a495e" } } },
	},
	palette: {
		type: "dark",
		background: { default: "#0f1724", paper: "#1d2637" },
		text: {
			primary: "#96aacb",
			secondary: "#96aacb",
			disabled: "#96aacb",
			hint: "#96aacb",
		},
		action: { active: "#96aacb", hover: "#233043", selected: "#233043" },
		divider: "#96aacb",
		primary: { light: red[500], main: cyan[500] },
		secondary: { main: red[500] },
	},
};

const App = (props) => {
	const [theme, setTheme] = React.useState(true);
	const icon = !theme ? <Brightness7Icon /> : <Brightness3Icon />;
	const appliedTheme = createMuiTheme(theme ? light : dark);

	props.fetchUser();
	return (
		<Router>
			<ThemeProvider theme={appliedTheme}>
				<CssBaseline />
				<Container>
					<IconButton
						edge="end"
						aria-label="mode"
						onClick={() => setTheme(!theme)}
						style={{ position: "absolute", bottom: 0, right: 15 }}
					>
						{icon}
					</IconButton>
					<Switch>
						<Route exact path="/" component={Header} />
						<Route path="/news" component={HackerPosts} />
						<Route path="/todos" component={Todo} />
						<Route path="/notes" component={Notes} />
					</Switch>
				</Container>
			</ThemeProvider>
		</Router>
	);
};

export default connect(null, actions)(App);
