import mongoose from 'mongoose'

const Schema = mongoose.Schema

const streamSchema = new Schema({
  description: String,
  meta: {
    bitrate: Number,
  },
  created_at: Date,
  updated_at: Date,
})

const Stream = mongoose.model('Stream', streamSchema)

export default Stream
