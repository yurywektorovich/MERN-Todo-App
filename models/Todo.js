const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
	_id: { type: Object },
	content: String,
	index: { type: Number, default: 0 },
	day: Date,
	repeat: { type: Number, default: 0 },
	done: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now },
	_user: { type: Schema.Types.ObjectId, ref: "User" },
});

mongoose.model("Todo", todoSchema);
