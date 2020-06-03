import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: { type: String, required: true, unique: true, min: 6, max: 255 },
  username: { type: String },
  password: { type: String, required: true },
  admin: Boolean,
  location: String,
  meta: {
    age: Number,
    website: String,
  },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  isLocked: { type: Boolean, default: false },
})

const User = mongoose.model('User', userSchema)

export default User
