import {
	REORDER_LIST,
	FETCH_TODOS,
	CHANGE_RANGE,
	ADD_TODO,
	DELETE_TODO,
	UPDATE_TODO,
} from "../actions/types";

import arrayMove from "array-move";

const todoReducer = (state = { tasks: [], range: 0 }, action) => {
	switch (action.type) {
		case FETCH_TODOS:
			return { tasks: [...action.payload], range: state.range };
		case ADD_TODO:
			return { tasks: [...state.tasks, action.payload], range: state.range };
		case DELETE_TODO:
			return {
				tasks: [
					...state.tasks.filter((todo, inx) => todo._id !== action.payload),
				],
				range: state.range,
			};
		case UPDATE_TODO:
			return {
				tasks: [
					...state.tasks.map((todo, inx) => {
						return todo._id === action.payload._id ? action.payload : todo;
					}),
				],
				range: state.range,
			};
		case REORDER_LIST:
			return {
				tasks: [
					...arrayMove(
						state.tasks,
						action.payload.oldIndex,
						action.payload.newIndex
					),
				],
				range: state.range,
			};
		case CHANGE_RANGE:
			return { tasks: state.tasks, range: action.payload };
		default:
			return state;
	}
};

export default todoReducer;
