import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import posts from "../../requests/topStories";

import { Container, Typography, Box, Card, Button } from "@material-ui/core";

import HackerPost from "./HackerPost";

const HackerPosts = () => {
	const [currPosts, setPosts] = useState([]);

	useEffect(() => {
		const timer = setInterval(() => {
			setPosts(posts);
		}, 1);
		return () => {
			clearInterval(timer);
		};
	}, []);

	const renderPosts = () => {
		return currPosts.map((post, postInx) => {
			return (
				<HackerPost
					key={postInx}
					by={post["by"]}
					id={post["id"]}
					title={post["title"]}
					url={post["url"]}
				/>
			);
		});
	};

	if (currPosts.length === 0) return <></>;
	else
		return (
			<Container>
				<Box mt={1}>
					<Card>
						<Box display="flex" style={{ justifyContent: "space-between" }}>
							<Link
								to="/"
								style={{ textDecoration: "none", alignSelf: "center" }}
							>
								<Button size="large">Home</Button>
							</Link>
							<Box mr={2} style={{ alignSelf: "center" }}>
								<Typography variant="h6" align="center">
									Hacker News Top Stories
								</Typography>
							</Box>
						</Box>
					</Card>
					<Box>{renderPosts()}</Box>;
				</Box>
			</Container>
		);
};

export default HackerPosts;
