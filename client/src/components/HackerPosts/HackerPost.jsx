import React from "react";

import {
	Link as UILink,
	Typography,
	Box,
	Card,
	withStyles,
} from "@material-ui/core";

const styles = {
	UILink: {
		"&:hover": {
			color: "#efefef",
		},
	},
};

const HackerPost = (props) => {
	return (
		<Box mt={1}>
			<Card key={props.id}>
				<Box p={1}>
					<UILink
						href={props.url}
						underline="none"
						className={props.classes.UILink}
					>
						{props.title}
					</UILink>
					<Typography display="block" variant="caption">
						by: {props.by}
					</Typography>
				</Box>
			</Card>
		</Box>
	);
};

export default withStyles(styles)(HackerPost);
