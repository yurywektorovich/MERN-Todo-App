import { combineReducers } from "redux";

import authReducer from "./authReducer";
import todosReducer from "./todosReducer";
import notesReducer from "./notesReducer";

export default combineReducers({
	auth: authReducer,
	todos: todosReducer,
	notes: notesReducer,
});
