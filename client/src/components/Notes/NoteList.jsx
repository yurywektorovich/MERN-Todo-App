import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchNotes } from "../../actions/index";

import SingleNote from "./SingleNote";

import { Box } from "@material-ui/core";

const NoteList = (props) => {
	const { fetchNotes, notes } = props;

	useEffect(() => {
		fetchNotes();
	}, [fetchNotes]);

	return (
		<Box>
			{notes.map((note, inx) => (
				<SingleNote
					key={note._id}
					text={note.text}
					title={note.title}
					id={note._id}
					inx={inx}
				/>
			))}
		</Box>
	);
};

const mapStateToProps = (state) => ({ notes: state.notes });

export default connect(mapStateToProps, { fetchNotes })(NoteList);
