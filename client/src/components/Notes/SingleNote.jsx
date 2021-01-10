import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { updateNote, deleteNote } from "../../actions/index";

import {
	Card,
	Button,
	Box,
	Container,
	Typography,
	Divider,
	TextField,
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";

const SingleNote = (props) => {
	const [isEditing, setEditing] = useState(false);
	const [title, setTitle] = useState(props.title);
	const [text, setText] = useState(props.text);

	const node = useRef();
	useEffect(() => {
		const handleClick = (e) => {
			if (node.current.parentNode.contains(e.target)) return;
			if (isEditing && title !== "" && text !== "") {
				props.updateNote(props.id, { title, text });
				setEditing(false);
			}
		};
		document.addEventListener("mousedown", handleClick);
		return () => {
			document.removeEventListener("mousedown", handleClick);
		};
	}, [isEditing, props, text, title]);

	return (
		<Container ref={node}>
			{isEditing ? (
				<Box mt={1}>
					<Card>
						<Box
							display="flex"
							p={1}
							style={{ justifyContent: "space-between" }}
						>
							<TextField
								fullWidth
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
							<Box display="flex" ml={1}>
								<Button
									color="primary"
									variant="outlined"
									onClick={() => setEditing(false)}
								>
									<CloseIcon />
								</Button>
							</Box>
						</Box>
						<Divider />
						<Box
							display="flex"
							p={1}
							style={{ justifyContent: "space-between" }}
						>
							<TextField
								multiline
								fullWidth
								value={text}
								onChange={(e) => setText(e.target.value)}
							>
								{text}
							</TextField>
							<Box display="flex" ml={1}>
								<Button
									color="primary"
									onClick={() => {
										if (title !== "" && text !== "")
											return (
												props.updateNote(props.id, { title, text }),
												setEditing(false)
											);
									}}
								>
									Submit
								</Button>
							</Box>
						</Box>
					</Card>
				</Box>
			) : (
				<Box mt={1}>
					<Card>
						<Box
							display="flex"
							p={1}
							style={{ justifyContent: "space-between" }}
						>
							<Typography style={{ overflowWrap: "anywhere" }}>
								{props.notes[props.inx].title}
							</Typography>
							<Box display="flex">
								<Box mr={1}>
									<Button
										variant="outlined"
										size="small"
										color="primary"
										onClick={() => setEditing(true)}
									>
										Edit
									</Button>
								</Box>
								<Box>
									<Button
										variant="outlined"
										size="small"
										color="secondary"
										onClick={() => props.deleteNote(props.id)}
									>
										Delete
									</Button>
								</Box>
							</Box>
						</Box>
						<Divider />
						<Box p={1}>
							<Typography style={{ overflowWrap: "break-word" }}>
								{props.notes[props.inx].text}
							</Typography>
						</Box>
					</Card>
				</Box>
			)}
		</Container>
	);
};

const mapStateToProps = (state) => ({ notes: state.notes });

export default connect(mapStateToProps, { updateNote, deleteNote })(SingleNote);
