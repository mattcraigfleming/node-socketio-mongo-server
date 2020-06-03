import { Router } from 'express'
import Stream from '../models/Stream'

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const streams = await Stream.find()
    res.json(streams)
  } catch (e) {
    res.json({
      message: e,
    })
  }
})

router.post('/', async (req, res, next) => {
  const { description, created_at, updated_at } = req.body
  const newStream = new Stream({
    description,
    created_at,
    updated_at,
  })
  const data = await newStream.save()
  res.json(data)
})

router.get('/:streamId', (req, res, next) => {
  const id = req.params.streamId
  res.status(200).json({
    message: id,
  })
})

router.patch('/:streamId', (req, res, next) => {
  const id = req.params.streamId
  res.status(200).json({
    message: id,
  })
})

router.delete('/:streamId', (req, res, next) => {
  const id = req.params.streamId
  res.status(200).json({
    message: id,
  })
})

export default router
