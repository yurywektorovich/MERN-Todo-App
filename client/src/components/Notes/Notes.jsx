import React from "react";

import AddNoteForm from "./AddNoteForm";
import NoteList from "./NoteList";

import { Box } from "@material-ui/core";

const Notes = () => {
	return (
		<Box mt={1}>
			<AddNoteForm />
			<NoteList />
		</Box>
	);
};

export default Notes;
