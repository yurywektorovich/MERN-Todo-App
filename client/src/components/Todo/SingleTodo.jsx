import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { connect } from "react-redux";
import * as actions from "../../actions/index";

import {
	Box,
	Card,
	Button,
	Divider,
	Typography,
	TextField,
	IconButton,
} from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

import {
	Undo,
	CheckCircleOutline,
	DeleteForeverOutlined,
	DragHandle as Handle,
} from "@material-ui/icons";

import { SortableHandle } from "react-sortable-hoc";

const DAYS = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
const MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const DragHandle = SortableHandle(() => (
	<Box>
		<Handle />
	</Box>
));

const SingleTodo = (props) => {
	const {
		addTodo,
		completeTodo,
		updateTodo,
		deleteTodo,
		text,
		day,
		done,
		repeat,
		range,
		id,
	} = props;
	const [isEditing, setEditing] = React.useState(false);
	const [task, setTask] = React.useState(text);
	const [labelDay, setLabelDay] = React.useState("");
	const [currentDay, setCurrentDay] = React.useState(day);
	const [currentRepeat, setCurrentRepeat] = React.useState(repeat);

	React.useEffect(() => {
		((day) => {
			const currDay = new Date(day).getTime();
			const today = new Date(new Date().setHours(15, 0, 0, 0)).getTime();
			const tomorrow = new Date(new Date(today).getTime() + 86400000).getTime();
			const week = new Date(new Date(today).getTime() + 6.048e8).getTime();

			if (currDay === today) setLabelDay("Today");
			else if (currDay === tomorrow) setLabelDay("Tomorrow");
			else if (currDay > week)
				setLabelDay(
					`${MONTHS[new Date(day).getDay()]} ${new Date(day).getDate()}`
				);
			else
				setLabelDay(
					`${DAYS[new Date(day).getDay()]} ${new Date(day).getDate()}`
				);
		})(day);
	}, [day]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (task === "") setEditing(false);
		updateTodo(id, task, range, currentDay, currentRepeat);
		setEditing(false);
	};

	const handleDateChange = (date) => setCurrentDay(date);

	return (
		<Box m={1} mx={0}>
			{isEditing ? (
				<Box px={1}>
					<form onSubmit={handleSubmit}>
						<TextField
							fullWidth
							label="Task"
							value={task}
							onChange={(e) => setTask(e.target.value)}
						/>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<DatePicker
								fullWidth
								label="When"
								disableToolbar
								variant="inline"
								format="dd/MM/yyyy"
								margin="normal"
								id="date-picker-inline"
								value={currentDay}
								onChange={handleDateChange}
							/>
						</MuiPickersUtilsProvider>
						<TextField
							fullWidth
							label="Repeat Every [n] Day"
							value={currentRepeat}
							onChange={(e) => setCurrentRepeat(e.target.value)}
						/>
						<Box align="center" mt={1}>
							<Button type="submit" variant="outlined" color="primary">
								Submit
							</Button>
						</Box>
					</form>
				</Box>
			) : (
				<Card>
					<Box display="flex" style={{ justifyContent: "space-between" }}>
						<Box display="flex">
							<Box ml={1}>
								<Divider orientation="vertical" />
							</Box>
							<Box mx={1} alignSelf="center" style={{ cursor: "move" }}>
								<DragHandle />
							</Box>
							<Divider orientation="vertical" />
							<IconButton
								size="small"
								style={{ margin: "0px 5px 0px 5px" }}
								onClick={() => {
									if (done) completeTodo(id, false, range);
									else {
										completeTodo(id, true, range);
										if (repeat > 0) {
											const oneDay = 86400000;
											const currDay = new Date(day);
											const repeatDay = new Date(
												new Date(currDay).getTime() + oneDay * repeat
											);
											addTodo(text, repeatDay, range, repeat);
										}
									}
								}}
							>
								{done ? <Undo /> : <CheckCircleOutline />}
							</IconButton>
							<Box alignSelf="center" onClick={() => setEditing(true)}>
								<Typography variant="h5">{text}</Typography>
							</Box>
						</Box>
						<Box display="flex">
							<Box style={{ alignSelf: "center", marginRight: 5 }}>
								<Typography variant="h7">{labelDay}</Typography>
							</Box>
							<IconButton
								size="small"
								style={{ marginRight: 5 }}
								onClick={() => deleteTodo(id, range)}
							>
								<DeleteForeverOutlined fontSize="large" />
							</IconButton>
						</Box>
					</Box>
				</Card>
			)}
		</Box>
	);
};

const mapStateToProps = ({ todos }) => ({
	todos: todos.tasks,
	range: todos.range,
});

export default connect(mapStateToProps, actions)(SingleTodo);
