import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  const token = req.header('auth-token')
  if (!token) return res.status(400).json({ message: 'Access Denied' })
  try {
    const verified = jwt.verify(token, 'tokenSecret')
    console.log(verified.expiresIn)
    req.userId = verified.id
    req.user = verified
  } catch (err) {
    res.json(err)
  }
}
