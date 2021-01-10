import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "../../actions/index";

import {
	Box,
	Select,
	Typography,
	Card,
	Button,
	MenuItem,
	FormControl,
} from "@material-ui/core";

const Header = (props) => {
	const { fetchTodos, changeRange, range, numTodos } = props;
	const [day, setDay] = React.useState(range);

	const myRef = React.createRef();
	const handleChange = (event) => {
		myRef.current.focus();
		setDay(event.target.value);
		changeRange(event.target.value);
		fetchTodos(event.target.value);
	};

	const handleFocusExited = () => myRef.current.focus();

	return (
		<Card>
			<Box display="flex" style={{ justifyContent: "space-between" }}>
				<Link to="/" style={{ textDecoration: "none" }}>
					<Button ref={myRef} size="large">
						Home
					</Button>
				</Link>
				<FormControl style={{ minWidth: 110, alignSelf: "center" }}>
					<Select
						labelId="todo-select-label"
						id="todo-select"
						onChange={handleChange}
						value={day}
						MenuProps={{ onExited: handleFocusExited }}
					>
						<MenuItem value={0}>Today</MenuItem>
						<MenuItem value={1}>Tomorrow</MenuItem>
						<MenuItem value={2}>Next 7 Days</MenuItem>
						<MenuItem value={3}>Later</MenuItem>
						<MenuItem value={4}>Completed</MenuItem>
						<MenuItem value={5}>Expired</MenuItem>
					</Select>
				</FormControl>
				<Box mr={2} style={{ alignSelf: "center" }}>
					<Typography variant="h6" align="center">
						You have {numTodos} Todos
					</Typography>
				</Box>
			</Box>
		</Card>
	);
};

const mapStateToProps = ({ todos }) => ({ range: todos.range });

export default connect(mapStateToProps, actions)(Header);
