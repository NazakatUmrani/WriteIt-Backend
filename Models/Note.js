const {Schema, mongoose} = require('mongoose');

const NoteSchema = new Schema({
        user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
                required: true
        },
        title: {
                type: String,
                required: true
        },
        description: {
                type: String,
                required: true
        },
        tag: {
                type: String,
                default: "General"
        },
        date: {
                type: Date,
                default: Date.now
        },
});

NoteSchema.index({ user: 1, title: 1 }, { unique: true });

module.exports = mongoose.model("note", NoteSchema);