const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Note = mongoose.model("Note");

module.exports = (app) => {
	app.get("/api/notes/:id", requireLogin, async (req, res) => {
		const note = await Note.findOne({ _user: req.user.id, _id: req.params.id });

		res.send(note);
	});

	app.get("/api/notes", requireLogin, async (req, res) => {
		const notes = await Note.find({ _user: req.user.id }).sort({ order: 1 });

		res.send(notes);
	});

	app.post("/api/notes", requireLogin, async (req, res) => {
		const { title, text, order } = req.body;
		const note = new Note({ title, text, order, _user: req.user.id });

		try {
			await note.save();
			res.send(note);
		} catch (err) {
			res.status(400).send(err);
		}
	});

	app.delete("/api/notes/:id", requireLogin, async (req, res) => {
		const note = await Note.findByIdAndDelete(req.params.id);

		res.send(note);
	});

	app.patch("/api/notes/:id", requireLogin, async (req, res) => {
		const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});

		res.send(note);
	});
};
