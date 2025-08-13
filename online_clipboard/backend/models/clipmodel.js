// const mongoose = require('mongoose');

// const clipsSchema = new mongoose.Schema({
//     key : {
//         type: Number,
//         required: [true, 'Key is required'],
//         unique: true
//     },
//     content: {
//         type: String,
//         required: [true, 'Content is required']
//     },
// })

// module.exports = mongoose.model('Clip', clipsSchema);
// const Clip = mongoose.model('Clip', clipsSchema);
// Clip.create({
//     key: 1,
//     content: 'This is a sample clip content'
// }).then(() => {
//     console.log('Sample clip created');
// }).catch(err => {
//     console.error('Error creating sample clip:', err);
// })

const mongoose = require("mongoose");

const clipSchema = new mongoose.Schema({
  key: {
    type: Number,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

clipSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 }); // Clips expire after 10 minutes

module.exports = mongoose.model("Clip", clipSchema);
