import axios from "axios";

export const getStoriesIds = (async () => {
	try {
		const response = await axios.get(
			"https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
		);
		return response.data;
	} catch (error) {
		console.error(error);
	}
})();

let posts = [];
export const getStories = (async () => {
	let arrOfIds = await getStoriesIds;

	arrOfIds.map(async (item) => {
		try {
			const response = await axios.get(
				`https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`
			);
			posts.push(response.data);
		} catch (error) {
			console.error(error);
		}
	});
})();

export default posts;
