import React, { useState } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { addNote } from "../../actions/index";

import {
	Typography,
	Box,
	Card,
	Container,
	Button,
	Divider,
	TextField,
} from "@material-ui/core";

const AddNoteForm = (props) => {
	const [form, setForm] = useState({
		title: "",
		text: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;

		let newForm = { ...form };
		newForm[name] = value;

		setForm(newForm);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (form.title !== "" && form.text !== "") {
			props.addNote(form);
			setForm({ title: "", text: "" });
		}
	};

	return (
		<Container>
			<Card>
				<Box display="flex" style={{ justifyContent: "space-between" }}>
					<Link to="/" style={{ textDecoration: "none" }}>
						<Button size="large">Home</Button>
					</Link>
					<Typography
						align="center"
						variant="h6"
						style={{ alignSelf: "center", marginRight: 12 }}
					>
						Add a Note
					</Typography>
				</Box>
				<Divider style={{ marginTop: 2 }} />
				<Box m={1}>
					<TextField
						fullWidth
						name="title"
						label="Title"
						value={form.title}
						onChange={handleChange}
					/>
				</Box>
				<Box m={1}>
					<TextField
						fullWidth
						name="text"
						label="Text"
						multiline
						value={form.text}
						onChange={handleChange}
					/>
				</Box>
				<Divider />
				<Box m={1} align="center">
					<Button variant="outlined" color="primary" onClick={handleSubmit}>
						Add Note
					</Button>
				</Box>
			</Card>
		</Container>
	);
};

export default connect(null, { addNote })(AddNoteForm);
