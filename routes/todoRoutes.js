const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Todo = mongoose.model("Todo");

module.exports = (app) => {
	app.get("/api/todos/:id", requireLogin, async (req, res) => {
		const todo = await Todo.findOne({ _user: req.user.id, _id: req.params.id });

		res.send(todo);
	});

	app.get("/api/order", requireLogin, async (req, res) => {
		const index = await Todo.find({ _user: req.user.id }).sort({ index: -1 });

		res.send(index);
	});

	app.get("/api/all", requireLogin, async (req, res) => {
		const todos = await Todo.find({ _user: req.user.id }).sort({ index: 1 });

		res.send(todos);
	});

	let hours = 16;
	if (["production", "ci"].includes(process.env.NODE_ENV)) hours = 13;
	app.get("/api/today", requireLogin, async (req, res) => {
		const today = new Date(new Date().setHours(hours, 0, 0, 0)).getTime();
		const todos = await Todo.find({ day: today, done: false }).sort({
			index: 1,
		});

		res.send(todos);
	});

	app.get("/api/tomorrow", requireLogin, async (req, res) => {
		const today = new Date(new Date().setHours(hours, 0, 0, 0)).getTime();
		const tomorrow = new Date(today + 86400000);
		const todos = await Todo.find({ day: tomorrow, done: false }).sort({
			index: 1,
		});

		res.send(todos);
	});

	app.get("/api/week", requireLogin, async (req, res) => {
		const today = new Date(new Date().setHours(hours, 0, 0, 0)).getTime();
		const tomorrow = new Date(today + 86400000);
		const week = new Date(today + 6.048e8);
		const todos = await Todo.find({ _user: req.user.id }).then((todos) => {
			return Todo.find({
				day: { $gte: tomorrow, $lte: week },
				done: false,
			}).sort({
				index: 1,
			});
		});

		res.send(todos);
	});

	app.get("/api/later", requireLogin, async (req, res) => {
		const today = new Date(new Date().setHours(hours, 0, 0, 0)).getTime();
		const week = new Date(today + 6.048e8);
		const todos = await Todo.find({ _user: req.user.id }).then((todos) => {
			return Todo.find({ day: { $gt: week }, done: false }).sort({ index: 1 });
		});

		res.send(todos);
	});

	app.get("/api/completed", requireLogin, async (req, res) => {
		const todos = await Todo.find({ _user: req.user.id, done: true }).sort({
			index: 1,
		});

		res.send(todos);
	});

	app.get("/api/expired", requireLogin, async (req, res) => {
		const today = new Date(new Date().setHours(hours, 0, 0, 0)).getTime();
		const todos = await Todo.find({
			_user: req.user.id,
			day: { $lt: today },
			done: false,
		}).sort({ index: 1 });

		res.send(todos);
	});

	app.post("/api/todos", requireLogin, async (req, res) => {
		const { content, index, day, repeat, done, _id } = req.body;
		const todo = new Todo({
			content,
			index,
			day,
			repeat,
			done,
			_id,
			_user: req.user.id,
		});

		try {
			await todo.save();
			res.send(todo);
		} catch (err) {
			res.status(400).send(err);
		}
	});

	app.patch("/api/todos/:id", requireLogin, async (req, res) => {
		const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});

		res.send(todo);
	});

	app.delete("/api/todos/:id", requireLogin, async (req, res) => {
		const todo = await Todo.findByIdAndDelete(req.params.id);

		res.send(todo);
	});
};
