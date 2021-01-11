import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";

import {
	Card,
	Box,
	Button,
	TextField,
	Input,
	Typography,
} from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

const SubmitForm = (props) => {
	const [input, setInput] = React.useState("");
	const [repeat, setRepeat] = React.useState(0);
	const [day, setDay] = React.useState(new Date().setHours(15, 0, 0, 0));

	const handleSubmit = (e) => {
		e.preventDefault();
		if (input === "") return;
		props.onFormSubmit(input, day, repeat);
		setInput("");
		setRepeat(0);
	};

	const handleDateChange = (date) => setDay(date);

	return (
		<form onSubmit={handleSubmit}>
			<Card style={{ padding: 8 }}>
				<TextField
					fullWidth
					label="Task"
					value={input}
					onChange={(e) => setInput(e.target.value)}
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
						value={day}
						onChange={handleDateChange}
					/>
				</MuiPickersUtilsProvider>
				<Typography variant="caption">Repeat Every [n] Day</Typography>
				<Input
					fullWidth
					label="Repeat Every [n] Day"
					value={repeat}
					onChange={(e) => setRepeat(e.target.value)}
					inputProps={{ step: 1, min: 0, max: 365, type: "number" }}
				/>
				<Box align="center" mt={1}>
					<Button type="submit" size="small" variant="outlined" color="primary">
						Submit
					</Button>
				</Box>
			</Card>
		</form>
	);
};

export default SubmitForm;
