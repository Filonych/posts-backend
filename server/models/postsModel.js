const { Schema, model } = require('mongoose')

const PostsSchema = new Schema({
	title: { type: String, required: true },
	body: { type: String, required: true },
	id: { type: Number, required: true },
})

module.exports = model('Posts', PostsSchema)
