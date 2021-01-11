import React, { useEffect } from "react";
import { size } from "lodash";

import { connect } from "react-redux";
import * as actions from "../../actions";

import Header from "./Header.jsx";
import TodoList from "./TodoList";
import SubmitForm from "./SubmitForm";

import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
		},
	},
}));

const Todo = (props) => {
	const classes = useStyles();
	const { fetchTodos, getLastIndex, addTodo, todos, range } = props;
	const [index, setIndex] = React.useState(0);

	useEffect(() => {
		fetchTodos(range);
		(async () => setIndex(await getLastIndex()))();
	}, [fetchTodos, range, setIndex, getLastIndex]);

	const handleSubmit = (text, day, repeat) => addTodo(text, day, repeat, index);

	return (
		<Container className={classes.root}>
			<Header numTodos={size(todos)} />
			<TodoList />
			<SubmitForm onFormSubmit={handleSubmit} />
		</Container>
	);
};

const mapStateToProps = ({ todos }) => ({
	todos: todos.tasks,
	range: todos.range,
});

export default connect(mapStateToProps, actions)(Todo);
