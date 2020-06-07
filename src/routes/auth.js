import bcrypt from 'bcryptjs'
import { v4 } from 'uuid'
import { Router } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import { registrationSchema, loginSchema } from '../validation/validationSchema'

const router = Router()

router.post('/login', async (req, res) => {
  try {
    await loginSchema.validate(req.body, { abortEarly: false })
  } catch (err) {
    res.status(400).json(err)
  }

  const user = await User.findOne({ username: req.body.username })
  if (!user) return res.status(400).json({ message: 'Invalid Username' })

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) {
    return res.status(400).json({
      message: 'Invalid credentials',
    })
  }
  const token = jwt.sign({ id: user._id }, 'tokenSecret', {
    expiresIn: '48h',
  })
  if (user.isLocked) {
    return res.status(400).json({
      message: 'Account Locked',
    })
  }
  // res.header('authToken', token).send(token)
  res.status(200).json({
    id: user._id,
    username: user.username,
    token,
    tokenExpires: 48,
  })
})

router.post('/register', async (req, res) => {
  try {
    await registrationSchema.validate(req.body, { abortEarly: false })
  } catch (err) {
    res.status(400).json(err)
  }
  const emailExists = await User.findOne({ email: req.body.email })
  if (emailExists) {
    res.status(400).json({ message: 'email already exists' })
  }
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)
  const newUser = new User({
    email: req.body.email,
    password: hashedPassword,
    username: req.body.username,
    admin: req.body.admin,
    location: req.body.location,
    meta: {
      age: 30,
      website: 'mcraigmedia.com',
    },
  })
  try {
    const user = await newUser.save()
    res.json(user)
  } catch (err) {
    res.status(400).json(err)
  }
})

router.post('/forgot-password', async (req, res) => {
  const id = v4()
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).json({ message: 'Invalid Email' })
  user.isLocked = true
  user.resetPasswordToken = token
  user.resetPasswordExpires = Date.now() + 3600000
  user.save()
  // Send email

  //Notify user to post to other route
})

router.get('/forgot-password/:token', async (req, res) => {
  console.log(req.params)
  console.log(req.body.password)

  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  })
  if (!user) {
    return res
      .status(400)
      .json({ message: 'Password reset token is invalid or has expired' })
  }

  user.password = req.body.password
  user.isLocked = false
  user.resetPasswordToken = undefined
  user.resetPasswordExpires = undefined

  user.save()

  console.log('Password has changed')
})

export default router
