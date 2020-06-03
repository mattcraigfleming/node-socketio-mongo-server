import { Router } from 'express'
import { verifyToken } from '../utils/verifyToken'

const router = Router()

router.get('/', verifyToken, async (req, res) => {
  res.json({
    message: 'protected route',
  })
})

export default router
