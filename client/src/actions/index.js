import axios from "axios";
import uuid from "uuid/v4";
import {
	REORDER_LIST,
	SIGN_IN,
	SIGN_OUT,
	FETCH_USER,
	FETCH_TODOS,
	FETCH_NOTES,
	CHANGE_RANGE,
	ADD_TODO,
	DELETE_TODO,
	UPDATE_TODO,
} from "./types";

const getRange = (range) => {
	if (range === 0) return axios.get("/api/today");
	if (range === 1) return axios.get("/api/tomorrow");
	if (range === 2) return axios.get("/api/week");
	if (range === 3) return axios.get("/api/later");
	if (range === 4) return axios.get("/api/completed");
	if (range === 5) return axios.get("/api/expired");
};

export const fetchUser = () => async (dispatch) => {
	const res = await axios.get("/api/current_user");

	dispatch({ type: FETCH_USER, payload: res.data });
};

export const changeRange = (range) => async (dispatch) => {
	dispatch({ type: CHANGE_RANGE, payload: range });
};

export const getLastIndex = () => async (dispatch) => {
	const order = await axios.get("/api/order");
	return order.data.length === 0 ? 0 : order.data[0].index + 1;
};

export const orderList = ({ oldIndex, newIndex }) => (dispatch) => {
	dispatch({ type: REORDER_LIST, payload: { oldIndex, newIndex } });
};

export const reorderTodo = (id, inx) => async () => {
	await axios.patch(`/api/todos/${id}`, { index: inx });
};

export const fetchTodos = (range) => async (dispatch) => {
	const res = await getRange(range);

	dispatch({ type: FETCH_TODOS, payload: res.data });
};

export const addTodo = (content, day, repeat, index) => async (dispatch) => {
	const done = false;
	const _id = uuid();

	dispatch({
		type: ADD_TODO,
		payload: { content, index, day, repeat, done, _id },
	});
	await axios.post("/api/todos", { content, index, day, repeat, done, _id });
};

export const updateTodo = (id, content, index, day, repeat, done) => async (
	dispatch
) => {
	dispatch({
		type: UPDATE_TODO,
		payload: { _id: id, content, index, day, repeat, done },
	});
	await axios.patch(`/api/todos/${id}`, { content, day, repeat });
};

export const completeTodo = (done, id, range) => async (dispatch) => {
	dispatch({ type: DELETE_TODO, payload: id });
	await axios.patch(`/api/todos/${id}`, { done });

	const res = await getRange(range);
	dispatch({ type: FETCH_TODOS, payload: res.data });
};

export const deleteTodo = (id) => async (dispatch) => {
	dispatch({ type: DELETE_TODO, payload: id });
	await axios.delete(`/api/todos/${id}`);
};

export const signIn = (userId) => {
	return { type: SIGN_IN, payload: userId };
};

export const signOut = () => {
	return { type: SIGN_OUT };
};

export const addNote = (note) => async (dispatch) => {
	await axios.post("/api/notes", { title: note.title, text: note.text });
	const res = await axios.get("/api/notes");

	dispatch({ type: FETCH_NOTES, payload: res.data });
};

export const fetchNotes = () => async (dispatch) => {
	const res = await axios.get("/api/notes");

	dispatch({ type: FETCH_NOTES, payload: res.data });
};

export const deleteNote = (id) => async (dispatch) => {
	await axios.delete(`/api/notes/${id}`);
	const res = await axios.get("/api/notes");

	dispatch({ type: FETCH_NOTES, payload: res.data });
};

export const updateNote = (id, note) => async (dispatch) => {
	await axios.patch(`/api/notes/${id}`, { title: note.title, text: note.text });
	const res = await axios.get("/api/notes");

	dispatch({ type: FETCH_NOTES, payload: res.data });
};
